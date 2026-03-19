# REQUESTS.md

## Purpose

This file collects ANY item where human input would improve decision quality.

The agent should log requests here whenever:
- There is ambiguity
- Multiple valid approaches exist
- A tradeoff exists
- UX behavior is unclear
- Naming or wording matters
- Scope creep is possible
- A design preference may affect direction
- Approval is needed
- Or simply when human judgment would help
- New requests should be set as OPEN
- Requests that have been responded to will be labelled as RESPONDED


### Request Status Modes

OPEN
- The agent created the request.
- Awaiting human response.

RESPONDED
- The human has filled in the HUMAN RESPONSE section.
- The agent must process the response before continuing.
- Agent must update linked item in `BACKLOG.md` (status/approval/blocking) before implementation proceeds.

DONE
- The agent processed the response.
- Backlog and/or Decisions updated accordingly.
- Request is complete.

# =========================
# ===== TEMPLATE (READ-ONLY)
# =========================

## Request Template

### <TYPE>-<####> — <NAME>

Status: [OPEN | RESPONDED | DONE]

Blocking: [YES | NO]
Related Task: <BACKLOG-ID>
Backlog Update Required: [YES | NO]
Owner: <team or person>
Due Date: YYYY-MM-DD

Context:
<What needs to be decided and why>

Options:
1) <option>
2) <option>
3) <option>

Tradeoffs:
- <option>: <pros/cons>

Recommendation:
<preferred option and reasoning>

Impact:
<what this decision affects>

Unblock Recommendation:
- Mark linked backlog item as `READY + APPROVED` immediately after response is processed.

Human Input Requested:
- <specific question>

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: <what changed>
- DECISIONS: <what changed or N/A>

---


# =========================
# ===== LIVE REQUESTS BELOW
# =========================


---

## OPEN

### META-0005 — Provide PR Links for Completed Portfolio Items

Status: OPEN

Blocking: YES
Related Task: DX-0001, FEAT-1001, FEAT-1003
Backlog Update Required: YES
Owner: User
Due Date: 2026-03-06

Context:
All currently tracked backlog items are implemented and validated, but each remains `BLOCKED` because backlog policy requires a PR link before status can move to `DONE`.

Options:
1) Open one PR covering all three items and provide that URL for each item.
2) Open separate PRs per item and provide individual URLs.
3) Keep items blocked until PR workflow is ready.

Tradeoffs:
- Option 1: fastest and simplest bookkeeping.
- Option 2: cleaner task-level history, more overhead.
- Option 3: no immediate process change, backlog cannot be closed.

Recommendation:
Option 1 to unblock quickly unless strict per-item PR granularity is required.

Impact:
Controls whether completed items can be moved from `BLOCKED` to `DONE`.

Unblock Recommendation:
- Add PR link(s) in `BACKLOG.md`.
- Move each linked item to `DONE`.

Human Input Requested:
- Which PR approach should I apply, and what URL(s) should I record?

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: Pending
- DECISIONS: N/A

### META-0004 — Confirm Backlog Source and Ready Items

Status: OPEN

Blocking: YES
Related Task: FEAT-1001, FEAT-1003, DX-0001
Backlog Update Required: YES
Owner: User
Due Date: 2026-02-28

Context:
The assigned worktree (`/Users/chenagent/.codex/worktrees/e5c7/portfolio`) does not contain `BACKLOG.md`. The only portfolio backlog found is in `/Users/chenagent/Projects/portfolio/BACKLOG.md`, which currently has three items and all are `BLOCKED` (not `READY`).

Options:
1) Treat `/Users/chenagent/Projects/portfolio` as the source of truth and copy `BACKLOG.md` + governance docs into the worktree.
2) Treat `/Users/chenagent/Projects/portfolio` as the source of truth and work there directly.
3) Create a new `BACKLOG.md` inside the worktree and manage items there going forward.

Tradeoffs:
- Option 1: keeps work in the assigned worktree but duplicates governance files.
- Option 2: avoids duplication but shifts work outside the assigned worktree.
- Option 3: cleanest for the worktree, but diverges from existing backlog history.

Recommendation:
Option 1 if you want all automation work to stay inside the worktree; Option 2 if you want a single authoritative backlog.

Impact:
Determines which repo I update and where implementation will occur.

