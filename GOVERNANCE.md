# GOVERNANCE — AGENT-CARDS
CommandLayer Core Standards · Identity Layer

**Status:** v1.0.0 — Stable-Lock  
Applies To: All canonical Agent-Cards

> This document is **NORMATIVE and ENFORCEABLE**.  
> Governance is custodial today and **designed to decentralize** over time.

---

## 1. Stewardship Authority

**Founding Steward:** `commandlayer.eth`  
**Governance**: CommandLayer Standards Council

Authority scope:

- Base schema rules
- ENS TXT canonical binding keys + semantics
- Release publishing + version integrity
- Revocation + security incident adjudication

**Identity MUST remain:**

- Standards-first (ERC-8004 + x402 alignment)
- Verifiable by any resolver
- Immutable once published

> Stewardship protects **trust** until broader governance emerges.

---

## 2. Versioning Classes

| Change Class | Examples | Version Rule | Logging |
|-------------|----------|--------------|--------|
| **Normative** (breaking) | Base schema shape, key semantics | Major: `v1 → v2` | `RESOLUTION.md` |
| **Capability additions** | Allowed operations, input/output hints | Minor: `v1.0 → v1.1` | `RESOLUTION.md` |
| **Metadata correctness** | Doc changes, contact fields | Patch: `v1.0.0 → v1.0.1` | Commit message |

Any visible change MUST:

✔ Update `updated_at`  
✔ Regenerate checksums + manifest  
✔ Pass Ajv strict validation  
✔ Receive signed governance approval  

---

## 3. Immutability Guarantees

Once released:

- Version folders MUST NOT change  
- `$id` and CID MUST remain stable forever  
- ENS TXT MUST continue to resolve correctly  
- Entry format MUST remain canonical:  
  `x402://<ens>/<verb>/v1`

Violations:

- Resolver MUST reject card as **untrusted**
- Immediate governance revocation required

---

## 4. ENS TXT Canonical Contract

Agent-Cards define the **canonical truth** for resolver discovery.  
The following TXT records are **NORMATIVE and REQUIRED**:

| TXT Key | MUST Equal | Description | Validation |
|--------|------------|-------------|------------|
| `cl.entry` | `entry` | Canonical x402 invocation URI | MUST match pattern: `x402://<ens>/<verb>/v1` |
| `cl.agentcard` | HTTPS mirror of Agent-Card JSON | Public identity document | MUST match `$id` of the card |
| `cl.cid.agentcard` | CID root containing the card | Integrity anchor | MUST resolve + match manifest |
| `cl.agentcard.mirror.ipfs` | IPFS URL to the same card | Decentralized fallback | MUST be under the same CID root |
| `cl.checksum.request` | SHA-256 of request schema | Schema integrity | MUST match manifest |
| `cl.checksum.receipt` | SHA-256 of receipt schema | Receipt integrity | MUST match manifest |
| `cl.checksum.agentcard` | SHA-256 of card JSON | Identity integrity | MUST match manifest |
| `cl.owner` | `owner` field of Agent-Card | Authority reference | MUST reflect governance-approved owner |

### Enforcement (Normative)

Resolvers MUST reject a card as **UNTRUSTED** if:

- Any required TXT record is **missing**
- A value **does not match** the Agent-Card metadata
- A checksum or CID **does not match** the manifest
- HTTPS/IPFS mirrors **do not resolve**

**Correct TXT = trusted identity**  
**Anything else = untrusted**



### Enforcement

If **any** field is:

- Missing
- Stale
- CID mismatched
- Checksum invalid
- Value in conflict with card metadata

→ Binding is **INVALID**  
→ Resolver MUST NOT treat as canonical

---

## 5. Publication Change Flow

1. Issue opened with motivation  
2. Updated card passes strict CI  
3. New CID + checksums generated and signed  
4. Governance review and approval  
5. ENS TXT updated  
6. New version tag + RESOLUTION.md entry  

**Atomic or rejected.**  
No silent edits.

---

## 6. Deprecation & Revocation

### Deprecation
- `"status": "deprecated"`
- Logged in `RESOLUTION.md`
- Backward-compatible fallback recommended

### Revocation
- Only for security / correctness failure
- ENS TXT MUST mark disablement
- Replacement version MAY follow
- Logged immediately

> Deprecation is **graceful**.  
> Revocation is **safety-critical**.

---

## 7. Transparency + Accountability

Governance relies on these artifacts:

| Document | Purpose |
|---------|---------|
| `SPEC.md` | Normative identity requirements |
| `POLICY.md` | Metadata + ENS correctness rules |
| `SECURITY.md` | Reporting + mitigation requirements |
| `SECURITY_PROVENANCE.md` | Signed CIDs + checksums |
| `RESOLUTION.md` | Lifecycle + incident log |
| `VERSIONING.md` | Change class → version mapping |

All must update **in sync** with each release.

---

_Last updated: v1.0.0 — Stable-Lock_  
Signed: **commandlayer.eth**  
*Founding Steward — CommandLayer Standards*
