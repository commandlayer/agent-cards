# Specification — Agent Cards
CommandLayer Core Standards · Identity Layer

> This document is **NORMATIVE and ENFORCEABLE**.

## RFC 2119 Keywords
MUST / MUST NOT / SHOULD / SHOULD NOT / MAY retain their RFC-defined meanings.

---

## 1. Purpose

Agent-Cards define the **canonical identity contract** for autonomous agents:

- Bind **ENS names → verbs → x402 entrypoints**
- Declare **typed request/receipt schemas** used by the agent
- Provide **capabilities & metadata** for discovery
- Anchor identity to **immutable schema releases** (Protocol-Commons)

Agent-Cards DO NOT define:

- How an agent executes internally  
- Pricing / billing logic  
- Business-specific configuration  
- Transport semantics beyond x402 entry URIs  

Those concerns belong to runtimes, commercial layers, or application logic.

---

## 2. Architecture Position

Agent-Cards unify identity for **both** semantic paths — Commons and Commercial:

```text
                    (Commons Verbs)          (Commercial Verbs)
                    Protocol-Commons         Protocol-Commercial
                             \                   /
                              \                 /
                               ↓               ↓
                             [ Identity Layer ]
                               Agent-Cards
                                     ↓
                           [ Runtime Layer ]
                           Protocol-Runtime (x402, etc.)
                                     ↓
                             Structured Receipts
```


- **Protocol-Commons** defines what canonical actions mean
(public goods: free, neutral, version-locked)

- **Protocol-Commercial** defines economic actions and their schema contracts
(market-aligned verbs, paid flows)

- **Agent-Cards** bind those actions to who performs them and how to call them
(ENS identity + invocation metadata)

- **Protocol-Runtime** delivers execution and proof
(agents run, receipts verify)

**Agent-Cards answer:**
“Given `<ens>`+ `<verb>`, who do I call and where do I route the request?”
## 3. JSON Contract (Base Schema)

All Agent-Cards MUST conform to:

`agent.card.base.schema.json` (JSON Schema Draft 2020-12).

### 3.1 Required Top-Level Fields

| Field          | Type     | Required | Description |
|----------------|----------|----------|-------------|
| `id`           | string   | Yes      | Canonical identifier for the agent, typically the ENS name (e.g. `summarizeagent.eth`). |
| `slug`         | string   | Yes      | URL-safe, lowercase slug (e.g. `summarizeagent`). |
| `display_name` | string   | Yes      | Human-readable name (e.g. `Summarize Agent (Protocol Reference)`). |
| `description`  | string   | Yes      | Short human-readable description of what the agent does. |
| `owner`        | string   | Yes      | ENS name or identifier controlling the card (e.g. `commandlayer.eth`). |
| `ens`          | string   | Yes      | ENS name this card is bound to (e.g. `summarizeagent.eth`). |
| `version`      | string   | Yes      | Semantic version of the Agent-Card document (e.g. `1.0.0`). |
| `status`       | string   | Yes      | Lifecycle status (`protocol_reference`, `active`, `deprecated`, etc.). |
| `class`        | string   | Yes      | Tier classification: `commons` or `commercial`. |

### 3.2 Verb Binding

| Field        | Type   | Required | Description |
|--------------|--------|----------|-------------|
| `implements` | array  | Yes      | Non-empty array of canonical verbs the agent implements (e.g. `["summarize"]`). |

Rules:

- `implements[0]` MUST be considered the **primary verb** for ENS TXT binding.  
- Every verb in `implements[]` MUST exist as a canonical or commercial verb in the corresponding standard layer.  
- Verb names MUST match the folder names in Protocol-Commons (for commons verbs).

Aliases are NOT represented here. No synonyms, no alternates.

---

## 4. Schema Binding

### 4.1 Canonical Schema URIs

| Field                    | Type   | Required | Description |
|--------------------------|--------|----------|-------------|
| `schemas.request`        | string | Yes      | Canonical request schema URI (usually IPFS `$id` from Protocol-Commons). |
| `schemas.receipt`        | string | Yes      | Canonical receipt schema URI (usually IPFS `$id` from Protocol-Commons). |

### 4.2 HTTP Mirrors

| Field                         | Type   | Required | Description |
|-------------------------------|--------|----------|-------------|
| `schemas_mirror.request`      | string | No      | HTTPS mirror for the request schema, typically under `https://commandlayer.org/…`. |
| `schemas_mirror.receipt`      | string | No      | HTTPS mirror for the receipt schema, typically under `https://commandlayer.org/…`. |

