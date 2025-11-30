
# Onboarding — Agent Cards

Welcome to **Agent-Cards** — the identity + invocation layer for autonomous agents.

This repo defines:

- Which ENS name an agent uses
- Which canonical verb(s) it implements
- Which schemas it binds to
- How to invoke it via x402 (`entry`)
- Required metadata for safe routing

If Protocol-Commons is the language, **Agent-Cards are the business card.**

---

## 1. Who This Repo Is For

You’re in the right place if you are:

- Running production agents
- Building registries or routers
- Integrating ENS + x402 for trustless invocation
- Maintaining identity-aware infrastructure

Semantic schema work? → see **protocol-commons**.

---

## 2. Mental Model

```text
[ Semantics ]   Protocol-Commons (what actions mean)
[ Identity  ]   Agent-Cards (who performs them)
[ Execution ]   x402 runtimes (how they run)
```
They answer:

“Given <ens> + <verb>, who do I call — and where?”

No prices. No business logic. Identity + invocation only.

## 3. Repo Layout
```
agents/
  v1.0.0/
    commons/*.json
    commercial/*.json
checksums/
meta/manifest.json
.well-known/agent-cards-v1.0.0.json

SPEC.md
POLICY.md
GOVERNANCE.md
SECURITY.md
SECURITY_PROVENANCE.md
RESOLUTION.md
README.md
```

Authoritative docs:

- `POLICY.md` — versioning and extension governance
- `GOVERNANCE.md` — approval of normative changes
- `SECURITY*.md` — provenance + integrity guarantees
- `RESOLUTION.md` — canonical lifecycle log

Unlogged identity changes are not canonical.

**ENS TXT Summary**

Agent-Cards govern TXT keys that bind **identity** + **invocation.**
Canonical definitions → `SPEC.md.`

## 4. How To Add or Change a Card

Never overwrite identity in place without provenance.

1. Open an Issue
2. Update card JSON per SPEC
3. Update checksums + manifest
4. Publish ENS TXT
5. Validate:
```
npm install
npm run validate
```


6. Update RESOLUTION.md
7. Submit PR with change class (new/update/deprecate)

## 5. What “Good” Looks Like

- Minimal accurate metadata (no secrets)
- Correct `entry` + schema bindings
- TXT ↔ JSON ↔ CID fully consistent
- Correct `class`: `commons` vs `commercial`
- Canonical changelog entry
- Start by copying an existing Commons card if unsure.

## 6. Support

Governance contact: dev@commandlayer.org

PGP fingerprint: **5016 D496 9F38 22B2 C5A2 FA40 99A2 6950 197D AB0A**

Identity correctness prevents fragmentation.
Agent-Cards ensure **trustless discovery** across ecosystems.