Unblock Recommendation:
- Choose the authoritative repo/worktree.
- Mark at least five items as `READY + APPROVED` (or add new items) so implementation can begin.

Human Input Requested:
- Which option should I follow, and which items (>=5) should be set to `READY + APPROVED`?

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: Pending
- DECISIONS: N/A

### META-0003 — Handle Offline Google Fonts Build Failure

Status: OPEN

Blocking: YES
Related Task: DX-0001
Backlog Update Required: YES
Owner: User
Due Date: 2026-02-28

Context:
`npm run build` fails in this environment because `next/font` cannot fetch Google Fonts (Geist + Geist Mono) without network access. Lint and typecheck pass.

Options:
1) Keep current Google Fonts configuration and accept that local builds need network access
2) Switch to local fonts (bundle font files in `public/` and use `next/font/local`)
3) Configure a build flag to disable font fetching in offline environments

Tradeoffs:
- Option 1: smallest change but local offline builds fail.
- Option 2: most reliable builds; adds assets to repo.
- Option 3: conditional behavior; adds config complexity.

Recommendation:
Option 2 if you want fully offline builds; otherwise Option 1.

Impact:
Determines whether I should adjust font loading to make builds pass offline.

Unblock Recommendation:
- Confirm the desired approach and I will update `app/layout.tsx`.

Human Input Requested:
- Should I switch to local fonts or keep Google Fonts and accept network-dependent builds?

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: Pending
- DECISIONS: N/A

---

### META-0001 — Confirm Repo + Backlog Source

Status: OPEN

Blocking: YES
Related Task: N/A
Backlog Update Required: NO
Owner: User
Due Date: 2026-02-28

Context:
BACKLOG.md exists in `/Users/chenagent/Projects/portfolio` but is not present in the current worktree at `/Users/chenagent/.codex/worktrees/a4e0/portfolio`. I need to know which repo/worktree should be the source of truth for backlog-driven changes.

Options:
1) Use `/Users/chenagent/Projects/portfolio` as the active repo for backlog work
2) Copy BACKLOG.md (and governance docs) into the worktree and work from `/Users/chenagent/.codex/worktrees/a4e0/portfolio`
3) Other (please specify)

Tradeoffs:
- Option 1: avoids duplicating governance files but diverges from current worktree.
- Option 2: keeps all work in the assigned worktree but adds new files there.
- Option 3: depends on your workflow.

Recommendation:
Option 2 if you want all automation work to stay inside the worktree; otherwise Option 1.

Impact:
Determines where I implement backlog items and update tracking files.

Unblock Recommendation:
- Confirm the repo/worktree to use.

Human Input Requested:
- Which path should I treat as the authoritative repo for backlog execution?

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: N/A
- DECISIONS: N/A

---

### META-0002 — Resolve Backlog Execution Constraints

Status: OPEN

Blocking: YES
Related Task: FEAT-1003, FEAT-1001, DX-0001
Backlog Update Required: YES
Owner: User
Due Date: 2026-02-28

Context:
Backlog rules allow implementation only when `Status: READY` and `Approval: APPROVED`, and only one item at a time. Currently all items are `BLOCKED`, and there are only three items total (not five).

Options:
1) Promote all three items to `READY + APPROVED`, and I will execute them sequentially (one at a time)
2) Choose one item to move to `READY + APPROVED` now; leave others blocked
3) Add more backlog items so there are at least five, then mark which are READY

Tradeoffs:
- Option 1: fastest throughput but requires you to accept sequencing.
- Option 2: most controlled; slower overall.
- Option 3: meets the "at least five items" request but requires backlog updates first.

Recommendation:
Option 2 if you want strict control; Option 1 if you want me to proceed faster.

Impact:
Determines whether I can start implementing any backlog items.

Unblock Recommendation:
- Mark the chosen item(s) as `READY + APPROVED` in BACKLOG.md.

Human Input Requested:
- Which option do you want, and which item(s) should be set to READY?

Human Response:

Resolution Applied On: YYYY-MM-DD
Backlog/Decision Updates:
- BACKLOG: Pending
- DECISIONS: N/A

---
## RESPONDED

<!-- No responded requests -->

---
## DONE (recent)

<!-- No completed requests -->
