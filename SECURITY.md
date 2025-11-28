# Security Policy — Agent-Cards

Agent-Cards are machine-readable identity records binding ENS → canonical verbs →
runtime entrypoints. They are security-sensitive trust anchors.

Any integrity failure can misroute value, identity, or execution.

---

## Contact

📨 dev@commandlayer.org  
🔐 PGP Fingerprint: `5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A`

Use encrypted communication for sensitive reports.

---

## What Is In Scope

- Incorrect x402 entrypoints
- Broken or malicious ENS TXT bindings
- Incorrect CID or checksum
- Any execution-layer metadata that may cause:
  - misrouting
  - elevation of privilege
  - impersonation
  - irreversible outcomes

---

## Required Evidence

All reports MUST include:

- ENS name affected (e.g., `summarizeagent.eth`)
- Broken fields (e.g., `cl.entry`)
- Version + CID + checksum if known
- Network / repro instructions when applicable

Response cadence:

- Acknowledgment: **72 hours**
- Mitigation path: **10 business days**

---

## Integrity Controls

- Cards validated in strict CI before publish
- `cl.cid.agentcard` and `cl.checksum.agentcard`
  **must** match release artifacts
- ENS changes logged in `RESOLUTION.md`

---

## Status

Core Infrastructure · **Strict Governance Required**
