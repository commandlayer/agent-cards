# Security & Provenance — Agent-Cards

## Ownership

- Owner: commandlayer.eth
- Security Contact: dev@commandlayer.org
- PGP: 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A

---

## Integrity

Each card MUST publish:

- `cl.cid.agentcard`
- `cl.checksum.agentcard`

These MUST match pinned release artifacts.

All cards validated in CI.

---

## ENS TXT Authority

Agent-Cards controls:
```
cl.entry
cl.agentcard
cl.cid.agentcard
cl.agentcard.mirror.ipfs
cl.checksum.agentcard
cl.owner
```

Changes MUST:
- Be signed
- Be logged in `RESOLUTION.md`
- Follow governance review

---

## Disclosure

Security issues reported privately to:
dev@commandlayer.org (use PGP if sensitive)

---

Status: **Security-Critical**



