# Governance — Agent Cards

Agent Cards define the discoverable identity, metadata, and runtime entrypoints for autonomous agents. They bind canonical verbs (from Protocol-Commons) to actual execution surfaces.

Governance ensures these records remain trustworthy, versioned, and verifiable by any agent resolver.

---

## Stewardship

- **Owner:** commandlayer.eth  
- **Maintainer:** CommandLayer Governance Council  
- **Contact:** dev@commandlayer.org  

The identity layer MUST remain:

- Standards-first (ERC-8004 + x402)  
- Non-proprietary  
- Immutable once published  

---

## Change Process

1. Open Issue with justification  
2. Provide updated JSON + validation proof
3. New checksum + provenance update
4. Maintainer review  
5. New version + tagged release

Breaking metadata structure requires **major** version.  
Capability-only additions follow **minor** version.

---

## ENS Binding

Agent-Cards are responsible for:

```
cl.entry
cl.agentcard
cl.cid.agentcard
cl.agentcard.mirror.ipfs
cl.checksum.request
cl.checksum.receipt
cl.checksum.agentcard
cl.owner
```

These fields **must**:

- Always resolve to a live agent card JSON
- Match current version metadata
- Pass strict checksum verification

Changes MUST be logged in `RESOLUTION.md`.

---

## Deprecation Policy

1. Log entry in `RESOLUTION.md`  
2. Tag card as deprecated in metadata  
3. Provide replacement if applicable  
4. Preserve backward compatibility whenever safe  

---

## Transparency Artifacts

- `POLICY.md` — correctness rules for cards  
- `SECURITY.md` — reporting and validation  
- `RESOLUTION.md` — identity lifecycle log  
- `SECURITY_PROVENANCE.md` — pinned CIDs & integrity record  

---











