# Security Policy

This repository publishes discovery metadata, schema bindings, manifests, and checksums for CommandLayer Agent Cards.

## Reporting a vulnerability

Please report suspected security issues to: `dev@commandlayer.org`

Include:
- affected repository and version
- reproduction steps
- proof of concept, if available
- impact assessment
- any suggested mitigations

Please do not open public issues for unpatched vulnerabilities.

## Supported reporting path

Email is the supported intake path for private vulnerability reports affecting this repository's trust, validation, release, or publication surfaces. If we need follow-up context, we may continue the discussion by email and ask for a minimal private reproduction or patch suggestion.

## Disclosure process

After receiving a report, we will:
1. acknowledge receipt
2. validate and reproduce the issue
3. assess severity and affected surfaces
4. prepare a fix or mitigation
5. coordinate disclosure as appropriate

We ask reporters to avoid public disclosure until remediation or coordinated disclosure timing has been agreed.

## Response targets

- Initial acknowledgment: within 3 business days
- Triage or status update after review: within 7 business days
- Fix timeline: depends on severity, impact, and release scope

## Scope

This policy covers:
- schema integrity issues with security implications
- validation bypasses
- artifact substitution or release integrity issues
- signing or verification related issues
- metadata or publication issues that could mislead integrators about trust surfaces

## Out of scope

This policy does not cover:
- general feature requests
- stylistic documentation issues
- unsupported historical artifacts unless they create active security risk
