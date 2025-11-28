# CommandLayer — Agent Cards
**Canonical identity metadata for autonomous agents**  
**Standards-aligned · Deterministic · Verifiable**

<p align="center">
<a><img alt="Stability" src="https://img.shields.io/badge/Status-Stable%20v1.0.0-brightgreen"/></a>
<a href="https://www.npmjs.com/package/@commandlayer/agent-cards">
<img alt="NPM" src="https://img.shields.io/npm/v/@commandlayer/agent-cards"/></a>
<a href="https://github.com/commandlayer/agent-cards/actions/workflows/validate.yml">
<img alt="CI" src="https://github.com/commandlayer/agent-cards/actions/workflows/validate.yml/badge.svg?branch=main"/></a>
<a href="./LICENSE"><img alt="License" src="https://img.shields.io/badge/License-Apache--2.0-blue"/></a>
</p>

---

## Purpose
**“The universal discovery contract for autonomous agents.”**

**Agent Cards are the identity and discovery layer for autonomous agents — binding canonical verbs to verifiable x402 execution.**

**They enable machine-to-machine interoperability without bilateral agreements or custom APIs.**
- `Identity` • `Discovery` • `Invocation` • `Verification` 
- **One universal contract for agent interop**



Agent Cards are **machine-readable** identity documents describing how an autonomous agent implements a canonical verb — defined in Protocol-Commons (open) or Protocol-Commercial (permissioned) — including the metadata required for trustless discovery, validation, and invocation.

## This repository contains the official reference Agent Cards:

- **Commons** (open, foundation layer)

- **Commercial** (permissioned, monetizable layer)

- Both tiers use the same metadata contract and identical discovery mechanisms.



| Layer                  | Repository            | License               |
| ---------------------- | --------------------- | --------------------- |
| Protocol — Commons     | `protocol-commons`    | MIT                   |
| Identity — Agent Cards | `agent-cards`         | Apache-2.0            |
| Execution — Commercial | `protocol-commercial` | Proprietary (planned) |



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

Without this, every agent becomes an API silo — isolated, brittle, and incompatible.

**Every Agent Card is a portable contract: anyone can resolve the verb, validate the payload,  
and verify execution provenance — without trusting the operator.**




## Architecture Role


Agent Cards bridge **semantic definitions** and **runtime execution:**

```
+------------------------+
|  Protocol-Commons      |  ← Canonical Verb Schemas
|  Protocol-Commercial   |  ← Monetized Verb Schemas
+-----------+------------+
            |
            v
+------------------------+
|    Agent Cards         |  ← Identity + metadata binding
|  (JSON, immutable)     |
+-----------+------------+
            | ENS TXT Discovery (ERC-8004)
            v
+------------------------+
|     x402 Entry         |  ← Verifiable invocation
|   / Runtime URI        |
+-----------+------------+
            |
            v
+------------------------+
|   Execution Engine     |  ← Any A2A runtime / LLM agent
+-----------+------------+
            |
            v
+------------------------+
|   Structured Receipt   |  ← Canonical outputs + trace
+-----------+------------+
            |
            v
+------------------------+
|    Agent Chaining      |  ← Multi-agent workflow automation
+------------------------+


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

Each Agent Card is a JSON file defining:

| Field | Description |
|-------|-------------|
| `verb` | Canonical action binding |
| `schemas.request` / `receipt` | Typed IO guarantees via Protocol-Commons |
| `x402.entry` | Runtime invocation URI |
| `ens.name` | On-chain identity pointer |
| `publisher` | Attribution + optional PGP metadata |
| `cid` & `checksum` | Integrity enforcement |
| `capabilities` | Non-normative IO description |
| `version` | Deterministic lifecycle alignment |

All cards:

- use **JSON Schema Draft 2020-12**
- are **Ajv-validated + checksum-enforced**
- must resolve all `$ref` dependencies
- are **immutable** once published within a version family

---

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

**Example Agent Card (Summarize):**

 File: `./schemas/v1.0.0/commons/summarize.agent.card.json`

```{
  "$schema": "https://commandlayer.org/agent-cards/schemas/v1.0.0/commons/agent.card.base.schema.json",
  "$id": "https://commandlayer.org/agent-cards/agents/v1.0.0/commons/summarizeagent.eth.json",
  "id": "summarizeagent.eth",
  "slug": "summarizeagent",
  "display_name": "Summarize Agent (Protocol Reference)",
  "description": "Official protocol-level reference agent for the summarize verb. Produces concise summaries from longer content according to the summarize.request and summarize.receipt schemas.",
  "owner": "commandlayer.eth",
  "ens": "summarizeagent.eth",
  "version": "1.0.0",
  "status": "protocol_reference",
  "class": "commons",
  "implements": [
    "summarize"
  ],
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
      "text/markdown",
      "application/json"
    ]
  },
  "meta": {
    "publisher": "CommandLayer",
    "contact": "dev@commandlayer.org",
    "pgp_fingerprint": "5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A",
    "tags": [
      "summarize",
      "compression",
      "protocol-reference"
    ]
  },
  "networks": [
    "eip155:1"
  ],
  "license": "Apache-2.0",
  "created_at": "2025-11-22T00:00:00Z",
  "updated_at": "2025-11-22T00:00:00Z"
}


