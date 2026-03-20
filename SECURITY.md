# Security Policy

This repository publishes discovery metadata, schema bindings, manifests, release validation logic, and checksums for CommandLayer Agent Cards.

## Reporting a vulnerability

Report suspected security issues to: `security@commandlayer.org`

Include:
- affected repository path, artifact, or command
- affected release line or version
- reproduction steps
- proof of concept, logs, or sample output if available
- impact assessment
- any suggested mitigation or patch

Please do not open public issues for unpatched vulnerabilities.

## Supported intake and handling

Email is the supported intake path for private vulnerability reports affecting this repository's trust, validation, release, or publication surfaces. We may continue follow-up by email to request clarification, a minimal reproduction, or a proposed patch.

## Disclosure process

After receiving a report, we will:
1. acknowledge receipt
2. review the report for scope and reproducibility
3. reproduce and assess severity where possible
4. decide on remediation, mitigation, or documented rejection if the report is out of scope
5. coordinate a disclosure timeline with the reporter when a valid issue is confirmed
6. publish a fix, mitigation, or advisory when appropriate

We ask reporters not to disclose valid issues publicly until remediation is available or a coordinated disclosure date has been agreed. If a report cannot be reproduced or is out of scope, we will say so directly.

## Response targets

Target response times for this repository are:
- Initial acknowledgment: within 3 business days
- Triage outcome or substantive status update: within 7 business days
- Remediation plan for confirmed in-scope issues: within 14 business days
- Fix release timing: depends on severity, review scope, and whether the change affects the canonical `v1.1.0` release surfaces or only archival material

These are targets, not guarantees.

## In scope

This policy covers security issues that materially affect the integrity, trust, or validation story of this repository, including:
- release or artifact substitution risks
- checksum generation or verification bypasses
- validation bypasses or false-positive validation paths
- schema, manifest, or discovery metadata issues that could cause consumers to trust the wrong current-line artifact
- publication or build issues that break reproducibility of canonical root artifacts or the derivative `dist-pin/` bundle
- secrets accidentally committed to this repository

## Out of scope

This policy does not cover:
- general feature requests
- stylistic or editorial documentation issues with no security impact
- requests to broaden protocol support beyond what the repository currently implements
- vulnerabilities in external dependencies or external protocol specifications unless they create a concrete security issue in this repository's checked-in artifacts or validation flow
- unsupported historical artifacts unless they create an active security risk for the current release line
