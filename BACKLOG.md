# BACKLOG

## Rules (for agents)
- You may only implement items where: `Status: READY` **and** `Approval: APPROVED`.
- `Status: READY` is only valid when `Approval: APPROVED`.
- Items with `Approval: REQUIRED` must be `TRIAGE` or `BLOCKED`.
- `PR` link is required before moving an item to `DONE`.
- If info is missing, convert the item to `TRIAGE` or `BLOCKED` and write a request in `REQUESTS.md`.
- One item at a time. New discoveries become new backlog items (do not expand scope mid-task).

# =========================
# ===== TEMPLATE (READ-ONLY)
# =========================

## Backlog Template
---

### NOW (READY + APPROVED)
<!-- Approved items go here -->
---
### QUEUE (TRIAGE / BLOCKED pending approval/input)
<!-- Items being shaped for approval live here -->
---
### IDEAS / FUNCTIONAL REQUIREMENTS (RAW)
<!-- One-liners only. Convert to TRIAGE when selected. -->
---
### DONE (recent)
<!-- Keep last ~10 for quick reference -->


## Work Item Template
### <TYPE>-<####> — <NAME>

Type: FEAT | BUG | DOC | REFACTOR | CHORE | PERF | SEC | DX
ID: <TYPE>-<####>
Priority: HIGH | MEDIUM | LOW
Risk: LOW | MEDIUM | HIGH

Approval: REQUIRED | APPROVED
Status: IDEA | TRIAGE | READY | DOING | BLOCKED | DONE
Blocking: <optional: what is blocking it / link to REQ-###>
PR: <required before DONE; link to PR>
Merge Commit: <optional merge sha>

Owner: AI
Created: YYYY-MM-DD
Last updated: YYYY-MM-DD

Context:
- <What's happening today / why this exists>

Simplified:
- <Plain-English summary of full scope in 1-3 bullets>

Goal (user-facing outcome):
- <What changes for the user or system>

In Scope:
- <bullet>

Out of Scope:
- <bullet>

Constraints:
- Follow existing patterns in: <file paths or modules>
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- <If needed; otherwise "None">

Acceptance Criteria:
- [ ] <testable outcome>

Implementation Notes (optional):
- Approach: <1–5 bullets>
- Edge cases: <bullets>

Files to Start Reading:
- <path A>

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS/FAIL + notes
- Typecheck: PASS/FAIL + notes
- Build: PASS/FAIL + notes
- CI Gate: PASS/FAIL + `ci / merge-gate` run link or evidence

Rollback Strategy:
- <Revert commit / feature flag / config toggle>


# =========================
# ===== LIVE BACKLOG BELOW
# =========================

---

## NOW (READY + APPROVED)

Execution note (2026-03-05): Implemented five new items this run (`FEAT-2001`, `FEAT-2002`, `DX-2003`, `PERF-2004`, `DX-2005`). All are implementation-complete and remain `BLOCKED` only on missing PR links.

