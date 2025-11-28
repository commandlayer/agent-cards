# Security & Provenance — Agent-Cards

This document defines custody, disclosure rules, ENS authority, and cryptographic
integrity requirements for the CommandLayer Agent-Cards layer.

## Ownership & Contact

- **Owner:** commandlayer.eth
- **Security Contact:** dev@commandlayer.org
- **PGP Fingerprint:** 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A

---

## Integrity Requirements

Each published card **MUST** provide:

- `cl.cid.agentcard` — content-addressed release artifact
- `cl.checksum.agentcard` — SHA-256 integrity hash

All Agent-Cards **MUST**:
- Validate under strict Ajv against the canonical card schema
- Match a CID listed in the official manifest (v1.0.0)
- Pass schema and example validation in CI

Any mismatch **MUST** be treated as invalid.

---

## ENS TXT Authority

Agent-Cards governs:

```
cl.entry
cl.agentcard
cl.cid.agentcard
cl.agentcard.mirror.ipfs
cl.checksum.agentcard
cl.owner
```

C
Updates **MUST**:
- Be signed (PGP or on-chain signature)
- Be logged in `RESOLUTION.md` with timestamp, rationale, approver
- Follow the governance change process

Unauthorized ENS mutation **voids authenticity**.

---

## Vulnerability Disclosure

Security issues should be reported privately:

**Email:** dev@commandlayer.org  
**PGP:** 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A

We will:
- Acknowledge valid issues within **72 hours**
- Provide remediation plan within **10 business days**

---

Release Status: **Security-Critical · Stable**