```
Example usage (TypeScript):
```
import card from "./agents/v1.0.0/commons/summarizeagent.eth.json";

console.log(card.id);          // "summarizeagent.eth"
console.log(card.entry);       // "x402://summarizeagent.eth/summarize/v1"
console.log(card.schemas.request);
// ipfs://bafybei.../commons/summarize/requests/summarize.request.schema.json

```
---

### Versioning & Immutability

Versioning follows **protocol alignment:**

- v1.0.0 aligns to Commons v1.0.0

- Additive updates → patch/minor releases

- Breaking changes → new major version directory (e.g. v2.x)

Published cards **cannot be modified**; integrity is cryptographically enforced.

---

### Release Integrity

| Component | Status |
|----------|--------|
| Agent Cards (v1.0.0) CID | `bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we` |
| Checksums | Included in `checksums/` |
| Provenance | Verified via CI |

Reproducibility is mandatory.

---
## On-chain Discovery

**Live ENS TXT example (summarizeagent.eth)**

```
cl.verb=summarize
cl.version=1.0.0

cl.entry=x402://summarizeagent.eth/summarize

cl.schema.request=https://commandlayer.org/schemas/v1.0.0/commons/summarize/requests/summarize.request.schema.json
cl.schema.receipt=https://commandlayer.org/schemas/v1.0.0/commons/summarize/receipts/summarize.receipt.schema.json
cl.cid.schemas=bafybeigvf6nkzws7dblos74dqqjkguwkrwn4a2c27ieygoxmgofyzdkz6m
cl.schemas.mirror.ipfs=https://ipfs.io/ipfs/bafybeigvf6nkzws7dblos74dqqjkguwkrwn4a2c27ieygoxmgofyzdkz6m

cl.agentcard=https://commandlayer.org/agent-cards/agents/v1.0.0/commons/summarizeagent.eth.json
cl.cid.agentcard=bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we
cl.agentcard.mirror.ipfs=https://ipfs.io/ipfs/bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we/agents/summarizeagent.eth.json

cl.checksum.request=sha256:20bd4897a2b91c66de84b31d0f586d5b5b8fecc9573e4c5dae3b97a78552d3fa
cl.checksum.receipt=sha256:ccb7f20562d2e34dff73a17794aabcf98f25f659e83a790e42cf9a31e97460b3
cl.checksum.agentcard=sha256:cffb7a4534c0848767eacdf5e3a1775b73a093baa8117e09957ba5d9a145af19

cl.owner=commandlayer.eth
```
### License

**Apache License 2.0**

Chosen to protect:

- open adoption and ecosystem neutrality

- identity metadata patent rights

- long-term accessibility

Agent identity is a **public good.**

----

### Status

**Stable — v1.0.0 published**

- 10 Commons Agents

- Commercial tier scaffolded

---

### Contributing

All proposals must include:

1. Motivation and expected interactions

2. Validation-passing implementation

3. No breaking mutations to published artifacts

Policy: `POLICY.md`
Security: `SECURITY.md`

Commons schema proposals should be opened in **Protocol-Commons.**

---

### Governance

This registry follows a neutral, standards-oriented stewardship model.  
Future revisions will align with community participation, open discovery requirements, and decentralized identity norms.

No single runtime or economic model is privileged.








