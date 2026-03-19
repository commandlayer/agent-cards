# Security & Provenance — Agent Cards

Agent Cards express identity, routing, and release bindings. They do not prove execution success, payment settlement, or runtime behavior by themselves.

## Current provenance model (`v1.1.0`)

For the current line, provenance is repository- and release-artifact-based.

The trust anchors are:

- the Git repository state for `commandlayer/agent-cards`
- the canonical current card set under `agents/v1.1.0/`
- the current discovery descriptors under `.well-known/`
- `meta/manifest.json` as the release index that names the current line and its bindings
- semver-pinned upstream schema URLs in each current card
- `checksums.txt`, which deterministically covers cards, schemas, metadata, discovery, and `dist-pin/agent-cards/v1.1.0/`
- the mirrored release bundle under `dist-pin/agent-cards/v1.1.0/`

In other words: current provenance is a combination of repository state, manifest/discovery metadata, semver-pinned schema bindings, and release checksums.

## Direct answer on the PGP question

### Was `pgp_fingerprint` intentionally removed?

Yes. `pgp_fingerprint` is present in legacy `v1.0.0` cards as historical metadata, but it is intentionally not part of the `v1.1.0` card schema.

### What replaced it as the provenance anchor?

No single in-card field replaced it one-for-one.

For `v1.1.0`, provenance is anchored primarily by the repository release surface:

- the card file path and `$id`
- the versioned schema contract
- the manifest and discovery descriptors
- the semver-pinned schema source and mirror URLs
- the deterministic checksum ledger
- the repinnable dist bundle

### Why is it no longer part of the current card model?

The current line treats provenance as a release-level property rather than as a per-card PGP assertion. That keeps the current card schema focused on routing and schema bindings, while the repository, manifest, and checksum set carry the integrity story.

### Tradeoff

This is a different model, not a stronger in-card cryptographic claim.

Compared with a field-level `pgp_fingerprint`, the current line is clearer about what the repository actually publishes and verifies, but it does not provide a standalone per-card PGP attestation inside card metadata. Reviewers should therefore read current provenance as release-bundle provenance, not as embedded card-signature provenance.

## Legacy line (`v1.0.0`)

The legacy line mixes routing metadata with provenance-adjacent metadata more loosely.

Important limitations:

- it uses the older `_shared` layout
- the legacy schema allows more permissive metadata fields
- some provenance-adjacent fields, including `meta.pgp_fingerprint`, are historical artifacts of that model
- legacy commercial cards no longer advertise placeholder mirror URLs where no canonical historical value was recorded

That legacy material is retained for compatibility and inspection. It should not be interpreted as the current normative provenance design.