Rules:

- `schemas.*` MUST correspond to the **canonical** schema locations (usually IPFS `$id` URIs).  
- `schemas_mirror.*` SHOULD be HTTPS-resolvable mirrors of the same schemas.  
- These values MUST match the Protocol-Commons manifests for the relevant version (e.g. v1.0.0).

---

## 5. Execution Binding (x402 Entry)

| Field   | Type   | Required | Description |
|---------|--------|----------|-------------|
| `entry` | string | Yes      | x402 entry URI for the agent, binding ENS + verb + version. |

**Normative rule:**

```text
entry = "x402://<ens>/<verb>/v1"
```

Where:

- <ens> MUST equal the card’s ens field.
- <verb> MUST equal implements[0].
- /v1 denotes the x402 route version, not the card version.

Examples:

- `x402://summarizeagent.eth/summarize/v1`
- `x402://analyzeagent.eth/analyze/v1`

Any deviation from this pattern is NON-COMPLIANT.

## 6. Capabilities & Meta

These fields are descriptive, not contractual.

### 6.1 Capabilities

| Field          | Type   | Required | Description                                                                        |
| -------------- | ------ | -------- | ---------------------------------------------------------------------------------- |
| `capabilities` | object | Optional      | Non-normative description of supported operations, input/output types, and limits. |


Typical subfields MAY include:

- `operations`: array of supported operations (e.g. ["extract_key_points", "compress_long_form"])
- `input_types`: array of MIME types accepted
- `output_types`: array of MIME types produced
- `limits`: max token size, latency hints, etc.

### 6.2 Meta

| Field  | Type   | Required | Description                                                       |
| ------ | ------ | -------- | ----------------------------------------------------------------- |
| `meta` | object | Optional      | Free-form metadata (tags, publisher info, PGP fingerprint, etc.). |

Typical subfields MAY include:

