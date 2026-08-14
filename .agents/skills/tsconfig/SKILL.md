---
name: tsconfig
description: How to configure TypeScript in OwlMeans Native packages. Covers the dep-config package from common, which configs to extend, and how to set up a new package's tsconfig. Use when creating packages, editing tsconfigs, or diagnosing TypeScript config issues.
allowed-tools: Bash(bunx tsc *) Read Edit Write
---

# TypeScript Configuration — OwlMeans Native

## Overview

All shared TypeScript config comes from `@owlmeans/dep-config` (the `dep-config` package from the `common` monorepo, consumed via `libraries/common/packages/dep-config`). Individual packages extend from there — no relative `../tsconfig.*.json` paths.

## Available configs

| File | Purpose |
|------|---------|
| `tsconfig.base.json` | Core settings: strict, ESNext, Bundler resolution, declaration output |
| `tsconfig.react.json` | Adds `jsx: "react-jsx"` and `lib: ["DOM", "DOM.Iterable", "ESNext"]` |
| `tsconfig.server.json` | Sets `lib: ["ESNext"]` only — no DOM |
| `tsconfig.node.json` | Extends server + adds `types: ["node"]` |
| `tsconfig.bun.json` | Extends server + adds `types: ["bun"]` |

## React Native packages

React Native packages extend **`tsconfig.base.json` only** — no DOM, no Node/Bun globals. The React Native runtime provides its own globals.

```json
{
  "extends": ["@owlmeans/dep-config/tsconfig.base.json"],
  "compilerOptions": {
    "rootDir": "./src/",
    "outDir": "./build/"
  },
  "exclude": ["./dist/**/*", "./build/**/*", "./*.ts"]
}
```

## Key rules

- Always use `@owlmeans/dep-config/tsconfig.*.json` (package path) — not relative paths
- `dep-config` must be in `devDependencies` as `"workspace:*"`
- React Native has its own JSX transformer — do not use `tsconfig.react.json` for native packages (React Native handles JSX transform separately)