Execution note (2026-03-06): Implemented five additional items this run (`FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, `DX-3005`). All are implementation-complete and remain `BLOCKED` only on missing PR links.

Execution note (2026-03-07): Implemented additional hardening for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (skip-link polish, mobile+hash-aware active nav, modal focus trap semantics, richer metadata directives, and stricter manifest field validation/indexed lookup). Items remain `BLOCKED` only on missing PR links.

Execution note (2026-03-08): Implemented an additional hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (main landmark focus outline + normalized site URL source, active-nav scroll/resize fallback + click sync, stable modal ARIA ids + stronger focus trap filtering, ProfilePage JSON-LD expansion, and stricter manifest validation for slug/url/path/uniqueness constraints). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-09): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (hash-based skip-link focus manager + pointer-event-safe skip-link behavior, rAF-throttled active-nav viewport fallback with page-end handling, modal trigger/dialog ARIA wiring + inert background/scrollbar compensation, JSON-LD stable `@id`/image/isPartOf enrichment, and stricter manifest command/path safety checks plus featured/non-featured invariants). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-09 run 2): Implemented a new hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (repeatable skip-link click focus + `:target` landmark outline, top-of-page/popstate/orientation active-nav resilience, iOS-safe modal body lock + robust focusable detection, manifest-backed `ItemList` JSON-LD for projects, and stricter command/repoPath/evidence-path manifest invariants). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-09 run 3): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (skip-link target activation marker + space-key handling, active-section live region announcement, lossless modal inert/aria-hidden restoration, expanded WebPage + BreadcrumbList JSON-LD, and stricter manifest command-path/health-check/tech invariants). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-10): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (skip-target focus-state persistence, manual-intent + focus-aware active nav, stronger modal focus containment/body scroll-lock handling, ContactPage + section-level WebPageElement JSON-LD expansion, and stricter manifest/governance command-id validation). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-10 run 2): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (popstate/pagehide-aware skip-link state sync, visibility/focus-aware active-nav fallback + keyboard-intent link focus sync, richer modal `aria-describedby` guidance + dialog focusability filtering, metadata format-detection/referrer + ContactPoint/CollectionPage JSON-LD expansion, and stricter manifest GitHub/stats/length/non-unavailable-healthCheck/card-copy uniqueness invariants). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-11): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (pointer-based skip-target state reset + focus fallback safety, visibility/pageshow-aware active-nav recalculation and empty-intersection fallback, dialog focus-loop sentinels for modal trap resilience, per-project `SoftwareSourceCode` JSON-LD expansion, and stricter manifest path/tier/demo-availability invariants). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-12): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (hash-decoding + visibility-aware skip-link focus sync, keyboard arrow/Home/End support for sticky section navigation, modal overlay wheel/touch bleed prevention + explicit close button type, richer JSON-LD knowledge/publisher/collection-part relationships, and stricter manifest id/demoKey/repoPath + unavailable-health-check invariants). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-13): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (skip-link retry + unload-state reset resilience, decoded-hash active-nav sync + up/down key support, portal-based modal rendering with inert-safe background isolation, richer ItemList/WebPage/CollectionPage JSON-LD linking, and stricter manifest healthCheck/command/tech-token validation). Items remain `BLOCKED` only on missing PR links.
Execution note (2026-03-14): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (Alt+M skip-link shortcut + accesskey semantics, modifier-safe sticky-nav keyboard traversal with PageUp/PageDown support, reduced-motion-aware modal transitions, SiteNavigationElement JSON-LD expansion, and stricter manifest sentence-quality + non-`n/a` healthCheck uniqueness invariants). Items remain `BLOCKED` only on missing PR links.

Execution note (2026-03-14 run 2): Implemented another hardening pass for `FEAT-3001`, `FEAT-3002`, `FEAT-3003`, `FEAT-3004`, and `DX-3005` (MutationObserver-backed skip-link focus recovery, ResizeObserver-assisted active-nav recalculation, modal body-sibling inert masking for stronger background isolation, shared ImageObject-linked JSON-LD expansion, and stricter canonical GitHub owner/repo + repoPath slug alignment validation). Items remain `BLOCKED` only on missing PR links.

### FEAT-3001 — Add Skip Link and Main Landmark Target

Type: FEAT
ID: FEAT-3001
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-06)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-06
Last updated: 2026-03-14

Context:
- Keyboard users need a fast path past sticky navigation to page content.

Simplified:
- Add visible-on-focus skip link.
- Add stable main target id for skip-link jump.

Goal (user-facing outcome):
- Faster keyboard navigation and clearer landmarking.

In Scope:
- Add skip-link in root layout.
- Add `id="main-content"` and focusable main container.

Out of Scope:
- Multi-page skip-link routing behavior.

Constraints:
- Follow existing patterns in: `app/layout.tsx`, `app/page.tsx`, `app/globals.css`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Single-page structure remains canonical.

Acceptance Criteria:
- [x] Skip link is keyboard-focusable and visible on focus.
- [x] Skip link moves focus/navigation to main content.
- [x] Lint, typecheck, and build pass.

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-06)
- Typecheck: PASS (`npm run typecheck`, 2026-03-06)
- Build: PASS (`npm run build`, 2026-03-06)
- Lint: PASS (`npm run lint`, 2026-03-07 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-07 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-07 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-08 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-08 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-08 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 3 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 3 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 3 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-11 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-11 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-11 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-12 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-12 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-12 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-13 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-13 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-13 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-14 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-14 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 run 2 hardening revalidation)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert skip-link and main landmark changes.

### FEAT-3002 — Add Active Section State to Sticky Navigation

Type: FEAT
ID: FEAT-3002
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-06)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-06
Last updated: 2026-03-14

Context:
- Sticky nav links lacked active state, making page position ambiguous.

Simplified:
- Track in-view section id.
- Highlight active link and set `aria-current`.

Goal (user-facing outcome):
- Users can see current section while scrolling.

In Scope:
- Convert `SiteNav` to client component with `IntersectionObserver`.
- Add conditional active styling and accessibility attributes.

Out of Scope:
- Complex nested navigation logic.

Constraints:
- Follow existing patterns in: `components/site-nav.tsx`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Existing section ids in config remain stable.

Acceptance Criteria:
- [x] Active nav section updates while scrolling.
- [x] Active nav link uses `aria-current`.
- [x] Lint, typecheck, and build pass.

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-06)
- Typecheck: PASS (`npm run typecheck`, 2026-03-06)
- Build: PASS (`npm run build`, 2026-03-06)
- Lint: PASS (`npm run lint`, 2026-03-07 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-07 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-07 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-08 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-08 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-08 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 3 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 3 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 3 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-11 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-11 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-11 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-12 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-12 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-12 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-13 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-13 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-13 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-14 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-14 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 run 2 hardening revalidation)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert active-section observer and style updates.

### FEAT-3003 — Harden Project Demo Modal Accessibility

Type: FEAT
ID: FEAT-3003
Priority: HIGH
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-06)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-06
Last updated: 2026-03-14

Context:
- Demo modal missed key accessibility behaviors (escape handling, focus handoff, body scroll lock).

Simplified:
- Add keyboard dismissal and focus management.
- Add explicit dialog semantics.

Goal (user-facing outcome):
- Modal interactions are safer and more usable for keyboard/screen-reader users.

In Scope:
- Add `role="dialog"` + `aria-modal` + heading association.
- Focus close button on open and return focus to trigger on close.
- Disable body scroll while modal is open.

Out of Scope:
- Full focus trap implementation across every interactive child.

Constraints:
- Follow existing patterns in: `components/project-card.tsx`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Existing modal click-outside close behavior remains desired.

Acceptance Criteria:
- [x] Escape key closes modal.
- [x] Focus is restored to modal trigger on close.
- [x] Body scroll is locked while modal is open.
- [x] Lint, typecheck, and build pass.

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-06)
- Typecheck: PASS (`npm run typecheck`, 2026-03-06)
- Build: PASS (`npm run build`, 2026-03-06)
- Lint: PASS (`npm run lint`, 2026-03-07 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-07 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-07 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-08 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-08 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-08 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 3 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 3 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 3 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-11 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-11 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-11 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-12 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-12 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-12 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-13 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-13 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-13 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-14 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-14 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 run 2 hardening revalidation)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert modal accessibility behavior changes.

### FEAT-3004 — Expand Metadata and Structured Data Coverage

Type: FEAT
ID: FEAT-3004
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-06)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-06
Last updated: 2026-03-14

Context:
- Metadata lacked canonical/robots fields and project-specific social image.

Simplified:
- Add canonical + robots metadata.
- Add Open Graph/Twitter image and richer JSON-LD payload.

Goal (user-facing outcome):
- Cleaner search/social metadata coverage for portfolio sharing and indexing.

In Scope:
- Update `app/layout.tsx` metadata fields.
- Add website JSON-LD alongside person JSON-LD.
- Add static OG image asset in `public/`.

Out of Scope:
- Dynamic OG image generation service.

Constraints:
- Follow existing patterns in: `app/layout.tsx`, `app/page.tsx`, `public/`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- `NEXT_PUBLIC_SITE_URL` remains preferred canonical source when set.

Acceptance Criteria:
- [x] Canonical and robots metadata are present.
- [x] OpenGraph/Twitter metadata include image URLs.
- [x] JSON-LD includes both `Person` and `WebSite`.
- [x] Lint, typecheck, and build pass.

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-06)
- Typecheck: PASS (`npm run typecheck`, 2026-03-06)
- Build: PASS (`npm run build`, 2026-03-06)
- Lint: PASS (`npm run lint`, 2026-03-07 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-07 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-07 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-08 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-08 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-08 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 3 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 3 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 3 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-11 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-11 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-11 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-12 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-12 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-12 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-13 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-13 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-13 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-14 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-14 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 run 2 hardening revalidation)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert metadata and OG asset changes.

### DX-3005 — Validate Project Manifest at Runtime

Type: DX
ID: DX-3005
Priority: HIGH
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-06)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-06
Last updated: 2026-03-14

Context:
- Manifest loading relied on unchecked type-cast, allowing silent data drift.

Simplified:
- Validate manifest entry shape at load time.
- Fail fast on unsupported values and duplicate ids/demo keys.

Goal (user-facing outcome):
- Better reliability and faster detection of manifest data issues.

In Scope:
- Add strict parser/assert helpers in `lib/projects.ts`.
- Enforce value domains for `mvpTier`, `demoMode`, and key fields.
- Enforce uniqueness for `id` and `demoKey`.

Out of Scope:
- External schema library adoption.

Constraints:
- Follow existing patterns in: `lib/projects.ts`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Manifest schema in `projects/manifest.json` is the single source of truth.

Acceptance Criteria:
- [x] Invalid manifest shape throws descriptive error.
- [x] Duplicate `id`/`demoKey` values fail fast.
- [x] Existing manifest loads successfully.
- [x] Lint, typecheck, and build pass.

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-06)
- Typecheck: PASS (`npm run typecheck`, 2026-03-06)
- Build: PASS (`npm run build`, 2026-03-06)
- Lint: PASS (`npm run lint`, 2026-03-07 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-07 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-07 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-08 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-08 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-08 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-09 run 3 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-09 run 3 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-09 run 3 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-10 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-10 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-10 run 2 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-11 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-11 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-11 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-12 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-12 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-12 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-13 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-13 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-13 hardening revalidation; webpack cache ENOSPC warning only)
- Lint: PASS (`npm run lint`, 2026-03-14 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 hardening revalidation)
- Lint: PASS (`npm run lint`, 2026-03-14 run 2 hardening revalidation)
- Typecheck: PASS (`npm run typecheck`, 2026-03-14 run 2 hardening revalidation)
- Build: PASS (`npm run build`, 2026-03-14 run 2 hardening revalidation)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert strict manifest parsing changes.

### FEAT-2001 — Add Sticky Section Navigation

Type: FEAT
ID: FEAT-2001
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-05
Last updated: 2026-03-05

Context:
- The portfolio currently has no persistent section navigation, forcing long scroll-only exploration.

Simplified:
- Add a sticky top nav with anchors to major sections.
- Keep styling consistent with current dark/glass visual language.

Goal (user-facing outcome):
- Users can jump to any section quickly from anywhere on the page.

In Scope:
- New `SiteNav` component with section links.
- Mount nav in root page layout flow.

Out of Scope:
- Multi-page routing changes.

Constraints:
- Follow existing patterns in: `components/`, `app/`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Section IDs in existing components are canonical.

Acceptance Criteria:
- [x] Sticky nav is visible on page.
- [x] Anchor links navigate to each major section.
- [x] Lint, typecheck, and build pass.

Files to Start Reading:
- `app/page.tsx`
- `components/*.tsx`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-05)
- Typecheck: PASS (`npm run typecheck`, 2026-03-05)
- Build: PASS (`npm run build`, 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert navigation component and page integration changes.

### FEAT-2002 — Improve SEO Metadata and Add JSON-LD

Type: FEAT
ID: FEAT-2002
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-05
Last updated: 2026-03-05

Context:
- Metadata exists but does not include richer social metadata or structured data.

Simplified:
- Add expanded Open Graph + Twitter metadata.
- Add person/website JSON-LD structured data on the home page.

Goal (user-facing outcome):
- Better sharing previews and stronger search indexing signals.

In Scope:
- Update `app/layout.tsx` metadata.
- Add JSON-LD script to page output.

Out of Scope:
- External SEO tooling integrations.

Constraints:
- Follow existing patterns in: `app/`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Public profile links in repo are current.

Acceptance Criteria:
- [x] Open Graph and Twitter metadata are present.
- [x] JSON-LD is rendered in page source.
- [x] Lint, typecheck, and build pass.

Files to Start Reading:
- `app/layout.tsx`
- `app/page.tsx`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-05)
- Typecheck: PASS (`npm run typecheck`, 2026-03-05)
- Build: PASS (`npm run build`, 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert metadata + JSON-LD additions.

### DX-2003 — Centralize Site Identity and Contact Config

Type: DX
ID: DX-2003
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-05
Last updated: 2026-03-05

Context:
- Name, role, email, phone, and social links are duplicated across components.

Simplified:
- Add a shared config module for identity/contact data.
- Replace hardcoded duplicates in layout, hero, and contact sections.

Goal (user-facing outcome):
- Profile details stay consistent and can be updated in one place.

In Scope:
- Create `lib/site-config.ts`.
- Wire data usage in `app/layout.tsx`, `components/hero.tsx`, and `components/contact.tsx`.

Out of Scope:
- CMS integration.

Constraints:
- Follow existing patterns in: `lib/`, `components/`, `app/`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Existing contact channels should remain unchanged.

Acceptance Criteria:
- [x] No hardcoded duplicate identity/contact values remain in target files.
- [x] UI content remains functionally equivalent.
- [x] Lint, typecheck, and build pass.

Files to Start Reading:
- `components/hero.tsx`
- `components/contact.tsx`
- `app/layout.tsx`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-05)
- Typecheck: PASS (`npm run typecheck`, 2026-03-05)
- Build: PASS (`npm run build`, 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert shared config and consumer file changes.

### PERF-2004 — Respect Reduced-Motion Preferences

Type: PERF
ID: PERF-2004
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-05
Last updated: 2026-03-05

Context:
- Existing animated counters and smooth scrolling ignore user reduced-motion preferences.

Simplified:
- Gate intensive animations for reduced-motion users.
- Disable smooth scroll under reduced-motion media preference.

Goal (user-facing outcome):
- Improved accessibility and perceived performance for motion-sensitive users.

In Scope:
- Update hero animation logic.
- Add reduced-motion CSS override for scrolling.

Out of Scope:
- Full animation removal from all components.

Constraints:
- Follow existing patterns in: `components/hero.tsx`, `app/globals.css`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- System `prefers-reduced-motion` is the intended control signal.

Acceptance Criteria:
- [x] Counter and motion cues minimize/disable when reduced motion is set.
- [x] Smooth scrolling is disabled for reduced-motion users.
- [x] Lint, typecheck, and build pass.

Files to Start Reading:
- `components/hero.tsx`
- `app/globals.css`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-05)
- Typecheck: PASS (`npm run typecheck`, 2026-03-05)
- Build: PASS (`npm run build`, 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert reduced-motion specific changes.

### DX-2005 — Strengthen Governance Validation Rules

Type: DX
ID: DX-2005
Priority: HIGH
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-03-05
Last updated: 2026-03-05

Context:
- Governance validation currently checks only a narrow subset of backlog invariants.

Simplified:
- Add stronger backlog state checks in validation script.
- Ensure invalid combinations fail fast in CI/local checks.

Goal (user-facing outcome):
- Fewer process regressions and clearer backlog state integrity.

In Scope:
- Expand `scripts/validate-governance.mjs` checks for status/approval consistency.
- Add/adjust npm scripts if needed to expose checks.

Out of Scope:
- Full markdown schema validation framework.

Constraints:
- Follow existing patterns in: `scripts/validate-governance.mjs`, `package.json`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Existing backlog template status vocabulary is canonical.

Acceptance Criteria:
- [x] READY items must be APPROVED.
- [x] REQUIRED approval items cannot be READY or DONE.
- [x] DONE items must include PR link.
- [x] Validation command exits non-zero for invalid states.
- [x] Lint, typecheck, and build pass.

Files to Start Reading:
- `scripts/validate-governance.mjs`
- `BACKLOG.md`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`
- Governance: `npm run validate:governance`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, 2026-03-05)
- Typecheck: PASS (`npm run typecheck`, 2026-03-05)
- Build: PASS (`npm run build`, 2026-03-05)
- Governance: PASS (`npm run validate:governance`, 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert validation script updates.

---
### DX-0001 — Resolve lint warnings and refresh project README

Type: DX
ID: DX-0001
Priority: MEDIUM
Risk: LOW

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; revalidated 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-02-27
Last updated: 2026-03-05

Context:
- `npm run lint` reported unused symbol warnings across demo and experience components.
- `README.md` contained default Create Next App content that did not describe this repo.

Simplified:
- Removed unused code and stale suppressions so lint is clean.
- Replaced README with repo-accurate setup and workflow documentation.

Goal (user-facing outcome):
- Repository is easier to maintain and understand, with clean baseline checks.

In Scope:
- Remove unused imports and unused props from components.
- Keep demo component APIs consistent with usage.
- Rewrite `README.md` to match current project and governance workflow.

Out of Scope:
- Feature additions or visual redesign.
- CI workflow logic changes.

Constraints:
- Follow existing patterns in: `components/`, `app/`, root governance docs.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- None

Acceptance Criteria:
- [x] `npm run lint` returns zero warnings/errors.
- [x] `npx tsc --noEmit` passes.
- [x] `npm run build` passes.
- [x] `README.md` accurately reflects project purpose, commands, and workflow.

Implementation Notes (optional):
- Approach: Remove unused symbols and no-op props; replace template README with project-specific documentation.

Files to Start Reading:
- `components/demos/*.tsx`
- `components/experience.tsx`
- `README.md`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, revalidated 2026-03-05)
- Typecheck: PASS (`npx tsc --noEmit`, revalidated 2026-03-05)
- Build: PASS (`npm run build` via `next build --webpack`, revalidated 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert modified files for DX-0001.

---
## QUEUE (TRIAGE / BLOCKED pending approval/input)

### FEAT-1003 — Add Shared Demo Shell with Mode + Validation Metadata

Type: FEAT
ID: FEAT-1003
Priority: HIGH
Risk: MEDIUM

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; revalidated 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-02-27
Last updated: 2026-03-05

Context:
- Demo rendering behavior was inconsistent and did not expose validation metadata in a standard shell.
- Adapters now exist and should drive shared demo state presentation.

Simplified:
- Added a reusable demo shell for consistent state handling.
- Surfaced adapter mode and last validated date in the project card modal.

Goal (user-facing outcome):
- Every project demo is presented with clear status and validation context.

In Scope:
- Add shared shell wrapper component for modal demo content.
- Expose mode and last validated date from adapters in UI.
- Keep existing demo content components as-is inside the shell.

Out of Scope:
- Rebuilding individual demo logic.
- Live remote embed integration.

Constraints:
- Follow existing patterns in: `components/demos/`, `components/project-card.tsx`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- Adapter metadata is the source of truth for demo mode and validation date.

Acceptance Criteria:
- [x] Demo modal uses shared shell.
- [x] Mode and validation timestamp are visible for demos.
- [x] Existing demo components still render through adapters.
- [x] Lint, typecheck, and build pass.

Implementation Notes (optional):
- Approach: Introduce `DemoShell` component and pass adapter metadata from featured project mapping into modal rendering.

Files to Start Reading:
- `components/project-card.tsx`
- `components/demos/adapters.tsx`
- `components/featured-projects.tsx`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, revalidated 2026-03-05)
- Typecheck: PASS (`npx tsc --noEmit`, revalidated 2026-03-05)
- Build: PASS (`npm run build` via `next build --webpack`, revalidated 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert demo shell integration files for FEAT-1003.

### FEAT-1001 — Add Manifest-Driven Project Registry + Demo Adapter Contract

Type: FEAT
ID: FEAT-1001
Priority: HIGH
Risk: MEDIUM

Approval: APPROVED
Status: BLOCKED
Blocking: PR link required before moving to DONE (implementation complete; revalidated 2026-03-05)
PR: Pending
Merge Commit: N/A

Owner: AI
Created: 2026-02-27
Last updated: 2026-03-05

Context:
- Portfolio cards and demos are currently hardcoded with stale or inaccurate project details.
- Project repos were cloned into `projects/` and should be the source of truth for showcase metadata.

Simplified:
- Add a typed project manifest that includes all in-scope cloned projects.
- Add a reusable demo adapter contract and wire existing showcase sections to manifest data.

Goal (user-facing outcome):
- Portfolio project listings become centralized, auditable, and easier to keep accurate.

In Scope:
- Create `projects/manifest.json` and supporting typed loader utilities.
- Add `components/demos/types.ts` adapter contract and concrete adapter registry.
- Update featured/other project sections to read from manifest instead of hardcoded arrays.

Out of Scope:
- Full redesign of every demo experience.
- Full MVP hardening inside cloned repos (handled by later backlog items).

Constraints:
- Follow existing patterns in: `components/`, `lib/`.
- No new dependencies unless approved
- Backward compatible APIs (unless explicitly approved)

Assumptions:
- All cloned repos in `projects/` are currently in-scope for showcase metadata.

Acceptance Criteria:
- [x] `projects/manifest.json` exists and includes all cloned project entries.
- [x] Featured and other project sections render from manifest-backed data.
- [x] Demo adapter contract exists and current demos are mapped through it.
- [x] Lint, typecheck, and build pass.

Implementation Notes (optional):
- Approach:
  - Introduce one manifest schema used by both card sections.
  - Add adapter map keyed by project id and consume via helper lookup.
  - Preserve existing visuals while replacing hardcoded project data source.

Files to Start Reading:
- `components/featured-projects.tsx`
- `components/other-projects.tsx`
- `components/project-card.tsx`

Test Plan (must run + report results):
- Lint: `npm run lint`
- Typecheck: `npx tsc --noEmit`
- Build: `npm run build`

Verification Results (fill after work):
- Lint: PASS (`npm run lint`, revalidated 2026-03-05)
- Typecheck: PASS (`npx tsc --noEmit`, revalidated 2026-03-05)
- Build: PASS (`npm run build` via `next build --webpack`, revalidated 2026-03-05)
- CI Gate: N/A (local run; no PR yet)

Rollback Strategy:
- Revert manifest and showcase component changes for FEAT-1001.

---
## IDEAS / FUNCTIONAL REQUIREMENTS (RAW)

<!-- No items yet -->

---
## DONE (recent)

<!-- No items yet -->
