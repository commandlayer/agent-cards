## 3️⃣ `agent-cards/ONBOARDING.md`

```markdown
# ONBOARDING — Agent-Cards

Welcome to **CommandLayer Agent-Cards** — the identity layer for autonomous agents.

This repo defines how an agent looks **on paper**:

- Which ENS name it uses
- Which canonical verb(s) it implements
- Which schemas it binds to
- Which x402 entry URI to call
- Which capabilities and metadata it exposes

If Protocol-Commons is the language, **Agent-Cards are the business card.**

---

## 1. Who This Repo Is For

You’re in the right place if you are:

- Building **agent registries**, **routers**, or **marketplaces**
- Operating **production agents** that implement canonical verbs
- Integrating ENS + x402 for **trustless discovery and invocation**
- Maintaining infrastructure that relies on agent identity and routing

If you are only defining verbs and message shapes, work in **protocol-commons** instead.

---

## 2. Mental Model

Agent-Cards sit in the middle of the stack:

```text
[ Semantics ]   Protocol-Commons    (what actions mean)
[ Identity  ]   Agent-Cards         (who does what, and where)
[ Execution ]   x402 runtimes       (how it runs and returns receipts)
Agent-Cards answer:

“Given this ENS name and verb, who am I talking to, and how do I call them safely?”

They do not enforce business rules or pricing.

3. Repo Layout
text
Copy code
agent-cards/
│
├─ agents/
│  └─ v1.0.0/
│     ├─ commons/
│     │  ├─ summarizeagent.eth.json
│     │  ├─ analyzeagent.eth.json
│     │  └─ ...
│     └─ commercial/
│        ├─ checkoutagent.eth.json
│        └─ ...
│
├─ checksums/
│  ├─ commons/
│  └─ commercial/
│
├─ meta/
│  ├─ manifest.json      # CIDs, mirrors, registry metadata
│  └─ ...
│
├─ .well-known/
│  └─ agent-cards-v1.0.0.json   # Discovery helper / registry descriptor
│
├─ scripts/
│  └─ validate.ts
│
├─ SPEC.md
├─ POLICY.md
├─ GOVERNANCE.md
├─ SECURITY.md
├─ SECURITY_PROVENANCE.md
├─ RESOLUTION.md
└─ README.md
Authoritative documents:

SPEC.md — normative identity contract and ENS TXT rules

POLICY.md — what a valid card must look like

GOVERNANCE.md — who can change identity records

SECURITY*.md — how integrity is guaranteed and reported

RESOLUTION.md — lifecycle log for cards and bindings

4. Agent-Card Contract (Quick Overview)
Every card conforms to agent.card.base.schema.json and MUST define:

Identity and ownership:

id, slug, display_name, description

owner, ens, version, status, class

Verb binding:

implements — array of canonical verbs

Schema binding:

schemas (IPFS) + schemas_mirror (HTTPS)

Execution:

entry — x402 URI x402://<ens>/<verb>/v1

Capabilities + metadata:

capabilities, meta

Environment:

networks, license

created_at, updated_at

See SPEC.md for the full, normative definition.

5. How To Add or Change an Agent-Card
Never overwrite identity in place without a paper trail.

For any new or updated card:

Open an Issue

Describe the agent, verb(s), and ENS name.

Clarify whether it is commons or commercial.

State whether this is new, update, or deprecation.

Prepare the Card

Start from an existing card as a template (e.g., summarizeagent.eth.json).

Fill in all required fields per SPEC.md.

Ensure entry matches the required x402 pattern.

Bind to canonical schemas (Protocol-Commons / Commercial).

Update Checksums & Manifest

Add or update SHA-256 checksum under checksums/....

Update meta/manifest.json with the new card and any mirrors/CIDs.

Set ENS TXT Records

Publish TXT fields (cl.entry, cl.agentcard, cl.cid.agentcard, etc.) per SPEC.md.

Ensure they match the card content exactly.

Validation

Run the validation script:

bash
Copy code
npm install
npm run validate
Fix any schema or checksum errors.

Update RESOLUTION.md

Add a log entry describing the change (agent, action, reason, approver).

Submit PR

Link the Issue.

Include validation notes and ENS TXT plan.

Mark whether it’s a new agent, update, or deprecation.

6. Local Dev / Validation
Standard workflow:

bash
Copy code
git clone https://github.com/commandlayer/agent-cards.git
cd agent-cards

npm install
npm run validate
If validation fails, the card is not canonical — fix it before shipping.

7. What “Good” Looks Like
A solid Agent-Card contribution:

Has clean, minimal metadata — no marketing fluff, no secrets.

Binds to canonical schemas and a real x402 entrypoint pattern.

Ships with correct ENS TXT bindings.

Is fully logged in RESOLUTION.md with a clear reason.

Respects the difference between commons and commercial.

When in doubt, start with Commons reference agents (e.g. summarize/analyze) to mirror structure.

8. Support
Governance / security contact: dev@commandlayer.org

PGP fingerprint: 5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A

If you are unsure whether a card should be Commons vs Commercial, or how to structure ENS TXT, open an Issue and keep the change small and reviewable.

yaml
Copy code
