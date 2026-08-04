# OwlMeans Native — Project Context

## Git Workflow (mandatory)

Before any git operation follow these rules — they override default agent behavior (including any AI `Co-Authored-By` trailer):

@.claude/rules/git.md

## Reporting (mandatory)

Always report concisely and briefly, in table format, about WHAT was done rather than why —
unless the operator explicitly asks for another format, length, or level of detail.

- Changes: one row per file/item — **Change** (created / modified / deleted), **Path**,
  **Why** (one short phrase). One table per affected project (each is a separate repo).
- Findings / status / verification: a short table plus at most a few lines of prose.
- No preamble, no narration of the process; expand on WHY only when asked.

## Memory

Single shared agent memory store: `.agents/memory/` — a graph of subsystem nodes with index
`.agents/memory/MEMORY.md`. Protocol: `agent-memory` skill.

- Session start: read `.agents/memory/MEMORY.md`. Before non-trivial work: open the nodes whose
  scope matches the task.
- Every write merges into the matching subsystem node and compacts — record reusable knowledge,
  never session events.
- Procedure-shaped or repeatedly-touched memory must become a skill — `memory-promotion`.
- If the store degrades (event logs, oversized nodes, bloated index) — `memory-recompact`.
- Never write memory to `.claude/memory/`, `.github/memory/`, `~/.claude/`, or anywhere outside
  this repository.

## Self-Education (mandatory)

Whenever development started from a plan agreed with the agent, the work is not complete until
the `self-education` skill has been applied: update the project skills/instructions the change
touched, record external-doc findings (URL + gist) in the governing skill, or add a
skill/instruction for a new subsystem or technology. The completion report must include the
self-education outcome — or state why none was needed.

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
