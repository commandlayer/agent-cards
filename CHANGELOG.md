# Changelog

This changelog records release-line differences that are visible in the checked-in schemas, cards, discovery artifacts, and release validation flow.

## [1.1.0]

### Why 1.1.0 happened

`v1.1.0` establishes the current canonical Agent Cards line around flat, directly inspectable bindings and reproducible release artifacts. The goal is to remove migration-era ambiguity from cards, discovery descriptors, and publication surfaces so reviewers can validate the current release line without inferring hidden inheritance or historical packaging assumptions.

### Added

- Flat `v1.1.0` agent card structure aligned directly to the current protocol schema surfaces.
- Required `schemas_mirror` bindings alongside authoritative upstream schema URLs for each current-line card.
- Release validation and checksum-oriented artifact discipline for canonical root artifacts plus the derivative `dist-pin/` publish bundle.
- Clearer metadata around current published artifacts, including manifest and discovery authority boundaries.

### Changed

- `v1.1.0` cards now bind directly to current Commons and Commercial protocol surfaces rather than older shared or inherited descriptor patterns.
- Descriptor and publication surfaces were simplified so root repository artifacts are authoritative, `.well-known/` stays discovery-only, and `dist-pin/agent-cards/v1.1.0/` is explicitly derivative.
- Current-line schema references moved to tagged HTTPS source URLs and `commandlayer.org` mirror URLs.
- Validation for the current line is centered on canonical cards, manifest alignment, checksums, and reproducible release artifacts.

### Removed

- Legacy or shared structural patterns carried forward from `v1.0.0` where they were no longer needed for the current line.
- Deprecated descriptive card fields from the current-line schema surface, including `slug`, `display_name`, `description`, `capabilities`, and `meta`.
- Deprecated internal migration-era packaging assumptions that made the publication path harder to inspect.

### Flattened

- Current-line cards are intentionally flat and minimal, publishing binding facts directly instead of relying on `_shared` composition for `v1.1.0`.
- Current release validation treats the repository root as the authority surface and the publish bundle as a reproducible copy, not a second source of truth.

### Moved

- Current schema bindings moved from legacy IPFS-era and descriptor-led references to direct tagged HTTPS schema URLs plus explicit public mirror URLs.
- Current publication expectations moved toward manifest-checked, checksum-covered, release-validated root artifacts.

### Legacy status

- `v1.0.0` remains legacy-compatible where documented, but it is no longer the current canonical working line.
- `v1.0.0` artifacts are retained for archival compatibility and migration review, not as the preferred source for new integrations.

### Breaking or non-breaking?

- For consumers already treating `v1.1.0` as a distinct release line, this is the authoritative current line and not a surprise patch over `v1.0.0`.
- For tooling that depended on `v1.0.0` shared schema paths, broader descriptor assumptions, descriptive card fields, or older publication layouts, migrating to `v1.1.0` is a breaking change and requires updates.

### Migration notes

- Treat `v1.1.0` as the authoritative current line.
- Update tooling that expects `v1.0.0` shared schema paths, descriptor-led inheritance, or IPFS-era schema bindings.
- Expect current cards to expose only the minimal binding fields required by the `v1.1.0` schema.
- Use the root package validation and release commands, and validate against the canonical root artifacts plus `checksums.txt`.

## [1.0.0]

- Legacy compatibility line retained in-tree for archival and migration purposes.
- Looser schema and descriptor enforcement, including a permissive descriptor schema and a broader card field set.
- Descriptor-based and IPFS-era schema references remain part of the legacy line.
