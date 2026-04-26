---
name: bun
description: Bun package manager and build commands for this OwlMeans Native monorepo. Use when installing packages, building, watching, or running scripts. Covers workspace filters, tsc -b builds, and monorepo-specific patterns.
allowed-tools: Bash(bun *)
---

# Bun — OwlMeans Native Monorepo

Uses **Bun 1.3.10**. Always use `bun`, never `yarn` or `npm`.

## Package Management

- Install all workspace deps: `bun install`
- Add dep to specific workspace: `bun add <pkg> --cwd packages/<name>`
- Add dep to root: `bun add <pkg>`
- Lock file: `bun.lock` (tracked in git)
- Workspace config: `workspaces: ["packages/*", "libraries/common/packages/..."]` in root `package.json`
- Common packages are consumed via `libraries/common/` symlink — explicit entries only (no globs)

## Building

- Build all packages: `bun run build` from root
- Build one package: `bun run build` from inside `packages/<name>`, or `bun --filter '@owlmeans/<name>' run build` from root
- Each package compiles with: `tsc -b` (no bundler, pure TypeScript)
- Output: `packages/<name>/build/`
- Watch mode: `bun run watch` → `tsc -b -w` per package
- Dev mode: `bun run dev` → nodemon watching `src/`

## Root Scripts

```json
"dev":   "bun run --filter './packages/*' --parallel dev",
"build": "bun run --filter './packages/*' build",
"watch": "bun run --filter './packages/*' --parallel watch"
```

Scripts target only `packages/*` — not the linked library packages from `libraries/common/`.

## Rules & Gotchas

- Syntax: `bun run --filter <pattern> <script>` — NOT `bun --filter ... run <script>`
- Hoisted linker required: `bunfig.toml` must have `[install] linker = "hoisted"`
- Common packages listed explicitly in `workspaces` — never use `libraries/common/packages/*` glob
- Common packages dep versions: always semver `"^0.1.2"`, never `workspace:*`
- `dep-config` is always `"workspace:*"` (resolves via `libraries/common/packages/dep-config` workspace entry)
- Adding a new common package: append `"libraries/common/packages/<name>"` to root `package.json` workspaces, then `bun install`
