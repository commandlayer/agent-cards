# Security Policy — Agent-Cards

Agent-Cards link **names → verbs → execution**.  
Because they route real requests between agents, correctness matters.

If something looks wrong, please tell us — we’re here to keep the ecosystem safe.

---

## What to Report

Any issue that could misroute identity or execution:

- Incorrect or non-resolving x402 entrypoints  
- ENS TXT bindings that don’t match card metadata  
- CID or checksum mismatches  
- Inconsistency between:
  - ENS TXT records
  - Agent-Card JSON
  - Protocol-Commons schemas  

Even small errors can break automation.

---

## Contact

Email: **dev@commandlayer.org**  
PGP Fingerprint: **5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A**

Encrypted communication is encouraged.

---

## Response Targets

- **72 hours** — acknowledgment  
- **10 business days** — fix direction and timing  

Critical routing failures are prioritized.

---

## Integrity Controls

We protect the ecosystem through:

- Strict JSON Schema validation in CI  
- Matching CIDs + checksums in manifests  
- ENS TXT changes logged in `RESOLUTION.md`  
- Versioning for all changes (no silent edits)

These controls ensure **trust without needing trust in any one operator**.

---

**Status:** Stable • Public Good • Open Participation
