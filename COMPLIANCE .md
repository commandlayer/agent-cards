
# COMPLIANCE — Agent-Cards

This document defines what it means to be **Agent-Cards compliant** — for both this repo and any external resolver or registry claiming to use CommandLayer identity correctly.

---

## 1. Scope

These rules apply to:

- All Agent-Card JSON documents under `agents/v*/**/*.json`
- All checksums under `checksums/`
- All registry metadata in `meta/`
- All `.well-known` descriptors shipped with this repo
- The ENS TXT records governed by Agent-Cards:

  ```txt
  cl.entry
  cl.agentcard
  cl.cid.agentcard
  cl.agentcard.mirror.ipfs
  cl.checksum.request
  cl.checksum.receipt
  cl.checksum.agentcard
  cl.owner
If you’re touching those fields, you’re in compliance territory.

## 2. Card Contract Requirements

A card is **schema-compliant** if it:

- Validates under agent.card.base.schema.json (Draft 2020-12) in strict Ajv mode.

- Includes all required fields:

    id, slug, display_name, description

    owner, ens, version, status, class

    implements

    schemas, schemas_mirror

    entry

    capabilities, meta

    networks, license

    created_at, updated_at

Non-empty is not enough; the values must be coherent with:

-  underlying Protocol-Commons / Commercial schemas

- ENS TXT bindings

- Published CIDs and checksums

If your JSON passes schema validation but lies about its bindings, you are not compliant.

 ## 3. ENS TXT Responsibilities
For the primary verb (implements[0]) and ENS name ens, the TXT records MUST follow SPEC.md.

At minimum:

```
cl.verb=<verb>
cl.version=<card-version>

cl.entry=x402://<ens>/<verb>/v1

cl.schema.request=...
cl.schema.receipt=...
cl.cid.schemas=...
cl.schemas.mirror.ipfs=...

cl.agentcard=...
cl.cid.agentcard=...
cl.agentcard.mirror.ipfs=...

cl.checksum.request=sha256:<request-schema-sha256>
cl.checksum.receipt=sha256:<receipt-schema-sha256>
cl.checksum.agentcard=sha256:<agent-card-sha256>

cl.owner=<owner>
```
Compliance requires that:

`cl.verb` = `implements[0]`

`cl.version` = card `version`

`cl.entry` = card `entry`

`cl.schema.*` = `schemas_mirror.*`

`cl.cid.schemas` = canonical schemas CID

`cl.agentcard` = HTTPS mirror for this card

cl.cid.agentcard`= CID root for this card’s folder

`cl.checksum.*` = SHA-256 values from release manifests

`cl.owner` = `owner`


If **any** of these diverge, the identity binding is **INVALID**, and resolvers MUST treat the card as untrusted.

## 4. CIDs & Checksums

Each published card MUST have:

- A corresponding checksum file under `checksums/`

- An entry in `meta/manifest.json` or equivalent registry

Compliance means:

- The CID advertised via ENS and the mirrors actually point to the same JSON.

- The checksum matches the content byte-for-byte.

- Any change to card content results in:

    - A new version `(version, created_at/updated_at)`

    - Updated checksum

    - Updated CID

    - Logged entry in `RESOLUTION.md`

Silent edits to existing card content are non-compliant.

## 5. Commons vs Commercial

The `class` field enforces semantics:

**commons**

- Only implements canonical Protocol-Commons verbs.
- Intended as open, neutral, reference-grade identities.

**commercial**

- Implements verbs defined in the commercial layer.
- Can express more economic / proprietary behaviors in their runtimes.

Compliance requires:

- No Commercial behavior is misrepresented as Commons.
- Commons cards don’t depend on proprietary or private execution semantics.

The JSON contract is identical; **interpretation** and **governance** differ.

## 6. Security & Privacy
Agent-Cards are identity anchors, not application logs.

They MUST NOT contain:

- Secrets, credentials, or auth tokens.
- Direct private network addresses (localhost, RFC1918 ranges, etc.).
- User-specific PII.
- Embedded executable code or scripts.

Resolvers and registries that cache or mirror cards SHOULD:

- Validate checksums and CIDs before trusting content.
- Reject cards where TXT/JSON/CID are inconsistent.
- Follow the security processes in SECURITY.md for suspected compromise.

## 7. Governance Traceability

A change is **legitimate** only if:

- There is an entry in `RESOLUTION.md` describing:
    - Agent name(s)
    - Action (Added, Updated, Deprecated, Removed)
    - Reason and Resolution
    - Approver(s)

- Any ENS TXT mutation has a corresponding governance record.
- Card content, checksums, CIDs, and TXT records match the described state.

If there is no entry in `RESOLUTION.md`, the change is not considered official, even if technically possible.

## 8. Deviation Handling
If you discover:

- Incorrect TXT ↔ JSON mapping
- CID / checksum mismatches
- Schema or class misuse
- Security issues affecting routing or identity

Then:

1. **Do not** silently “fix” it in public.
2. File an Issue, or if sensitive, follow SECURITY.md and email dev@commandlayer.org (PGP encouraged).
3. Work with maintainers to:
    - Decide if a new card version is required.
    - Update checksums, manifests, and ENS TXT.
    - Append a `RESOLUTION.md` entry.

## 9. Compliance Checklist

You can credibly claim **Agent-Cards compliant** if:

 All cards validate against agent.card.base.schema.json in strict mode.

 - ENS TXT fields and JSON fields are fully consistent.
 - CIDs and checksums match actual content.
  -  ommons vs Commercial classes are used correctly.
 - All changes are logged in RESOLUTION.md.
 - Security practices in SECURITY.md and SECURITY_PROVENANCE.md are followed.

If any of the above are false, you’re running in experimental territory and should not present your setup as canonical or production-grade.


