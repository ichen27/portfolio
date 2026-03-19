#!/usr/bin/env node

import { readFileSync } from "node:fs";

function fail(message) {
  console.error(`governance validation failed: ${message}`);
  process.exit(1);
}

const VALID_APPROVAL = new Set(["REQUIRED", "APPROVED"]);
const VALID_STATUS = new Set(["IDEA", "TRIAGE", "READY", "DOING", "BLOCKED", "DONE"]);

function parseBacklogItems(content) {
  const items = [];
  const lines = content.split("\n");
  let current = null;

  for (const line of lines) {
    if (line.startsWith("### ")) {
      const heading = line.replace(/^###\s+/, "").trim();
      const isWorkItemHeading = /^[A-Z]+-\d{4}\s+—\s+.+$/.test(heading);
      if (!isWorkItemHeading) {
        continue;
      }

      if (current) {
        items.push(current);
      }
      current = {
        title: heading,
        id: null,
        status: null,
        approval: null,
        pr: null,
      };
      continue;
    }

    if (!current) {
      continue;
    }

    const statusMatch = line.match(/^Status:\s*(.+)\s*$/);
    if (statusMatch) {
      current.status = statusMatch[1].trim();
      continue;
    }

    const idMatch = line.match(/^ID:\s*([A-Z]+-\d{4})\s*$/);
    if (idMatch) {
      current.id = idMatch[1].trim();
      continue;
    }

    const approvalMatch = line.match(/^Approval:\s*(.+)\s*$/);
    if (approvalMatch) {
      current.approval = approvalMatch[1].trim();
      continue;
    }

    const prMatch = line.match(/^PR:\s*(.+)\s*$/);
    if (prMatch) {
      current.pr = prMatch[1].trim();
    }
  }

  if (current) {
    items.push(current);
  }
  return items;
}

const backlogContent = readFileSync("BACKLOG.md", "utf8");
const requestsContent = readFileSync("REQUESTS.md", "utf8");

if (backlogContent.includes("READY but not approved")) {
  fail("BACKLOG.md contains contradictory phrase 'READY but not approved'.");
}

if (!requestsContent.includes("RESPONDED")) {
  fail("REQUESTS.md is missing required status heading 'RESPONDED'.");
}

const items = parseBacklogItems(backlogContent);
for (const item of items) {
  const headingId = item.title.split(" — ")[0]?.trim();
  if (!item.id) {
    fail(`${item.title} is missing required 'ID:' field.`);
  }
  if (item.id !== headingId) {
    fail(`${item.title} has mismatched ID field '${item.id}' (expected '${headingId}').`);
  }

  if (!VALID_STATUS.has(item.status)) {
    fail(`${item.title} uses invalid status '${item.status ?? "MISSING"}'.`);
  }

  if (!VALID_APPROVAL.has(item.approval)) {
    fail(`${item.title} uses invalid approval '${item.approval ?? "MISSING"}'.`);
  }

  if (item.status === "READY" && item.approval === "REQUIRED") {
    fail(`${item.title} uses invalid state READY + REQUIRED.`);
  }

  if (item.approval === "REQUIRED" && item.status !== "TRIAGE" && item.status !== "BLOCKED") {
    fail(`${item.title} uses invalid state ${item.status} + REQUIRED (must be TRIAGE or BLOCKED).`);
  }

  if ((item.status === "READY" || item.status === "DOING" || item.status === "DONE") && item.approval !== "APPROVED") {
    fail(`${item.title} uses invalid state ${item.status} + ${item.approval}.`);
  }

  if (item.status === "DONE") {
    if (!item.pr || item.pr === "Pending" || item.pr === "N/A" || !/^https?:\/\//.test(item.pr)) {
      fail(`${item.title} is DONE but missing a PR link.`);
    }
  }
}

console.log(`governance validation passed (${items.length} backlog entries checked).`);
