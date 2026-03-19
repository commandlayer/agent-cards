# Compliance — Agent Cards

## Current release line (`v1.1.0`)

Agent Cards v1.1.0 is compliant when:

- current cards validate under `schemas/v1.1.0/agent.card.schema.json`
- current discovery validates under `schemas/v1.1.0/agent.descriptor.schema.json`
- current cards use no `_shared` references
- Commons and Commercial bindings are flat and direct
- checksums cover release artifacts including `dist-pin/agent-cards/v1.1.0/`
- the current release flow passes via `npm run validate`

## Legacy compatibility line (`v1.0.0`)

`v1.0.0` is retained as an archival and compatibility line, not as the normative compliance surface.

Known preservation limits:

- the line is still structured around `schemas/v1.0.0/_shared/`
- the legacy card schema permits looser metadata and URL conventions than the current line
- `meta.pgp_fingerprint` may appear in legacy cards as historical metadata, but it is not part of the v1.1.0 compliance contract
- legacy commercial cards intentionally omit `schemas_mirror` where the repository never recorded a canonical historical mirror URL; placeholder values were removed rather than normalized into fake history
- maintainers may run `npm run validate:legacy` to ensure the archive remains internally consistent, but passing that command does not make `v1.0.0` the release authority
