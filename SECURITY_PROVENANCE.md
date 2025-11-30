# Security & Provenance — Agent-Cards

Agent-Cards let agents find and trust each other through ENS.  
This document explains how the layer stays correct, verifiable, and aligned across the ecosystem.

---

## Contact

We welcome responsible disclosure:

Email: dev@commandlayer.org  
PGP: 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A

Even subtle issues can impact routing and identity.

---

## Integrity Rules

Each released Agent-Card includes:

- **CID** of its pinned artifact set
- **SHA-256 checksum** verifying content integrity
- Full validation under strict Ajv against the card schema

Validation covers:

- Structure matches the schema
- Schemas match the referenced Protocol-Commons verbs
- ENS TXT entries match card metadata

If these disagree, resolvers should treat the card as untrusted.

---

## ENS TXT Authority

Agent-Cards use the following TXT fields:
```
cl.entry
cl.agentcard
cl.cid.agentcard
cl.agentcard.mirror.ipfs
cl.checksum.agentcard
cl.owner
```

Updates must:

- Be signed (PGP or on-chain)
- Be logged in `RESOLUTION.md`
- Follow governance change processes

Unauthorized mutation breaks provenance.

---

## Security Values

We keep identity metadata:

- Minimal
- Non-invasive
- Public-good oriented

No credentials. No personal data. No hidden routing.

---

**Status:** Stable · Open to the ecosystem
