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

**Agent Cards are the identity and discovery layer for autonomous agents — binding canonical verbs to verifiable execution.**

Agent Cards are **machine-readable** identity documents describing how an autonomous agent implements a canonical verb — defined in Protocol-Commons (open) or Protocol-Commercial (permissioned) — including the metadata required for trustless discovery, validation, and invocation.

This repository contains all CommandLayer Agent Cards:

- **Commons** (open, foundation layer)

- **Commercial** (permissioned, monetizable layer)

Both tiers use the same metadata contract and identical discovery mechanisms.

Execution lives outside this repository and can vary by implementation.

## Architecture Role

Agent Cards bridge **semantic definitions** and **runtime execution:**

```
┌────────────────────────┐
│  Protocol-Commons      │  ← Canonical Verb Schemas
│  Protocol-Commercial   │  ← Monetized Verb Schemas
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│    Agent Cards         │  ← Identity + metadata binding
│  (JSON, immutable)     │
└───────────┬────────────┘
            │ ENS TXT Discovery (ERC-8004)
            ▼
┌────────────────────────┐
│     x402 Entry         │  ← Verifiable invocation
│   / Runtime URI        │
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│   Execution Engine     │  ← Any A2A runtime / LLM agent
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│   Structured Receipt   │  ← Canonical outputs + trace
└───────────┬────────────┘
            │
            ▼
┌────────────────────────┐
│    Agent Chaining      │  ← Autonomous multi-agent workflows
└────────────────────────┘


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
Multi-Agent Workflow (A2A automation)

```
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

```
agent-cards/
│
├─ schemas/
│ └─ v1.0.0/
│ ├─ commons/
│ │ ├─ analyze.agent.card.json
│ │ ├─ summarize.agent.card.json
│ │ └─ ...
│ └─ commercial/
│ └─ (placeholder for upcoming commercial verbs)
│
├─ checksums/
│ ├─ checksums.txt
│ └─ *.sha256
│
├─ LICENSE (Apache-2.0)
└─ package.json
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

> File: `./schemas/v1.0.0/commons/summarize.agent.card.json`

```json
{
  "verb": "summarize",
  "version": "1.0.0",
  "ens": {
    "name": "summarizeagent.eth",
    "txt": "cl.agentcard=https://commandlayer.org/agent-cards/schemas/v1.0.0/commons/summarize.agent.card.json"
  },
  "schemas": {
    "request": "https://commandlayer.org/schemas/v1.0.0/commons/summarize/requests/summarize.request.schema.json",
    "receipt": "https://commandlayer.org/schemas/v1.0.0/commons/summarize/receipts/summarize.receipt.schema.json"
  },
  "x402": {
    "entry": "x402://summarizeagent.eth/summarize/v1"
  },
  "publisher": {
    "name": "CommandLayer",
    "contact": "security@commandlayer.org"
  },
  "cid": "bafybeiha4diqc32lsvjsg3hl6zvtwn4qcfryze7zxf4d36av7tvur6lwfe",
  "checksum": "sha256-36afcee88af94fb7233fc1cd70a6a87cb0f5f374f6ac4ee66dd29be48ec2c77c",
  "capabilities": {
    "input": "Any natural language content",
    "output": "Short-form summary (structured or plain text)"
  }
}

```
Example usage (TypeScript):
```
import card from "./schemas/v1.0.0/commons/summarize.agent.card.json";

console.log(card.verb);          // "summarize"
console.log(card.x402.entry);    // "x402://summarizeagent.eth/summarize/v1"
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








