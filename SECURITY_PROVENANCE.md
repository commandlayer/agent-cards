# Security & Provenance — Agent Cards

Agent Cards express identity and routing intent. They do **not** prove execution success, runtime security, or service availability.

## Current provenance model (`v1.1.0`)

The current line uses a repository-and-release anchored provenance model.

### Trust anchors

For `v1.1.0`, reviewer trust is anchored by the combination of:

- the canonical repository contents for current cards, schemas, discovery files, and release metadata
- semver-pinned upstream schema source URLs recorded in the cards and manifest
- `commandlayer.org` mirror URLs recorded in the cards and manifest
- deterministic `checksums.txt` coverage for `agents`, `schemas`, `meta`, `.well-known`, and `dist-pin/agent-cards/v1.1.0`
- the release bundle preserved under `dist-pin/agent-cards/v1.1.0/`
- the discovery and manifest surfaces that identify `v1.1.0` as the current line

In short: provenance for the current line is not carried by a single in-card field. It is established by the repository state, the release descriptors, and the checksumed release bundle working together.

## The `pgp_fingerprint` question

### Was `pgp_fingerprint` intentionally removed?

Yes. `pgp_fingerprint` is present on preserved `v1.0.0` cards but is intentionally not part of the `v1.1.0` card schema.

### What replaced it?

It was replaced by a broader release-surface provenance model rather than by another single card field. In `v1.1.0`, the main provenance anchors are:

- repository state
- current discovery descriptors
- `meta/manifest.json`
- release checksums
- the repinnable release bundle in `dist-pin/agent-cards/v1.1.0/`
- semver-pinned source and mirror schema bindings recorded in cards and manifest

### Why is it no longer part of the current card model?

Because the current line treats provenance as a property of the published release set, not as a card-local assertion. A field embedded in one card can describe an operator claim, but it does not by itself authenticate the full release surface that reviewers actually consume.

### Tradeoff

This is stronger in one sense and weaker in another:

- **Stronger:** current provenance is tied to the release bundle and checksumed repository surfaces reviewers actually validate together.
- **Weaker:** there is no card-local cryptographic signer field in `v1.1.0`, so provenance is less self-contained if a card is detached from the repository and release context.

That tradeoff is intentional. The authoritative trust anchor for `v1.1.0` is the release set as published by this repository, not a single metadata field copied from card to card.

## Legacy provenance scope (`v1.0.0`)

`v1.0.0` cards may contain provenance-adjacent metadata such as `meta.pgp_fingerprint`. Those fields are preserved as part of the historical artifact shape. They should be read as legacy metadata, not as the current repository's primary authenticity mechanism.

Legacy retention also has known constraints:

- the `_shared` schema structure is looser than the `v1.1.0` schema model
- legacy cards are not normalized to current-line mirror and release-bundle conventions
- preservation avoids placeholder junk and obvious breakage, but does not upgrade legacy artifacts into the current provenance system
