# Resolution Log — Agent Cards

## 2026-03-19 — Current-line authority reset

- **Decision:** `v1.1.0` is the only current line.
- **Rationale:** The repository exposed multiple surfaces without a hard authority order.
- **Affected artifacts:** `README.md`, `meta/manifest.json`, `.well-known/*`, `checksums-v1.1.0.txt`, `dist-pin/agent-cards/v1.1.0/`.

## 2026-03-19 — `dist-pin` classified as derivative

- **Decision:** `dist-pin/agent-cards/v1.1.0/` is a derivative release bundle, not a source of truth.
- **Rationale:** Root artifacts must remain canonical; repinning bundles must be reproducible outputs.
- **Affected artifacts:** `README.md`, `.gitignore`, `scripts/validate-cards.mjs`, `scripts/generate-checksums.mjs`, `dist-pin/agent-cards/v1.1.0/`.

## 2026-03-19 — Discovery model fixed to pointer + frozen snapshot

- **Decision:** `.well-known/agent.json` is the current pointer and `.well-known/agent-cards-v1.1.0.json` is the frozen snapshot.
- **Rationale:** Both files remain only if their relationship is explicit and validated.
- **Affected artifacts:** `.well-known/agent.json`, `.well-known/agent-cards-v1.1.0.json`, `schemas/v1.1.0/agent.descriptor.schema.json`, `scripts/validate-cards.mjs`.

## 2026-03-19 — Checksum scope split by line

- **Decision:** `checksums-v1.1.0.txt` is the current integrity file; `checksums-v1.0.0.txt` is archival.
- **Rationale:** A single checksum file mixed current and archival truth, which slowed review and hid scope.
- **Affected artifacts:** `checksums-v1.1.0.txt`, `checksums-v1.0.0.txt`, `meta/manifest.json`, `README.md`, `scripts/generate-checksums.mjs`.

## 2026-03-19 — v1.1.0 cards reduced to protocol bindings

- **Decision:** Current cards now carry only binding-critical fields.
- **Rationale:** Descriptive metadata and capability prose made the cards look like product copy instead of protocol records.
- **Affected artifacts:** `schemas/v1.1.0/agent.card.schema.json`, `agents/v1.1.0/**/*.json`, `meta/manifest.json`, `scripts/validate-cards.mjs`.

## 2026-03-19 — v1.0.0 marked archival and placeholders removed

- **Decision:** `v1.0.0` remains for compatibility review only; fake mirror URLs and unverifiable PGP claims were removed.
- **Rationale:** Placeholder bindings and stale provenance fields undermine trust even in archival material.
- **Affected artifacts:** `agents/v1.0.0/**/*.json`, `README.md`, `SECURITY_PROVENANCE.md`.
