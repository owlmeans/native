---
description: "How to configure TypeScript in OwlMeans Native packages. Covers the dep-config package from common, which configs to extend, and how to set up a new package's tsconfig. Use when creating packages, editing tsconfigs, or diagnosing TypeScript config issues."
applyTo: "**/tsconfig*.json"
---

# TypeScript Configuration — OwlMeans Native

## Overview

All shared TypeScript config comes from `@owlmeans/dep-config` (consumed from `common` via `libraries/common/packages/dep-config`). Individual packages extend from there — no relative paths.

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
- Do NOT use `tsconfig.react.json` for React Native packages — React Native handles JSX transform separately
- All 4 native packages use `tsconfig.base.json` (no DOM, no server types)

## Available configs (from dep-config)

| File | Purpose |
|------|---------|
| `tsconfig.base.json` | Core: strict, ESNext, Bundler resolution — **use this for native packages** |
| `tsconfig.react.json` | JSX+DOM — for web React only, NOT for React Native |
| `tsconfig.server.json` | No DOM, ESNext only |
| `tsconfig.node.json` | Server + Node globals |
| `tsconfig.bun.json` | Server + Bun globals |
