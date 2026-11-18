---
name: versions
description: How to manage package versions in the OwlMeans Native monorepo. All packages are synchronized at one version; common packages are pinned by caret at the version common ships. Use when bumping versions, checking current version, or updating internal dependency references.
allowed-tools: Bash(grep *) Bash(bun install)
---

# Versioning — OwlMeans Native

## Version convention

- All packages are **synchronized at the same version** — currently `0.2.0`
- All use `@owlmeans/*` namespace with MIT license
- Version is set in each `packages/*/package.json` under the `"version"` field; the root
  `@owlmeans/native-root` manifest carries the same version
- Cross-package deps within this monorepo: `"@owlmeans/native-client": "^0.2.0"` (caret on the
  shared version)
- Deps on common packages: a caret at the version common ships (`"@owlmeans/client": "^0.2.1-rc.0"`),
  resolved through the `libraries/common/packages/...` workspace entries. They move when common
  releases (`bump-deps --consumers-of common` sweeps this repo), not when native bumps.

## Checking current version

```bash
grep '"version"' packages/native-client/package.json
```

## Bumping all packages to a new version

Library-manager scripts, run from the library-manager checkout:

```bash
# 1. every owned package → one version (writes the `version` fields and nothing else)
bun run scripts/set-versions.ts --project native:0.3.0 --dry-run
bun run scripts/set-versions.ts --project native:0.3.0

# 2. realign the native cross-package carets onto it
bun run scripts/bump-deps.ts --source native --for native --no-install --force
```

Set the root manifest's `version` by hand, then `bun install` here. Never rewrite the version
strings with a textual `sed`: native can share a version with common, and a `sed` cannot tell a
native pin from a common one — `bump-deps` rewrites only the pins of the packages the source repo
owns.

## dep-config special case

`@owlmeans/dep-config` is referenced as `"workspace:*"` in devDependencies — it resolves via the `libraries/common/packages/dep-config` workspace entry. No version needed.
