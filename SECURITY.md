# Security Policy — CommandLayer Agent Cards

Report suspected security issues to `dev@commandlayer.org`. Use that channel for issues that could let published Agent Cards, discovery descriptors, or integrity metadata misstate identity, routing, or release provenance.

Examples include:

- unauthorized or incorrect changes to current-line card bindings, schema URLs, or `entry` URIs
- manifest or discovery drift that could misroute clients
- checksum or release-bundle inconsistencies that could hide tampering
- schema or validation defects that could cause consumers to trust malformed artifacts

Please do not open a public issue for a suspected security problem before maintainers have had a chance to review it. Include the affected file or URL, the release line, the impact you see, and any reproduction or verification steps.

This repository is maintained by a small team, so response timing may vary. Maintainers will try to acknowledge credible reports and coordinate next steps as soon as practical, but no formal SLA is offered.
