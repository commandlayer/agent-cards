# Security & Provenance — Agent-Cards

Agent-Cards anchor **trustless discovery** for autonomous agents using ENS.  
This document defines how identity integrity is protected and verified.

---

## Contact

Responsible disclosure is encouraged:

Email: dev@commandlayer.org  
PGP fingerprint: 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A

Identity correctness is non-optional — even small errors impact routing.

---

## Provenance Guarantees

Each published card is:

- **Pinned** content-addressed (`CID`)
- **Checksummed** (SHA-256)
- **Strictly validated** against `agent.card.base.schema.json`
- Governed by **RESOLUTION.md** for lifecycle and traceability

Resolvers MUST verify:

- JSON ↔ TXT ↔ CID values match exactly
- Schema shapes match Protocol-Commons bindings
- x402 entry URIs follow canonical format

Inconsistency means **do not trust** the binding.

---
## Checksums & Manifests

- `checksums/infra.v1.0.0.checksums.txt`  
  Canonical SHA-256 for `.well-known/agent.json` and all v1.0.0 **schema** files.

- `checksums/checksums.txt`  
  Canonical SHA-256 for all v1.0.0 **Agent-Card JSON documents** under `agents/v1.0.0/**`.

- `checksums/*.eth.sha256`  
  **Per-ENS** checksum files for registry and automated verification.

These files are **NORMATIVE** — tooling MUST verify integrity or treat bindings as **UNTRUSTED**.

---

##  ENS TXT Summary

Agent-Cards govern TXT keys that bind **identity + invocation**.  
Canonical definitions — including required keys and enforcement — are specified in:

- `SPEC.md` (Agent-Cards)

Any mismatch MUST result in the card being treated as **UNTRUSTED**.

---

## Security Values

Agent-Cards are identity infrastructure — not logs or payloads.

They MUST NOT include:

- Secrets or credentials
- Execution configuration or private endpoints
- User-specific personal data
- Embedded scripts

Security incidents MUST follow `SECURITY.md`.

---

**Status:** Stable • Stewarded for the long run • v1.0.0 locked
