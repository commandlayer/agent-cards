# Compliance — Agent Cards

This document defines what it means to be **Agent-Cards compliant** — for both this repo and any external resolver or registry.

---

## 1. Scope

Rules apply to:

- Cards under `agents/v*/**/*.json`
- Checksums under `checksums/`
- Release metadata under `meta/`

**ENS TXT Summary**  
This document only summarizes TXT responsibilities.  
The canonical definitions and enforcement rules are specified in:  
- `SPEC.md` (Agent-Cards)

SPEC.md is authoritative for identity + invocation TXT binding.

---

## 2. Card Contract Requirements

A card is compliant if it:

- Validates under `agent.card.base.schema.json` in **strict Ajv mode**
- Includes all mandatory fields defined in SPEC.md
- Accurately reflects referenced schemas, TXT metadata, and CID state

Passing validation but conflicting with TXT/CID metadata is **not compliant**.

---

## 3. CIDs & Checksums

Every published card MUST:

- Have a checksum entry under `checksums/`
- Appear in `meta/manifest.json`
- Reflect the CID and IPFS mirror declared on ENS

Silent edits to card content without:
- New version, checksums, CID, and governance entry  
→ **non-compliant**

---

## 4. Commons vs Commercial Classes

`class` defines interpretation:

| Class | Meaning |
|-------|---------|
| `commons` | Canonical open semantics |
| `commercial` | May involve proprietary runtime behaviors |

**JSON contract identical**  
Interpretation + governance differ.

A Commons card MUST NOT rely on proprietary execution.

---

## 5. Security & Privacy

Cards MUST NOT include:

- Secrets, credentials, or API tokens
- Embedded executable scripts
- PII or private network locations

Resolvers SHOULD verify:
- TXT ↔ JSON ↔ CID consistency
- Checksums match published content

---

## 6. Governance Traceability

A change is legitimate only if:

- Logged in `RESOLUTION.md`
- CIDs + checksums updated + signed
- TXT changes justified + reviewable

No entry → Not canonical.

---

## 7. Deviation Handling

On discovery of:
- TXT/JSON mismatch  
- CID/checksum error  
- Security concern  

Steps:
1. Do not silently modify public state  
2. File an Issue or follow SECURITY.md  
3. Steward determines next version + revocation  
4. Updates logged in `RESOLUTION.md`

---

## 8. Compliance Checklist

You may claim **Agent-Cards compliant** if:

- Cards validate in strict mode  
- TXT ↔ JSON ↔ CID fully consistent  
- Commons vs Commercial class used correctly  
- All modifications logged and signed  
- Security guidelines followed  

Uncertain? Consider the implementation **experimental**.
