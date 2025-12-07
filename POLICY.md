# Schemas Policy — Agent Cards
CommandLayer Core Standards · Identity Layer

**Status:** v1.0.0 — Stable-Lock  
**Applies To:** All canonical Agent-Cards

> This document is **NORMATIVE and ENFORCEABLE**.  
> It supplements, but does not override, `SPEC.md` and `Governance.md`.

---

##  Scope

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

## ENS TXT Binding Rules (NORMATIVE)

The following TXT records are **required** for canonical Agent-Card identity:

- `cl.entry` — canonical x402 invocation URI  
- `cl.agentcard` — HTTPS location of the Agent-Card JSON document  
- `cl.cid.agentcard` — CID for cryptographic identity verification  
- `cl.agentcard.mirror.ipfs` — IPFS fallback for trustless resolution  
- `cl.checksum.request` — SHA-256 of the canonical request schema  
- `cl.checksum.receipt` — SHA-256 of the canonical receipt schema  
- `cl.checksum.agentcard` — SHA-256 of the Agent-Card JSON  
- `cl.owner` — ENS identifier responsible for the Agent-Card

TXT values **MUST** exactly match the published Agent-Card and referenced
schemas. Any mismatch or omission renders the identity **UNTRUSTED**.


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
