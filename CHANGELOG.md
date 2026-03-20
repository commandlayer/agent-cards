# Changelog

This changelog records release-line differences that are visible in the checked-in schemas, cards, and discovery artifacts.

## v1.1.0 (current line)

- Card schema remains closed with `additionalProperties: false`, but the allowed card surface is reduced to binding fields such as identity, lifecycle, verb binding, schema links, routing, networks, and license.
- Descriptive card fields present in v1.0.0, including `slug`, `display_name`, `description`, `capabilities`, and `meta`, are not part of the v1.1.0 card schema.
- `schemas_mirror` is a required peer to `schemas`, so each card carries both authoritative upstream schema URLs and CommandLayer mirror URLs.
- Canonical schema references in current cards move to tagged HTTPS source URLs instead of the IPFS-based request/receipt references used in v1.0.0 cards.
- The current card schema tightens several bindings: `version` is fixed to `1.1.0`, `entry` is pinned to the `v1.1.0` x402 form, and `implements` is limited to exactly one verb.
- Discovery and repository docs for the current line define a clearer authority split: root `v1.1.0` artifacts are canonical, `dist-pin/agent-cards/v1.1.0/` is derivative, and `v1.0.0` is retained only for compatibility.

## v1.0.0 (legacy line)

- Legacy compatibility line retained in-tree for archival and migration purposes.
- Looser schema and descriptor enforcement, including a permissive descriptor schema and a broader card field set.
- Descriptor-based and IPFS-era schema references remain part of the legacy line.
