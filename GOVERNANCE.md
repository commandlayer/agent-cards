# Governance — CommandLayer Agent Cards

## Purpose

This document describes who stewards the canonical Agent Cards release line and what must move together for a release-state change to be credible.

## Stewardship

- Current steward of record: `commandlayer.eth`
- Repository scope: canonical Agent Cards definitions, discovery descriptors, manifest metadata, checksums, and publish bundle contents in this repository

## Current authority model

- Current canonical Agent Cards line: `v1.1.0`
- Preserved legacy line: `v1.0.0`
- Default repository validation path: `npm run validate`
- Full release bundle validation path: `npm run validate:release`
- Canonical branch for active development and CI: `main`

Operationally, `v1.1.0` is the normative line. `v1.0.0` remains preserved for compatibility and reviewability but is not the default release authority path. For repository workflow, `main` is the canonical branch; any legacy default-branch setting is hosting history, not an alternate authority path.

## Release change rule

A canonical release-state change is acceptable only when the following move in a coherent set and validation passes:

## Current release rule

- Agent Cards current canonical line: `v1.1.0`
- Commons current line: `v1.1.0`
- Commercial current line: `v1.1.0`
- Agent Cards v1.1.0 is flat and direct by policy
- Agent Cards v1.0.0 is archival compatibility only and is not a co-equal release line

Legacy artifacts may be preserved for compatibility without being retrofitted into the current model. Preservation still requires basic integrity:

A canonical release change is acceptable only when the root `v1.1.0` artifacts are updated, the derivative `dist-pin/agent-cards/v1.1.0/` bundle is refreshed from them, and validation passes.
