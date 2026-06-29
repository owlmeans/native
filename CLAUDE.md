# OwlMeans Native — Project Context

## Git Workflow (mandatory)

Before any git operation follow these rules — they override default agent behavior (including any AI `Co-Authored-By` trailer):

@.claude/rules/git.md

## Change Reporting (mandatory)

After any change is implemented and finished, report it as a Markdown table — one row per file/item with columns **Change** (created / modified / deleted), **Path**, and **Why**. When changes span multiple projects, emit **one table per project** (each is a separate repo).

## Memory & Meta-file Rules

All project memory and meta-information must be stored inside this project, never in `~/.claude/`:

- **Always** write new memory files to `.claude/memory/` in this project root
- **Always** update `.claude/memory/MEMORY.md` index when adding a new memory file
- **Never** write project-related memory to `~/.claude/projects/*/memory/`
- For context that should load every session: add it to `CLAUDE.md` or import it with `@.claude/filename.md`
- For context loaded on demand: put it in `.claude/<topic>.md` and reference it from the "Additional Context" section below
- When asked to remember something about this project, save it to `.claude/memory/<topic>.md` and update `.claude/memory/MEMORY.md`

### When to read memory

- **At the start of every conversation**: read `.claude/memory/MEMORY.md` to see what memory files exist, then read any that are relevant to the current task
- **Before starting any non-trivial task**: check if a relevant `.claude/memory/*.md` or `.claude/<topic>.md` file exists and read it
- **When a topic comes up** (e.g. bun, auth, deployment): read the corresponding file before acting, don't rely on assumptions
- **After completing a task** that produced new knowledge (decisions made, patterns established, gotchas found): save it to the appropriate memory file

## What This Is

Public React Native libraries monorepo for the OwlMeans framework. Provides React Native implementations of the platform-agnostic client layer from the `common` monorepo, enabling mobile app development with the same DI/context model used across web and server.

The `common` monorepo is consumed as a library dependency via `libraries/common/` symlink.

## Architecture

This monorepo contains 4 packages implementing the **Native** layer of the Quadra pattern:

- **`native-router`** (`@owlmeans/native-router`) — React Native router integration using `react-router-native`. Implements the `@owlmeans/router` contract for mobile.
- **`native-db`** (`@owlmeans/native-db`) — Async storage adapter using `@react-native-async-storage/async-storage`. Implements the `@owlmeans/resource` contract for mobile-local persistence.
- **`native-client`** (`@owlmeans/native-client`) — Top-level React Native client bootstrapper. Wires router, db, and client-context together with env config.
- **`native-panel`** (`@owlmeans/native-panel`) — React Native UI component library built on react-native-paper. Auth forms, navigation panels, and other shared UI.

All packages depend on platform-agnostic packages from `common` (consumed via `libraries/common/`).

## Key Facts

- 4 packages, all `@owlmeans/*` namespace, MIT license, version `0.1.2`
- TypeScript 6.0+, ESM + CJS dual exports, build output → `build/`
- TypeScript configs from `@owlmeans/dep-config` (consumed from common): packages extend `tsconfig.base.json`
- React Native peer dependencies — never bundled, always peer
- `dep-config` always `"workspace:*"` in devDependencies (no runtime code)
- Internal cross-package deps use `"^0.1.2"` (caret semver, not `workspace:*`)
- Common packages consumed as semver deps `"^0.1.2"` (resolved via workspace linking)
- **Package manager: Bun 1.3.10** — hoisted linker required (`bunfig.toml`)
- **Public repo** — MIT license, packages published to npm

## Build & Scripts

```bash
bun install                    # install all workspace dependencies
bun run build                  # build all packages in packages/ (tsc -b per package)
bun run watch                  # watch mode for all packages in packages/
```

## Additional Context

- **Bun (package manager & build)**: skill at `.claude/skills/bun/SKILL.md`
- **Creating skills**: skill at `.claude/skills/create-skill/SKILL.md`
- **Versioning**: skill at `.claude/skills/versions/SKILL.md`
- **TypeScript configs**: skill at `.claude/skills/tsconfig/SKILL.md`
- **Package-specific usage**: each package has its own skill at `.claude/skills/<package-name>/SKILL.md` (`native-client`, `native-db`, `native-panel`, `native-router`) — auto-invoked when working with that package.
- **Agent-meta schema (embedded guidance)**: Every published `@owlmeans/native-*` package ships embedded copies of its skill and instruction in `packages/<pkg>/agent-meta/` (layout: `skills/<name>/SKILL.md`, `instructions/<name>.instructions.md`, `manifest.json`). These are **generated and read-only** — always edit the canonical file at `.claude/skills/<name>/SKILL.md` or `.github/instructions/<name>.instructions.md`, then regenerate via `bun run scripts/sync-agent-meta.ts --project native --canonical-repo https://github.com/owlmeans/native` in the library-manager. Never hand-edit an embedded copy.
