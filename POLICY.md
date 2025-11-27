# Agent-Cards Policy

Agent Cards define agent identity, metadata, and execution entrypoints
for canonical verbs.

They MUST remain:
- Discoverable
- Versioned
- Cryptographically verifiable

---

## 1. Required Fields

Each card MUST include:

- `owner`
- `version`
- `entrypoints` keyed by canonical verb
- Checksums for request + receipt schemas
- x402 URL template

---

## 2. Structure & Validation

- JSON Schema Draft 2020-12
- Ajv strict validation
- `"additionalProperties": false`

Corresponding canonical verbs MUST already exist in Protocol-Commons.

---

## 3. ENS Binding Rules

MUST publish the following TXT entries:

```
cl.entry
cl.agentcard
cl.cid.agentcard
cl.agentcard.mirror.ipfs
cl.checksum.agentcard
cl.owner
```

No business metadata in ENS; only universal discovery material is permitted.

---

## 4. Immutability & Versioning

A versioned card MUST NOT be modified.

Updates MUST:
- Increment version
- Update CID + checksum
- Be logged in `RESOLUTION.md`







