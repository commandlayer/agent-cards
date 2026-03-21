# Resolution Log — Agent Cards

This log records formal repository-level decisions that affect the canonical Agent Cards release line, release validation, or preserved compatibility artifacts.

## Interpretation

- Formal logging began on **2026-03-19**.
- Decisions made before that date may be reflected in the repository state without a corresponding entry here.
- Entries are procedural release records, not a backfilled history of every prior discussion.
- "Affected artifacts" identifies the files or surfaces materially changed by the recorded decision.

## Entries

### 2026-03-19 — Validation authority and legacy containment clarified

- **Decision:** Make `npm run validate` the current-line authority path, keep legacy validation explicit and secondary, remove committed placeholder canonical hosted schema URLs from legacy commercial cards, and document legacy/provenance boundaries directly.
- **Rationale:** The repository's operational center is `v1.1.0`. Validation and documentation should make that obvious while still preserving `v1.0.0` as a compatibility line. Legacy artifacts should not retain visibly fabricated placeholder values.
- **Affected artifacts:** `package.json`, `scripts/validate-cards.mjs`, `.github/workflows/validate.yml`, `agents/v1.0.0/commercial/*.json`, `README.md`, `COMPLIANCE.md`, `GOVERNANCE.md`, `SECURITY_PROVENANCE.md`.

### 2026-03-21 — Commons/runtime split made explicit across cards, schemas, and release metadata

- **Decision:** Normalize all commons cards to the canonical runtime execute entry, preserve x402 routing only for commercial cards, and enforce the split in schemas, validation, manifests, dist-pin artifacts, and repository documentation.
- **Rationale:** The repository should publish one coherent invocation model: commons are runtime-first and non-x402 at entry, while commercial cards remain payment-aware and x402-routed. Leaving mixed semantics in cards, docs, or validators would make the release contract misleading.
- **Affected artifacts:** `agents/v1.0.0/commons/*.json`, `agents/v1.1.0/commons/*.json`, `schemas/v1.0.0/_shared/agent.card.base.schema.json`, `schemas/v1.1.0/agent.card.schema.json`, `scripts/validate-cards.mjs`, `meta/manifest.json`, `meta/commons-agent.json`, `meta/commercial-agent.json`, `README.md`, `SPEC.md`, `ONBOARDING.md`, `CHANGELOG.md`, `checksums.txt`, `dist-pin/agent-cards/v1.1.0/**`.
