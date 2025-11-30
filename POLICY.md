# Schemas Policy — Agent Cards

This document governs the structure, evolution, and stability requirements for all Agent Card schema definitions and metadata within the Agent Cards layer of CommandLayer.

Agent discoverability, trust, and execution depend on **consistent**, **auditable**, and **non-breaking** identity semantics. These rules guarantee that an Agent Card pinned today will still resolve correctly in the future.

---

## 1️⃣ Scope

This policy applies to:

- All Agent Card JSON documents under `/cards/`
- All identity schema definitions under `/schemas/`
- All shared primitives (iden
CommandLayer Core Standards · Identity Layer

This document defines **binding publication rules** for canonical Agent-Cards.
It supplements, but does not override, the normative `SPEC.md`.

---

## 1. Required Fields

All published Agent-Cards MUST include:

- `id`
- `slug`
- `display_name`
- `description`
- `owner`
- `ens`
- `version`
- `status`
- `class`
- `implements` (non-empty; primary verb = `implements[0]`)
- `entry` (canonical x402 URI)
- `schemas.*` and `schemas_mirror.*`
- `capabilities`
- `meta`
- `networks`
- `license`
- `created_at`
- `updated_at`

Absence of ANY required field = **NON-COMPLIANT**.

---

## 2. Validation Requirements

- JSON Schema Draft **2020-12**
- Ajv **strict** validation
- `"additionalProperties": false`
- `$id` MUST resolve over HTTPS
- Entry MUST follow:

x402://<ens>/<verb>/v1

yaml
Copy code

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
