# Deprecated: CommandLayer Agent Cards

This repository is deprecated and should be treated as an archived historical source.

Agent card and discovery work is being consolidated around the current CLAS, Agent SDK, and public verifier direction.

## Current direction

CommandLayer is consolidating around CLAS and verifiable action receipts.

Going forward:

- canonical CLAS/spec work lives in `commandlayer/clas`
- active SDK work lives in `commandlayer/agent-sdk`
- public verification/docs live in `commandlayer/commandlayer-org`
- public receipt verification reference lives in `commandlayer/verifyagent`
- private commercial/admin/payment/backend work lives in `commandlayer/commercial`

Do not use this repository as the active source of truth for new CommandLayer integrations.

## Why this repo is being archived

Agent Cards previously acted as discovery and binding artifacts for older Commons and Commercial schema surfaces.

Those schema mirrors and commercial/public routing surfaces are being retired from the public repo structure. The current direction is to keep the public story focused on CLAS receipts, verifier surfaces, and SDK integration.

This repository is retained only so older references and historical card/discovery work remain understandable.

## Historical scope

This repository previously contained:

- agent card examples
- card manifests
- schema binding experiments
- Commons and Commercial routing assumptions
- discovery metadata for older agent namespace experiments

New integrations should not depend on this repository directly.

## Recommended path

Use the current CommandLayer repos instead:

- CLAS/spec: https://github.com/commandlayer/clas
- Agent SDK: https://github.com/commandlayer/agent-sdk
- Public verifier/docs: https://github.com/commandlayer/commandlayer-org
- VerifyAgent reference: https://github.com/commandlayer/verifyagent

## Status

- Repository status: deprecated / archive candidate
- New development: no
- New integrations: use CLAS + Agent SDK
- Historical purpose: card/discovery experiments for earlier CommandLayer schema surfaces
