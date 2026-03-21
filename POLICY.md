# Policy — Agent Cards

## Release policy

- `v1.1.0` is the current release-candidate Agent Cards line.
- Root repository artifacts for `v1.1.0` are the source of truth.
- `v1.0.0` is superseded and retained only as an archival compatibility line.
- Current v1.1.0 work must stay flat and self-contained.
- Current v1.1.0 work must not reintroduce `_shared`.

## Surface policy

- `meta/manifest.json` is the canonical registry index.
- `.well-known/` files are discovery pointers only.
- `dist-pin/agent-cards/v1.1.0/` is a derivative current-line bundle for pinning/repinning.
- No surface other than the root `v1.1.0` artifacts may be treated as co-equal authority.

## Binding policy

- Commons cards bind directly to the intended Commons v1.1.0 URLs and commandlayer.org mirrors pending release validation.
- Commercial cards bind directly to the intended Commercial v1.1.0 URLs and commandlayer.org mirrors pending release validation.
- Stale path styles are non-compliant for the current line.

## Release integrity

Canonical cards, canonical schemas, manifest, discovery pointers, checksums, and the derivative dist-pin bundle must move together.
