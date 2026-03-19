# Governance — Agent Cards

## Stewardship

- Repository steward: `commandlayer.eth`
- Repository surface: `https://github.com/commandlayer/agent-cards`
- Public documentation surface: `https://commandlayer.org/agent-cards`

## Release authority

The canonical Agent Cards release line is `v1.1.0`.

That authority is exercised through the current repository state and its release artifacts, not through the preserved legacy line. In practice, the authoritative release surface is the combination of:

- current cards under `agents/v1.1.0/`
- current discovery descriptors under `.well-known/`
- current schemas under `schemas/v1.1.0/`
- `meta/manifest.json` as the release index
- `checksums.txt` as the deterministic digest ledger for published artifacts
- `dist-pin/agent-cards/v1.1.0/` as the repinnable release bundle

## Decision process

A release-affecting change is expected to update the repository as a coherent set. That means cards, discovery, metadata, checksums, and any repinning bundle must stay aligned.

`npm run validate` is the default gate for the current release line. `npm run validate:legacy` exists to keep archival material internally coherent, but it is not the primary release gate.

## Legacy policy

`v1.0.0` remains in the repository for compatibility and historical inspection.

It is preserved with known structural limitations. Governance does not treat that line as the normative model for new releases, new schema conventions, or current provenance expectations.
