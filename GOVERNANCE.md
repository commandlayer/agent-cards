# GOVERNANCE — AGENT-CARDS
CommandLayer Core Standards · Identity Layer

**Status:** v1.0.0 — Stable-Lock  
Applies To: All canonical Agent-Cards

> This document is **NORMATIVE and ENFORCEABLE**.

---

## 1. Stewardship Authority

**Founding Steward:** `commandlayer.eth`  
Authority scope:

- Identity + invocation TXT binding rules
- Release publication + version integrity
- Revocation + incident adjudication

Identity MUST remain verifiable by any resolver and immutable once published.

---

## 2. Versioning Classes

| Class | Examples | Version Rule | Logging |
|------|----------|--------------|--------|
| **Normative** | TXT semantics, identity rules | Major | `RESOLUTION.md` |
| **Capability** | Additional optional fields | Minor | `RESOLUTION.md` |
| **Metadata** | Contact fields, docs | Patch | Commit msg |

Changes MUST:

- Update `updated_at`
- Regenerate checksums + manifest
- Pass strict Ajv validation
- Receive signed governance approval

---

## 3. Immutability Guarantees

Once released:

- Version folders MUST NOT change  
- `$id` + CID MUST remain stable  
- TXT MUST resolve correctly  
- Entry format MUST remain:
```
x402://<ens>/<verb>/v1
```

Violations require immediate revocation.

---

## 4. ENS TXT Binding — Agent-Cards *(NORMATIVE)*

Agent-Cards govern the TXT records that bind **identity** and **invocation**:
```
cl.entry
cl.agentcard
cl.cid.agentcard
cl.agentcard.mirror.ipfs
cl.checksum.agentcard
cl.owner
```

TXT values MUST match the published Agent-Card metadata exactly.  
Resolvers MUST treat mismatches as **UNTRUSTED** identity bindings.

---

## 5. Publication Change Flow

1. Issue opened  
2. Updated card passes CI  
3. New CID + checksums generated and signed  
4. Governance approval  
5. TXT updated  
6. New version + RESOLUTION.md entry  

**Atomic or rejected.**

---

## 6. Deprecation & Revocation

Deprecation:
- `"status": "deprecated"`
- Logged in RESOLUTION.md

Revocation:
- Security / correctness failures
- TXT MUST indicate disablement
- Replacement MAY follow

---

## 7. Transparency + Accountability

Governance relies on:

- `SPEC.md`, `POLICY.md`
- `SECURITY*.md`
- `SECURITY_PROVENANCE.md`
- `RESOLUTION.md`
- `VERSIONING.md`

All MUST stay in sync.

---

_Last updated: v1.0.0 — Stable-Lock_  
Signed: **commandlayer.eth**  
*Founding Steward — CommandLayer Standards*





