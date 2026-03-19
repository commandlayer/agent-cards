# Governance — Agent Cards

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

Operationally, `v1.1.0` is the normative line. `v1.0.0` remains preserved for compatibility and reviewability but is not the default release authority path.

## Release change rule

A canonical release-state change is acceptable only when the following move in a coherent set and validation passes:

- current-line cards under `agents/v1.1.0/`
- current-line schemas under `schemas/v1.1.0/`
- discovery descriptors under `.well-known/`
- release metadata under `meta/`
- deterministic `checksums.txt`
- publish bundle content under `dist-pin/agent-cards/v1.1.0/`

## Legacy handling rule

Legacy artifacts may be preserved for compatibility without being retrofitted into the current model. Preservation still requires basic integrity:

- no committed template placeholders or obviously fabricated values
- continued schema readability against the preserved legacy schema
- documentation that distinguishes historical retention from current normative design
