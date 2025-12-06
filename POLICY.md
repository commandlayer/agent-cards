# Schemas Policy — Agent Cards
CommandLayer Core Standards · Identity Layer

**Status:** v1.0.0 — Stable-Lock  
**Applies To:** All canonical Agent-Cards

> This document is **NORMATIVE and ENFORCEABLE**.  
> It supplements, but does not override, `SPEC.md` and `Governance.md`.

---

## 1️⃣ Scope

This policy applies to:

- All Agent-Card JSON documents under:
  - `agents/v*/commons/*.json`
  - `agents/v*/commercial/*.json`
- All identity schema definitions under:
  - `schemas/**`
- All shared primitives under:
  - `schemas/_shared/**`

Execution and runtime behaviors are **explicitly outside** this scope.

Identity MUST remain deterministic, verifiable, and trust-preserving.

---

##  Required Fields (NORMATIVE)

The following fields MUST exist in every published Agent-Card:

| Field Group | Required Keys |
|------------|----------------|
| Identity | `id`, `slug`, `display_name`, `description` |
| Ownership | `owner`, `ens` |
| Versioning | `version` |
| Lifecycle | `status`, `class` (`commons` or `commercial`) |
| Semantics | `implements` (non-empty; primary verb = `implements[0]`) |
| Execution | `entry` (canonical x402 URI), `networks` |
| Schemas | `schemas.request`, `schemas.receipt` |
| License | `license` |
| Timestamps | `created_at`, `updated_at` |


These fields MAY exist but **MUST NOT** be assumed for identity resolution.
Absence of any **Required** field = **NON-COMPLIANT**.

- `schemas_mirror.*`
- `capabilities`
- `meta`

`implements[0]` MUST correspond to a canonical verb defined in Protocol-Commons or Protocol-Commercial.

---

##  Validation Requirements

- JSON Schema Draft **2020-12**
- Ajv **strict** mode
- `"additionalProperties": false"`
- `$id` MUST resolve via HTTPS
- Entry MUST follow:


  ```
 x402://<ens>/<verb>/v1
```

The primary verb MUST already exist in **Protocol-Commons**.

---

## 3. ENS TXT Binding Rules

Required TXT records:
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

**ONLY** universal discovery fields permitted.  

 **No marketing, pricing, business metadata in ENS.**

---

## 4. Immutability & Versioning

Once published:

- Files MUST NOT mutate
- CIDs MUST remain content-correct
- ENS TXT MUST continue resolving to valid artifacts

Version updates MUST:

✔ Increment `version`  
✔ Update CIDs + checksums  
✔ Pass strict CI  
✔ Log lifecycle event in `RESOLUTION.md`  
✔ Receive governance approval  

Silent edits are prohibited.

---

_Last updated: v1.0.0 — Stable-Lock_
