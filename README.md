# CommandLayer — Agent Cards 
**Canonical identity metadata for autonomous agents.**

Agent Cards define *who an agent is*, *what verb it implements*, and *how it is discovered* across the A2A ecosystem.  
Each card is a deterministic, verifiable identity record that describes a single verb-implementing agent.

This repository contains the **public identity layer** for all CommandLayer Commons agents (v1.0.0).

---

##  What Are Agent Cards?
Agent Cards are the canonical identity documents for autonomous agents.  
They describe:

- the **verb** an agent implements  
- the **schemas** it conforms to (request + receipt)  
- its **x402 entrypoint**  
- its **ENS identity**  
- its **metadata, publisher, and PGP fingerprint**  
- its **checksum** for verification  
- its **IPFS CID** and HTTP mirrors  
- its **capabilities and I/O contract** (non-normative)

Agent Cards are:

- **JSON Schema–driven**
- **ERC-8004 aligned**
- **AJV-validated**
- **IPFS-first, HTTP-fallback**
- **Apache-2.0 licensed**
- **deterministic and immutable**

**This repo** contains **no execution logic**.  
`Execution` lives in the  **protocol-commercial** repository.

---

##  Repository Structure

```
agent-cards/
│
├── agents/ # All 10 Commons agent-cards (v1.0.0)
│ ├── cleanagent.eth.json
│ ├── analyzeagent.eth.json
│ ├── summarizeagent.eth.json
│ └── ...
│
├── meta/
│ ├── manifest.json # Global registry of all agent-cards
│ └── commons-agent.json # Well-known descriptor for Commons v1.0.0
│
├── .well-known/
│ └── agent.json # Public discovery root for external resolvers
│
├── checksums/
│ ├── *.sha256 # Per-agent verification checksums
│ └── checksums.txt # Aggregate index
│
├── schemas/
│ └── v1.0.0/commons/agent.card.base.schema.json
│
├── LICENSE # Apache-2.0
├── package.json
└── tsconfig.json
```


---

##  How Identity Resolution Works

### 1. ENS TXT Records  
Each `<verb>agent.eth` name includes TXT values:

- `cl.verb`
- `cl.version`
- `cl.entry`
- `cl.schema.request`
- `cl.schema.receipt`
- `cl.cid.schemas`
- `cl.agentcard`
- `cl.cid.agentcard`
- `cl.checksum.*`

### 2. AgentCard (this repo)  
A resolver fetches the agent-card JSON, validates its:

- schemas  
- structure  
- signature metadata  
- IPFS CID  
- checksums  

### 3. Protocol Commons  
Schemas are validated against the pinned v1.0.0 canonical schema set.

### 4. Protocol Commercial - Execution Layer  

The x402 entry is passed to the runtime 

----
##  Validation

To validate all cards:

```bash
- npm install
- npm run validate
```
This runs:

- AJV strict validation

- type checking

- checksum verification
----

##  IPFS Pin (v1.0.0)

Agent Cards CID:
```
bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we
```
 **HTTP mirror:**
```
https://ipfs.io/ipfs/bafybeiccpdmehf7532b6yiirjjqcvbu2zq53ftbejz65to356ltnuyc2we
```
----
##  License

This repository is licensed under Apache-2.0, ensuring open, safe, forward-compatible identity metadata.

----

##  Status: Stable (v1.0.0)

All agent-cards for the CommandLayer Commons are complete, validated, and pinned.
This repo is part of the CommandLayer Protocol stack:

- **protocol-commons** — canonical verb + schema layer

- **agent-cards** — identity metadata layer

- **protocol-commercial** — execution layer 

##  Contact

CommandLayer
dev@commandlayer.org

PGP: 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A




