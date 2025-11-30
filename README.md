# Agent Cards — CommandLayer

**Canonical identity metadata for autonomous agents**  
**Standards-aligned · Deterministic · Verifiable**

<div align="center">

[![Status](https://img.shields.io/badge/Status-Stable%20v1.0.0-brightgreen)](#)
[![npm](https://img.shields.io/npm/v/@commandlayer/agent-cards)](https://www.npmjs.com/package/@commandlayer/agent-cards)
[![CI](https://github.com/commandlayer/agent-cards/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/commandlayer/agent-cards/actions/workflows/validate.yml)
[![License](https://img.shields.io/badge/License-Apache--2.0-blue)](./LICENSE)

</div>

---

Agent Cards turn **ENS names** into **verifiable**, **executable agent identities** — the discovery + invocation contract for autonomous agents.


## Purpose

Machine discoverability + verifiable execution = the **universal invoke contract for agents.**

Agent Cards bind canonical verbs to verifiable x402 execution — enabling trustless:

- **Identity**
- **Discovery**
- **Invocation**
- **Verification**

One universal contract for agent interop.

---

## Architecture Primer

```text
+------------------------+
|  Protocol-Commons      | (canonical verbs)
|  Protocol-Commercial   | (monetized verbs)
+-----------+------------+
            |
            v
+------------------------+
|     Agent Cards        | (identity + metadata)
+-----------+------------+
            | ERC-8004 TXT discovery
            v
+------------------------+
|   x402 Transport Layer | (verifiable invocation)
+-----------+------------+
            v
+------------------------+
| Structured Receipt     | (typed + trusted output)
+------------------------+
```


Agent Cards are **machine-readable** identity documents describing how an autonomous agent implements a canonical verb — defined in Protocol-Commons (open) or Protocol-Commercial (permissioned) — including the metadata required for trustless discovery, validation, and invocation.


### Contents of this repository

- **Commons** (open, foundation layer)

- **Commercial** (permissioned, monetizable layer)

- Both tiers use the same metadata contract and identical discovery mechanisms.



| Layer                  | Repository            | License               |
| ---------------------- | --------------------- | --------------------- |
| Protocol — Commons     | `protocol-commons`    | MIT                   |
| Identity — Agent Cards | `agent-cards`         | Apache-2.0            |
| Execution — Commercial | `protocol-commercial` | Proprietary           |



 **Execution lives outside this repository and can vary by implementation.**

## Why Agent Cards Matter

Autonomous agents only work together if they share:

- a **common language** (canonical verbs)
- a **global identity system** (ENS)
- a **verifiable trust layer** (x402)

**Agent Cards bind all three** — turning the internet into an **interoperable machine economy.**

- Deterministic identity  
- Typed requests + receipts  
- Verifiable execution  
- Neutral + permissionless  

**Without this, every agent becomes an API silo — isolated, brittle, and incompatible.**

Every Agent Card is a portable contract: anyone can resolve the verb, validate the payload,  
and verify execution provenance — without trusting the operator.




## Architecture Role

Agent Cards bridge **semantic definitions** and **runtime execution:**

```
[ Semantic Layer ]   →   [ Identity Layer ]   →   [ Execution Layer ]   →   [ Trusted Output ]
(Commons / Commercial)     (ENS + Agent Card)       (x402 Runtime)           (Structured Receipt)

```
This layering enables **neutral**, **interoperable**, **trust-minimized** agent ecosystems.

### End-to-end invocation flow

```
[App / Agent]
      ↓ Discover (ERC-8004)
[ENS TXT Record → Identity & Metadata]
      ↓ Validate (Protocol-Commons)
[Request Schema / Receipt Schema]
      ↓ Invoke (x402)
[Verb Execution]
      ↓ Verify
[Receipt: typed + trusted]
      ↓ Route
[Next Agent Triggered by Verb]
      ↓
Multi-Agent Workflow (A2A = Autonomous-to-Autonomous — no humans required in the loop.)

```
---

## Identity Contract

Each Agent Card is a JSON document conforming to the `agent.card.base.schema.json` contract. Core fields:

| Group            | Field                | Description |
|-----------------|----------------------|-------------|
| Identity         | `id`                 | Canonical agent identifier (usually the ENS name). |
|                 | `slug`               | URL-safe, human-readable slug for local use. |
|                 | `display_name`       | Human-readable name for the agent. |
|                 | `description`        | Short description of what the agent does. |
| Ownership        | `owner`              | ENS name or identifier controlling the card (e.g. `commandlayer.eth`). |
|                 | `ens`                | ENS name the agent is bound to (e.g. `summarizeagent.eth`). |
| Versioning       | `version`            | Semantic version of the Agent Card contract (e.g. `1.0.0`). |
| Lifecycle        | `status`             | Lifecycle state (`protocol_reference`, `active`, `deprecated`, etc.). |
|                 | `class`              | Tier of the agent (`commons` or `commercial`). |
| Semantics        | `implements`         | Array of canonical verbs this agent implements (e.g. `["summarize"]`). |
| Schemas          | `schemas.request`    | Canonical request schema URI (typically IPFS). |
|                 | `schemas.receipt`    | Canonical receipt schema URI (typically IPFS). |
| Schema Mirrors   | `schemas_mirror.request` | HTTP(S) mirror for the request schema. |
|                 | `schemas_mirror.receipt` | HTTP(S) mirror for the receipt schema. |
| Execution        | `entry`              | x402 entry URI for this agent (e.g. `x402://summarizeagent.eth/summarize/v1`). |
| Capabilities     | `capabilities`       | Non-normative description of supported operations, input/output types, limits, etc. |
| Metadata         | `meta`               | Free-form metadata (tags, links, provider info, PGP fingerprint, etc.). |
| Networks         | `networks`           | Chains / networks this agent is valid on (e.g. `["eip155:1"]`). |
| License          | `license`            | License for this Agent Card (e.g. `Apache-2.0`). |
| Timestamps       | `created_at`         | ISO 8601 creation timestamp. |
|                 | `updated_at`         | ISO 8601 last update timestamp. |


## Repository Structure

```text
agent-cards/
│
├─ agents/
│  └─ v1.0.0/
│     ├─ commons/
│     │  ├─ summarizeagent.eth.json
│     │  ├─ analyzeagent.eth.json
│     │  └─ ... (other Commons Agent Cards)
│     └─ commercial/
│        ├─ checkoutagent.eth.json
│        └─ ... (other Commercial Agent Cards)
│
├─ checksums/
│  ├─ commons/
│  │  ├─ summarizeagent.eth.sha256
│  │  ├─ analyzeagent.eth.sha256
│  │  └─ ...
│  └─ commercial/
│     ├─ checkoutagent.eth.sha256
│     └─ ...
│
├─ meta/
│  ├─ manifest.json        ← Version, CIDs, mirrors, registry metadata
│  └─ ...
│
├─ .well-known/
│  └─ agent-cards-v1.0.0.json  ← Discovery helper / registry descriptor
│
├─ scripts/
│  ├─ validate.ts          ← CI validation + typecheck helpers
│  └─ ...
│
├─ LICENSE                 ← Apache-2.0
├─ package.json
└─ README.md

```

Commercial cards follow the **same contract** and validation rules.

---

## Standards Alignment

Agent Cards comply with:

- **Protocol-Commons v1.0.0** (canonical semantics)
- **ERC-8004** (ENS TXT schema discovery)
- **x402** transport envelopes (agent invocation)
- **IPFS** content addressing (CID-first)
- **Strict JSON Schema** governance

No proprietary transports.  
No token requirements.

---

## Validation

```bash
npm install
npm run validate
```


Validation performs:

- $ref resolution integrity

- Schema contract enforcement

- Hash-based immutability checks

- Strict type guarantees

Any deviation **fails CI.**

---

## Usage 

Agent Cards enable interoperable:

- **agent registries**

- **routing engines**

- **DAG workflow automation**

- **marketplaces and hubs**

- **composable multi-agent systems**

They are **runtime-agnostic** and usable in any A2A environment.

### **Example usage (TypeScript):**
```
import card from "./agents/v1.0.0/commons/summarizeagent.eth.json";

console.log(card.id);          // "summarizeagent.eth"
console.log(card.entry);       // "x402://summarizeagent.eth/summarize/v1"
console.log(card.schemas.request);
// ipfs://bafybei.../commons/summarize/requests/summarize.request.schema.json

```
### **Example Agent Card (Summarize):**
```
{
  "$schema": "https://commandlayer.org/agent-cards/schemas/v1.0.0/commons/agent.card.base.schema.json",
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
    "request": "ipfs://bafybeigvf6nkzws7dblos74dqqjkguwkrwn4a2c27ieygoxmgofyzdkz6m/commons/summarize/requests/summarize.request.schema.json",
    "receipt": "ipfs://bafybeigvf6nkzws7dblos74dqqjkguwkrwn4a2c27ieygoxmgofyzdkz6m/commons/summarize/receipts/summarize.receipt.schema.json"
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
      "produce_bullet_summaries",
      "produce_paragraph_summaries"
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
---

## Versioning & Immutability

Versioning follows **protocol alignment:**

- v1.0.0 aligns to Commons v1.0.0
- Additive updates → patch/minor releases
- Breaking changes → new major version directory (e.g. v2.x)

Published cards **cannot be modified**; integrity is cryptographically enforced.

---

## Release Integrity

| Component | Status |
|----------|--------|
| Agent Cards (v1.0.0) CID | `bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we` |
| Checksums | Included in `checksums/` |
| Provenance | Verified via CI |

Reproducibility is mandatory.

---
### **On-Chain Discovery — ENS TXT Binding (Normative)**

```txt
cl.verb=<verb>
cl.version=<card-version>

cl.entry=x402://<ens>/<verb>/v1

cl.schema.request=https://commandlayer.org/schemas/v1.0.0/commons/<verb>/requests/<verb>.request.schema.json
cl.schema.receipt=https://commandlayer.org/schemas/v1.0.0/commons/<verb>/receipts/<verb>.receipt.schema.json
cl.cid.schemas=<cid-of-protocol-commons-schemas>
cl.schemas.mirror.ipfs=https://ipfs.io/ipfs/<cid-of-protocol-commons-schemas>

cl.agentcard=https://commandlayer.org/agent-cards/agents/v1.0.0/<class>/<ens>.json
cl.cid.agentcard=<cid-of-agent-card-folder>
cl.agentcard.mirror.ipfs=https://ipfs.io/ipfs/<cid-of-agent-card-folder>/agents/v1.0.0/<class>/<ens>.json

cl.checksum.request=sha256:<request-schema-sha256>
cl.checksum.receipt=sha256:<receipt-schema-sha256>
cl.checksum.agentcard=sha256:<agent-card-sha256>

cl.owner=commandlayer.eth

```
## Governance

Agent Cards follow a neutral, standards-oriented stewardship model:

- No single runtime, operator, or economic model is privileged
- Canonical decisions align to ERC-8004 and x402 ecosystem needs
- Breaking changes require major versioning (immutability by default)
- Community proposals evaluated via open discussion and security review
- Governance ensures longevity and neutrality.


----

## Status

**Stable — v1.0.0 published**

- 10 Commons Agents

- Commercial tier scaffolded

----


## License

**Apache License 2.0**

Chosen to protect:

- open adoption and ecosystem neutrality

- identity metadata patent rights

- long-term accessibility

Agent identity is a **public good.**

---

## Contributing

All proposals must include:

1. Motivation and expected interactions

2. Validation-passing implementation

3. No breaking mutations to published artifacts

Policy: `POLICY.md`
Security: `SECURITY.md`

Commons schema proposals should be opened in **Protocol-Commons.**

---
## References

- [ERC-8004 — Agent Schema Discovery](https://eips.ethereum.org/EIPS/eip-8004)
- [x402 — Machine-to-Machine Value Transport](https://github.com/ethereum/x402)
- [JSON Schema 2020-12 — Validation Standard](https://json-schema.org/specification-links)
- [IPFS — Content Addressing](https://docs.ipfs.tech/concepts/content-addressing/)
- [ENS — Naming System for Web3](https://docs.ens.domains/)
