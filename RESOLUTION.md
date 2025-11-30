# RESOLUTION — Agent-Cards
*Complete lifecycle log for discoverable agent identity records.*

Identity must be **provable, auditable, and traceable**.
All ENS TXT-backed identity changes **must** appear here.

If it’s not in `RESOLUTION.md` → it **did not** happen.

---

## Entry Requirements

Each entry MUST include:

- **Date** — governance approval date  
- **Agent Name(s)** — ENS-bound identity  
- **Action** — Added · Updated · Deprecated · Replaced · Removed  
- **Reason** — e.g. security, schema correction, publisher change  
- **Resolution** — new valid state or migration path  
- **Approver(s)** — sign-off authority  

Example Entry:

> **2025-11-27** — summarizeagent.eth  
> Action: Added  
> Reason: Initial Commons identity  
> Resolution: Adopted as protocol reference for `summarize`  
> Approver: commandlayer.eth

---

## Change Rules

1️⃣ No silent changes  
2️⃣ Backward-compatible unless explicitly unsafe  
3️⃣ ENS TXT mutations **must** reference this file  
4️⃣ Checksums, CIDs, and entrypoints are **security-critical**  
5️⃣ All changes require CI validation evidence

---

## Log

> *(Initial release — no lifecycle changes yet)*

| Date | Agent Name(s) | Action | Reason | Resolution | Approver(s) |
|------|----------------|--------|--------|------------|--------------|
| — | — | — | — | — | — |

---

## Requirements for Merge Approval

Any PR affecting:

- `cl.entry`
- `cl.agentcard`
- `cl.cid.agentcard`
- `cl.agentcard.mirror.ipfs`
- `cl.checksum.agentcard`
- Version metadata
- Schema bindings

MUST include:

- Updated CID + checksum proofs  
- ENS TXT mutation plan  
- Passing CI output  
- A related row added above  

---

**Status:** Stable · Security-Critical
