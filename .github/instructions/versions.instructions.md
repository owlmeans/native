---
description: "How to manage package versions in the OwlMeans Native monorepo. All packages are synchronized at the same version as the common monorepo. Use when bumping versions, checking the current version, or updating internal dependency references."
applyTo: "**/package.json"
---

# Versioning — OwlMeans Native

## Version convention

- All packages are **synchronized at the same version** as `common` — currently `0.1.2`
- All use `@owlmeans/*` namespace with MIT license
- Version is set in each `packages/*/package.json` under the `"version"` field
- Cross-package deps within this monorepo: `"@owlmeans/native-xxx": "^0.1.2"` (caret)
- Deps on common packages: `"@owlmeans/xxx": "^0.1.2"` (caret, resolved via workspace linking)

## Bumping all packages to a new version

```bash
OLD=0.1.2
NEW=0.2.0

sed -i "s/\"version\": \"$OLD\"/\"version\": \"$NEW\"/g" packages/*/package.json
sed -i "s/\"\^$OLD\"/\"^$NEW\"/g" packages/*/package.json
bun install
```

**Important**: When bumping versions, also bump the corresponding packages in `common` to keep in sync.

## dep-config special case

`@owlmeans/dep-config` is referenced as `"workspace:*"` in devDependencies — resolves via `libraries/common/packages/dep-config`. Never use a version number for dep-config.
