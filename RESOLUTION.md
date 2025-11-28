# RESOLUTION — Agent-Cards  
*A complete lifecycle log for discoverable agent identity artifacts.*

This file records all additions, modifications, deprecations, and removals of
Agent-Cards and their associated ENS bindings.  
If a change is **not** documented here, it is **not** considered valid
under governance.

---

## Format

Each entry MUST include:

- **Date** — when the decision occurred  
- **Agent Name(s)** — affected ENS-bound identity  
- **Action** — Added, Updated, Deprecated, Replaced, or Removed  
- **Reason** — interoperability need, security fix, metadata correction, etc.  
- **Resolution** — final state or migration plan  
- **Approver(s)** — Governance Council sign-off  

Example:

> 2025-11-27 — summarizeagent.eth  
> **Action:** Added  
> **Reason:** Part of initial Commons deployment  
> **Resolution:** Adopted as canonical identity for “summarize” capability  
> **Approver:** commandlayer.eth

---

## Rules of Record

1. **No silent changes**  
Identity and discovery must remain trustworthy.  
Every live entry **must** be tracked in this file.

2. **Backward compatible, by default**  
Deprecation does not imply removal — compatibility is preserved
unless explicitly unsafe.

3.  **Transparent authority**  
ENS TXT changes **must** link back to this record.

4.  **Security-first execution**  
Any modification to checksum, CID, or `cl.entry` is a **security-sensitive** action.

---

## Log

> *(No entries yet — initial release v1.0.0)*

This section will track:

| Date | Agent Name(s) | Action | Reason | Resolution | Approver |
|------|---------------|--------|--------|------------|----------|
| — | — | — | — | — | — |

---

## Requirements for Future Changes

Any PR affecting:

- `cl.entry`  
- `cl.agentcard`  
- `cl.cid.agentcard`  
- `cl.agentcard.mirror.ipfs`  
- `cl.checksum.agentcard`  
- Version metadata  
- Schema binding  

MUST come with:

- Updated checksum & CID evidence  
- Validation output (CI or local strictly enforced)  
- ENS TXT mutation plan  
- Link to this resolution entry  

---

### Status: **Stable · Security-Critical**  
Maintainers **must** treat identity provenance as a trust anchor.

---
