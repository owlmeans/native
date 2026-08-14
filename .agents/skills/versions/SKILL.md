---
name: versions
description: How to manage package versions in the OwlMeans Native monorepo. All packages are synchronized at the same version as the common monorepo. Use when bumping versions, checking current version, or updating internal dependency references.
allowed-tools: Bash(grep *) Bash(sed *) Bash(bun install)
---

# Versioning — OwlMeans Native

## Version convention

- All packages are **synchronized at the same version** as `common` — currently `0.1.2`
- All use `@owlmeans/*` namespace with MIT license
- Version is set in each `packages/*/package.json` under the `"version"` field
- Cross-package deps within this monorepo: `"@owlmeans/native-xxx": "^0.1.2"` (caret)
- Deps on common packages: `"@owlmeans/xxx": "^0.1.2"` (caret, resolved via workspace linking)

## Checking current version

```bash
grep '"version"' packages/native-client/package.json
```

## Bumping all packages to a new version

```bash
OLD=0.1.2
NEW=0.2.0

# Update version field in all packages
sed -i "s/\"version\": \"$OLD\"/\"version\": \"$NEW\"/g" packages/*/package.json

# Update internal dep references (caret ranges)
sed -i "s/\"\^$OLD\"/\"^$NEW\"/g" packages/*/package.json

# Re-link workspace
bun install
```

**Important**: When bumping versions, also bump the corresponding packages in `common` to keep in sync.

## dep-config special case

`@owlmeans/dep-config` is referenced as `"workspace:*"` in devDependencies — it resolves via the `libraries/common/packages/dep-config` workspace entry. No version needed.