- `publisher`: ENS name of publisher (e.g. `commandlayer.eth)`
- `pgp_fingerprint`: optional fingerprint for secure contact
- `tags`: array of strings
- `links`: non-executable links (docs, dashboards, etc.)

Meta MUST NOT contain secrets, credentials, or private endpoints.

## 7. Network & License

| Field      | Type   | Required | Description                                                                   |
| ---------- | ------ | -------- | ----------------------------------------------------------------------------- |
| `networks` | array  | Yes      | List of CAIP-2 chain identifiers the agent is valid on (e.g. `["eip155:1"]`). |
| `license`  | string | Yes      | License governing the Agent-Card document (e.g. `Apache-2.0`).                |

Rules:

- `networks` MUST NOT be empty.
- License MUST be an OSI/FSF-recognized or clearly documented license string.

## 8. Timestamps

| Field        | Type   | Required | Description                                        |
| ------------ | ------ | -------- | -------------------------------------------------- |
| `created_at` | string | Yes      | ISO 8601 creation timestamp of this card instance. |
| `updated_at` | string | Yes      | ISO 8601 last modification timestamp.              |


- `updated_at` MUST be ≥ `created_at`.
- Any visible change to the card MUST update updated_at and MUST be recorded in governance logs `(RESOLUTION.md).`

## 9. ENS TXT Binding (NORMATIVE — Identity + Invocation Only)

The ENS name specified in `ens` MUST publish:

- `cl.entry` — canonical x402 invocation URI
- `cl.agentcard` — HTTPS URL for the Agent-Card JSON
- `cl.cid.agentcard` — CID of the Agent-Card JSON
- `cl.agentcard.mirror.ipfs` — IPFS fallback of the Agent-Card JSON
- `cl.checksum.agentcard` — SHA-256 of the Agent-Card JSON
- `cl.owner` — ENS name responsible for this identity

TXT values MUST match the published Agent-Card exactly.

Resolvers MUST treat any mismatch or omission as an **UNTRUSTED identity binding**.

- **No schema TXT keys in Agent-Cards.**
  
- They belong in Protocol-Commons.


## 10. Commons vs Commercial Classes

The class field splits the universe of Agent-Cards:

- `commons` — Agents implementing **canonical** Protocol-Commons verbs (non-commercial, neutral).
- `commercial` — Agents implementing **economic or proprietary** verbs (defined in a separate commercial spec).

Rules:

- A `commons` Agent-Card MUST only implement verbs from Protocol-Commons.
- A `commercial` Agent-Card MUST NOT be represented as canonical Commons.
- Governance MAY impose stricter publication rights on commons cards (e.g. only commandlayer.eth).

The JSON contract is identical; governance and semantics differ.

## 11. Conformance Requirements

An Agent-Card is **CONFORMANT** if:

1. It validates against `agent.card.base.schema.json` under **Ajv strict** mode (JSON Schema 2020-12).

2. All required fields are present and non-empty:

   - `id`, `slug`, `display_name`, `description`
   - `owner`, `ens`
   - `version`, `status`, `class`
   - `implements` (non-empty; `implements[0]` = primary verb)
   - `schemas.request`, `schemas.receipt`
   - `entry`
   - `networks`
   - `license`
   - `created_at`, `updated_at`

3. If present, the following **optional** fields MUST be internally consistent:

   - `schemas_mirror.request`, `schemas_mirror.receipt` MUST mirror the canonical `schemas.*` locations.
   - `capabilities` and `meta` MUST NOT contain secrets, credentials, or private endpoints.

4. `entry` is a valid x402 URI of the form:

   `x402://<ens>/<verb>/v1`

  **Agent-Cards-Compatible**


if it can:

- Resolve ENS TXT → Agent-Card JSON → Protocol-Commons schemas
- Validate all three layers (TXT, card, schemas) coherently
- Invoke via x402 entrypoints and validate receipts

---
## 12. Failure Modes

An Agent-Card MUST be treated as INVALID if any of the following hold:

- JSON does not validate under the base schema.
- `entry` does not match the required x402 pattern.
- ENS TXT fields are missing or inconsistent with the card.
- CIDs do not match pinned artifacts (mismatched content).
- Checksums do not match actual SHA-256 of artifacts.
- `implements[]` references unknown verbs.

Consequences of INVALID:

- Resolver MUST NOT treat the card as canonical.
- Runtimes SHOULD NOT invoke the entry as trusted.
- Governance MUST log the incident and corrective action in `RESOLUTION.md.`

## 13. Security and Privacy

Agent-Cards are **security-critical identity anchors.**

They MUST NOT contain:

- Credentials or auth tokens
- Direct private network addresses (localhost, RFC1918, etc.)
- PII or user-specific data
- Embedded executable code or scripts

Security incidents (malicious TXT, poisoning attempts, CID mismatches) MUST be reported and handled per repository `SECURITY.md` and `SECURITY_PROVENANCE.md.`

## 14. Example — Summarize Agent (Commons)

Non-normative but illustrative example:

```json
{ 
  "$schema": "https://commandlayer.org/agent-cards/schemas/v1.0.0/_shared/agent.card.base.schema.json",
  "$id": "https://commandlayer.org/agent-cards/agents/v1.0.0/commons/summarizeagent.eth.json",

  "id": "summarizeagent.eth",
  "slug": "summarizeagent",
  "display_name": "Summarize Agent (Protocol Reference)",
  "description": "Official protocol-level reference agent for the summarize verb.",
  "owner": "commandlayer.eth",
  "ens": "summarizeagent.eth",
  "version": "1.0.0",
  "status": "protocol_reference",
  "class": "commons",

  "implements": ["summarize"],

  "schemas": {
    "request": "ipfs://<cid-schemas>/commons/summarize/requests/summarize.request.schema.json",
    "receipt": "ipfs://<cid-schemas>/commons/summarize/receipts/summarize.receipt.schema.json"
  },
  "schemas_mirror": {
    "request": "https://commandlayer.org/schemas/v1.0.0/commons/summarize/requests/summarize.request.schema.json",
    "receipt": "https://commandlayer.org/schemas/v1.0.0/commons/summarize/receipts/summarize.receipt.schema.json"
  },

  "entry": "x402://summarizeagent.eth/summarize/v1",

  "capabilities": {
    "operations": [
      "extract_key_points",
      "compress_long_form",
      "produce_bullet_summaries"
    ],
    "input_types": [
      "text/plain",
      "text/markdown",
      "application/json"
    ],
    "output_types": [
      "text/plain",
      "text/markdown"
    ]
  },

  "meta": {
    "publisher": "commandlayer.eth",
    "pgp_fingerprint": "5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A",
    "tags": ["summarize", "compression", "protocol-reference"]
  },

  "networks": ["eip155:1"],
  "license": "Apache-2.0",
  "created_at": "2025-11-22T00:00:00Z",
  "updated_at": "2025-11-22T00:00:00Z"
}
```

### Status

**Stable — v1.0.0 locked**
CommandLayer Core Standards · Agent-Cards
