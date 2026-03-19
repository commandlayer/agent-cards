# Governance — CommandLayer Agent Cards

## Stewardship

Founding steward: `commandlayer.eth`

## Current release rule

- the only current release line is `v1.1.0`
- root current-line files are canonical
- legacy remains archival only
- `dist-pin/agent-cards/v1.1.0/` is derivative and must never outrank root authority

## Approval rule

A release-line change is acceptable only when the canonical root files, manifest, discovery descriptors, derivative bundle, and checksums are all updated together and both `npm run validate` and `npm run validate:release` are green in an environment with the required network access.
