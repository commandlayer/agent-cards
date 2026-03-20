# Changelog

This changelog documents the repository's release-line differences that are visible in the checked-in schemas, cards, and discovery artifacts. It does not infer release dates beyond the timestamps present in the repository.

## v1.1.0

Current canonical line.

### Changed from v1.0.0

- Reduced the card surface to binding facts: v1.1.0 removes descriptive fields such as `slug`, `display_name`, `description`, `capabilities`, and `meta` from the current schema and cards.
- Tightened the schema contract around the minimal surface: `schemas_mirror` is now required, `implements` is constrained to exactly one verb, and `version` is pinned to `1.1.0`.
- Kept the schema closed with `additionalProperties: false` while simplifying the allowed field set for the current line.
- Standardized dual binding for schemas: current cards carry both authoritative upstream schema URLs in `schemas` and CommandLayer HTTPS mirror URLs in `schemas_mirror`.
- Moved the current line away from legacy path styles: v1.1.0 cards bind directly to tagged upstream HTTPS schema URLs and current mirror URLs instead of the older IPFS-style or `/requests` and `/receipts` path patterns seen in v1.0.0 artifacts.
- Established the current-line authority model used elsewhere in this repo: root `v1.1.0` artifacts are authoritative, while `v1.0.0` remains archival compatibility only.

## v1.0.0

Legacy archival line preserved for compatibility and review.

### Characteristics visible in this repository

- Broader card surface including descriptive metadata such as `slug`, `display_name`, `description`, `capabilities`, and `meta`.
- Shared-schema layout under `schemas/v1.0.0/_shared/`.
- Mixed schema binding styles across cards, including IPFS-based source references and older mirror path layouts.
