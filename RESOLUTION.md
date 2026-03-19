# Resolution Log — Agent Cards

## Purpose

This log records formal release-affecting decisions for the Agent Cards repository. It is meant to explain why a release-line change was made, what artifacts it touched, and how to interpret the repository state after the change.

## Logging scope

- Formal decision logging began on **2026-03-19**.
- Earlier repository changes may exist without entries here.
- Absence of an older entry should be read as "not logged in this file," not as evidence that no earlier decision occurred.

## How to read entries

Each entry captures:

- the decision date
- the release-affecting action that was taken
- the rationale for taking it
- the artifacts directly affected

## Entries

### 2026-03-19 — Current-line release validation and provenance clarification

- **Decision:** Make the default validation path release-facing for `v1.1.0`, contain legacy validation behind an explicit compatibility command, remove placeholder mirror URLs from legacy commercial cards, and expand governance/provenance documentation to match the actual release model.
- **Rationale:** The repository's current authority line is `v1.1.0`. The default validation path and supporting documentation needed to reflect that reality directly. Legacy artifacts are still preserved, but their limitations needed to be explicit so they do not distort reviewer perception.
- **Affected artifacts:** `package.json`, `scripts/validate-cards.mjs`, `.github/workflows/validate.yml`, `agents/v1.0.0/commercial/*.json`, `README.md`, `COMPLIANCE.md`, `GOVERNANCE.md`, `SECURITY_PROVENANCE.md`, and `checksums.txt`.
