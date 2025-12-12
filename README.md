# Agent Cards — CommandLayer
 
**Canonical identity metadata for autonomous agents**  
**Standards-aligned · Deterministic · Verifiable**

[![Status](https://img.shields.io/badge/Status-Stable%20v1.0.0-brightgreen)](https://github.com/commandlayer/agent-cards)
[![NPM Version](https://img.shields.io/npm/v/@commandlayer/agent-cards)](https://www.npmjs.com/package/@commandlayer/agent-cards)
[![CI Status](https://github.com/commandlayer/agent-cards/actions/workflows/validate.yml/badge.svg?branch=main)](https://github.com/commandlayer/agent-cards/actions/workflows/validate.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-blue.svg)](https://github.com/commandlayer/agent-cards/blob/main/LICENSE)

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

```
[ Canonical Verbs ]
Protocol-Commons + Protocol-Commercial
         ↓
[ Identity + Metadata ]
Agent Cards (ENS-bound)
         ↓ ERC-8004 TXT discovery
[ Verifiable Invocation ]
x402 runtime (monetizable)
         ↓
[ Trusted Output ]
Structured Receipt

```
Without this: agents become **isolated APIs.**
With this: the **interoperable machine economy** emerges.


### Repository Layers & Licensing

This stack  separates **language**, **identity**, and **execution** — keeping the protocol open and monetizeable only at runtime.

| Layer                   | Repository            | License / Model                                     |
|------------------------|----------------------|-----------------------------------------------------|
| Protocol — Commons      | `protocol-commons`   | MIT — free canonical semantic verbs & schemas        |
| Protocol — Commercial   | `protocol-commercial`| Apache-2.0 — free economic verb schemas             |
| Identity — Agent Cards  | `agent-cards`        | Apache-2.0 — identity metadata as a public good     |
| Execution — Runtime     | `protocol-runtime`   | Monetized at invocation endpoints (**toll road**)    |


 - **Schemas are always free.**
- **Identity is neutral and protected.**
- **Value is created only on execution.**



----

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

| Group          | Field                    | Requirement  | Description                                                |
| -------------- | ------------------------ | ------------ | ---------------------------------------------------------- |
| **Identity**   | `id`                     | **Required** | Canonical agent identifier (usually the ENS name).         |
|                | `slug`                   | **Required** | URL-safe identifier for local referencing.                 |
|                | `display_name`           | **Required** | Human-readable title for the agent.                        |
|                | `description`            | **Required** | Short summary of agent function.                           |
| **Ownership**  | `owner`                  | **Required** | ENS name or identifier controlling the card.               |
|                | `ens`                    | **Required** | ENS name bound to this agent.                              |
| **Versioning** | `version`                | **Required** | Semantic version of the card definition.                   |
| **Lifecycle**  | `status`                 | **Required** | `protocol_reference`, `active`, `deprecated`, etc.         |
|                | `class`                  | **Required** | `commons` or `commercial`.                                 |
| **Semantics**  | `implements`             | **Required** | Array of verbs implemented (primary verb MUST be index 0). |
| **Execution**  | `entry`                  | **Required** | Canonical x402 URI. Format: `x402://<ens>/<verb>/v1`       |
|                | `networks`               | **Required** | Supported chain identifiers (e.g. `["eip155:1"]`).         |
| **Schemas**    | `schemas.request`        | **Required** | Canonical request schema URI (IPFS).                       |
|                | `schemas.receipt`        | **Required** | Canonical receipt schema URI (IPFS).                       |
| **License**    | `license`                | **Required** | License for this card (Apache-2.0).                        |
| **Timestamps** | `created_at`             | **Required** | ISO 8601 creation time.                                    |
|                | `updated_at`             | **Required** | ISO 8601 last-modified time.                               |
| **Optional**   | `schemas_mirror.request` | Optional     | HTTPS mirror of request schema (MUST match IPFS).          |
|                | `schemas_mirror.receipt` | Optional     | HTTPS mirror of receipt schema (MUST match IPFS).          |
|                | `capabilities`           | Optional     | Non-normative runtime hints.                               |
|                | `meta`                   | Optional     | Tags, URLs, publisher info, fingerprints, etc.             |



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


### Quick start — resolve & validate an Agent Card from ENS

Given an ENS name (e.g. `summarizeagent.eth`), you can resolve its Agent Card via
the `cl.agentcard` TXT record, fetch the JSON, and validate it with Ajv before
using it in your runtime.

```ts
import { ethers } from "ethers";
import Ajv from "ajv";

// Adjust this import to wherever you expose the base Agent Card schema
// e.g. from your package, a local file, or a generated schema bundle.
import agentCardBaseSchema from "./schemas/agent.card.base.schema.json";

const RPC_URL = process.env.ETH_RPC_URL!;
const provider = new ethers.JsonRpcProvider(RPC_URL);

const ajv = new Ajv({ strict: true, allErrors: true });
const validateAgentCard = ajv.compile(agentCardBaseSchema);

export async function loadAgentCard(ens: string) {
  // 0) ENS must resolve before trusting TXT records
  const address = await provider.resolveName(ens);
  if (!address) {
    throw new Error(`ENS name does not resolve: ${ens}`);
  }

  // 1) ENS → resolver lookup
  const resolver = await provider.getResolver(ens);
  if (!resolver) {
    throw new Error(`Resolver not configured for ${ens}`);
  }

  // 2) TXT → canonical invocation metadata for autonomous agents
  const cardUrl = await resolver.getText("cl.agentcard");
  if (!cardUrl) {
    throw new Error(`Missing cl.agentcard TXT record for ${ens}`);
  }

  // 3) Fetch & parse Agent Card JSON
  const res = await fetch(cardUrl);
  if (!res.ok) {
    throw new Error(`Agent Card fetch failed (${res.status})`);
  }
  const card = await res.json();

  // 4) Schema validation (Ajv strict)
  const valid = validateAgentCard(card);
  if (!valid) {
    throw new Error(
      `Invalid Agent Card for ${ens}: ${ajv.errorsText(validateAgentCard.errors)}`
    );
  }

  // Hardening recommended in real deployments:
  // - Verify CID + SHA-256 checksum against known values
  // - Enforce version pinning (e.g. card.version === "1.0.0")


  // 5) Runtime usage
  console.log("Agent:", card.id);          // e.g. "summarizeagent.eth"
  console.log("x402 entry URI:", card.entry);
  console.log("Schemas:", card.schemas);   // { request, receipt }

  return card;
}

// Example usage
loadAgentCard("summarizeagent.eth").catch(console.error);
```

### **Example usage (TypeScript):**


```
import card from "./agents/v1.0.0/commons/summarizeagent.eth.json";
```
```
console.log(card.id);          // "summarizeagent.eth"
console.log(card.entry);       // "x402://summarizeagent.eth/summarize/v1"
console.log(card.schemas.request);
// ipfs://bafybei.../commons/summarize/requests/summarize.request.schema.json

```
### **Example Agent Card (Summarize):**
```
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
## Governance

Agent Cards follow a neutral, standards-oriented stewardship model:

- **Public good** — Agent Cards are open. Anyone can resolve, validate, and build with them forever.
- **Competitive runtime market** — Value happens at execution. No single operator controls who can run agents or get paid.
- **Multi-sig ENS custody** — All canonical ENS names are held in secure, shared governance for long-term protection.
- **Stable versions** — Published cards never mutate. Breaking changes = new major version.
- **Open review** — Community proposals, validation, and security checks before acceptance.
- **Standards aligned** — Built to last with ERC-8004 + x402 interoperability.
- **No lock-ins. No gatekeepers. No rugs.** Agents built today will still work a decade from now.

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
### **On-Chain Discovery — ENS TXT Binding**

```txt
cl.verb=format
cl.version=1.0.0

cl.entry=x402://formatagent.eth/format/v1

cl.schema.request=https://commandlayer.org/schemas/v1.0.0/commons/format/requests/format.request.schema.json
cl.schema.receipt=https://commandlayer.org/schemas/v1.0.0/commons/format/receipts/format.receipt.schema.json
cl.cid.schemas=bafybeigvf6nkzws7dblos74dqqjkguwkrwn4a2c27ieygoxmgofyzdkz6m

cl.agentcard=https://commandlayer.org/agent-cards/agents/v1.0.0/commons/formatagent.eth.json
cl.cid.agentcard=bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we

cl.checksum.schema.request=sha256:b451b0c05cb77f7ad66906f351b560400447de136c1ad2ce27c63fc3bcaf0d9a
cl.checksum.schema.receipt=sha256:93b5174144f372c03f7975898d3c989fd2be997db93c40a7f83b6a0dfe99f7d4
cl.checksum.agentcard=sha256:739e0a399de539f0d9ba584e675d82572ccd0df7d5e60e54d834f20190879bac

cl.owner=commandlayer.eth
```
----

## Status

**Stable — v1.0.0 published**

- 10 Commons Agents

- 5 Commercial Agents

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
