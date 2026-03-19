# Security & Provenance — Agent Cards

## Trust anchors now

Current trust is anchored by four surfaces:

1. the canonical root artifacts under `agents/v1.1.0/`, `schemas/v1.1.0/`, `meta/`, and `.well-known/`
2. the registry index in `meta/manifest.json`
3. the scoped integrity file `checksums-v1.1.0.txt`
4. release-time verification that current schema URLs, mirrors, and `x402` entry URIs resolve as expected

## What `dist-pin` means now

`dist-pin/agent-cards/v1.1.0/` is a derivative release bundle. It exists for repinning and distribution. It is not an authority surface. Validation requires it to match the canonical root artifacts byte-for-byte.

## Why legacy provenance fields changed

`v1.0.0` cards previously carried `pgp_fingerprint` claims without a maintained, verifiable key-distribution path in this repository. Those claims were removed. The archival line now keeps only explicit archival notes and still-valid URLs.

## What Agent Cards do not prove

Agent Cards prove identity bindings, schema bindings, and discovery bindings. They do not prove runtime behavior, payment execution, settlement, or service quality.
