# Specification — CommandLayer Agent Cards

## 1. Canonical publication model

This repository maintains CommandLayer Agent Cards for the current `v1.1.0` release line plus archival `v1.0.0` material. Across the entire repo there is one canonical schema-binding pattern:

- `schemas.request` and `schemas.receipt` identify hosted schemas at `https://commandlayer.org/schemas/...`
- GitHub is a source repository, not a protocol surface
- the legacy duplicate schema field is deprecated and removed
- Commons `entry` is `https://runtime.commandlayer.org/execute`
- Commercial `entry` is `x402://<agent>/<verb>/v1.1.0`

## 2. Authority

- Root repository artifacts are authoritative.
- `meta/manifest.json` is the canonical registry index.
- `.well-known/` files are discovery pointers only.
- `dist-pin/agent-cards/v1.1.0/` is a derivative distribution bundle, not a co-equal authority surface.
- `v1.0.0` remains only for archival compatibility.

## 3. Canonical schema identifiers

CommandLayer schema identifiers are the hosted `commandlayer.org` URLs.

### Commons

- `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`

### Commercial

- `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- `https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`

GitHub may host the source files that produce those schemas, but raw GitHub URLs are not valid published Agent Card schema bindings in this repository.

## 4. Meaning of `entry`

`entry` is the execution binding published by an Agent Card.

- **Commons:** `https://runtime.commandlayer.org/execute`
- **Commercial:** `x402://<agent>/<verb>/v1.1.0`

The difference is normative:

- Commons discovery resolves to a shared runtime execution endpoint.
- Commercial discovery resolves to a payment-aware x402 route.

Validators MUST reject mixed entry behavior, such as x402 entries on commons cards or runtime entries on commercial cards.

## 5. Required current-line fields

Every canonical `v1.1.0` card MUST include:

- `id`
- `owner`
- `ens`
- `version`
- `status`
- `class`
- `implements`
- `schemas`
- `entry`
- `networks`
- `license`
- `created_at`
- `updated_at`

`schemas` MUST include:

- `schemas.request`
- `schemas.receipt`

`$schema` and `$id` are publication fields and must remain aligned with the card path and schema version.

## 6. Versioning rules

- Current cards live under `agents/v1.1.0/`
- Current card schema lives at `schemas/v1.1.0/agent.card.schema.json`
- Current descriptor schema lives at `schemas/v1.1.0/agent.descriptor.schema.json`
- `version` for current cards MUST equal `1.1.0`
- `$schema` for current cards MUST equal `https://commandlayer.org/agent-cards/schemas/v1.1.0/agent.card.schema.json`
- `$id` MUST match the canonical HTTPS path of the card file

## 7. Binding rules

### 7.1 Commons cards

A commons card MUST publish:

- `schemas.request = https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.request.schema.json`
- `schemas.receipt = https://commandlayer.org/schemas/v1.1.0/commons/<verb>/<verb>.receipt.schema.json`
- `entry = https://runtime.commandlayer.org/execute`

### 7.2 Commercial cards

A commercial card MUST publish:

- `schemas.request = https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.request.schema.json`
- `schemas.receipt = https://commandlayer.org/schemas/v1.1.0/commercial/<verb>/<verb>.receipt.schema.json`
- `entry = x402://<agent>/<verb>/v1.1.0`

## 8. Deprecated patterns

The following are non-conformant in this repository:

- raw GitHub schema URLs in cards, manifests, docs, examples, fixtures, or validation logic
- the legacy duplicate schema field
- mixed commons/commercial entry semantics
- dual-source language that implies both GitHub and `commandlayer.org` are equivalent schema identifiers

## 9. Conformance

A repository state is conformant when:

- zero raw GitHub schema URLs remain
- the legacy duplicate schema field is absent everywhere
- all cards publish `commandlayer.org` schema URLs through `schemas`
- all commons cards use the runtime execute entry
- all commercial cards use the x402 entry pattern
- docs, manifests, examples, and validation agree with the implementation
- `npm run validate` passes

## 10. Responsibility boundaries

Agent Cards answer: “What is this agent, what can it do, and where are its endpoints?”

CommandLayer receipts answer: “What did this agent actually do?”

VerifyAgent answers: “Is this receipt valid or invalid?”

CommandLayer Commercial answers: “How do teams run, verify, index, and monitor receipts at scale?”

For public receipt verification, see https://github.com/commandlayer/verifyagent.

