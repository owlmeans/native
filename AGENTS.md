# OwlMeans Native — Project Context

## Git Workflow (mandatory)

Before any git operation follow the rules in `.agents/rules/git.md` — they override default agent
behavior (including any AI `Co-Authored-By` trailer).

@.agents/rules/git.md

## Environments (mandatory)

Work only on the environment the current request names — the checkout you are in and the hosts,
releases and data it owns. Never deploy to, restart, or mutate another environment unless the
operator asks explicitly in the current request. Activity of other environments sharing the machine
or cluster is background noise, never something to fix from here.

## Reporting (mandatory)

Report concisely, in table format, WHAT was done rather than why — unless the operator asks otherwise.

- Changes: one row per file/item — **Change** (created / modified / deleted), **Path**, **Why**
  (one short phrase). One table per affected repo.
- Findings / status / verification: a short table plus at most a few lines of prose.
- No preamble, no process narration; at most **one phrase per issue**; expand on WHY only when asked.
- Findings and advice **not acted on** go in their own separate, short section.
- Explaining an issue = a table **Where | Cause | Effects | Code details**; code details and
  explanation are always two separate sentences.
- No "to impress" modes (LLM/agent defaults) — at minimum keep them out of reports.

## Memory

Shared store `.agents/memory/` (index `MEMORY.md`, read at session start) — protocol in the
`agent-memory` skill; promotion to skills `memory-promotion`, degraded store `memory-recompact`.
Never write memory outside this repository or to a per-agent directory.

## Self-Education (mandatory)

Work that started from an agreed plan is complete only after the `self-education` skill is applied;
the completion report states its outcome or why none was needed.

## What This Is

Public (MIT, npm) React Native libraries monorepo for the OwlMeans framework: React Native
implementations of the platform-agnostic client layer of the `common` monorepo, consumed via the
`libraries/common/` symlink.

## Architecture

4 packages implementing the **Native** layer of the Quadra pattern, all built on `common`:

- **`native-router`** (`@owlmeans/native-router`) — `react-router-native` integration implementing the `@owlmeans/router` contract.
- **`native-db`** (`@owlmeans/native-db`) — AsyncStorage adapter implementing the `@owlmeans/resource` contract for mobile-local persistence.
- **`native-client`** (`@owlmeans/native-client`) — app bootstrapper wiring router, db and client-context with env config.
- **`native-panel`** (`@owlmeans/native-panel`) — react-native-paper UI library: auth forms, navigation panels, shared UI.

Key facts: TypeScript 6, ESM, `tsc -b` output → `build/`; React Native deps are always peer, never
bundled; Bun with the hoisted linker. Dependency ranges → `versions`, `bun`, `tsconfig` skills.

**`packages/*/agent-meta/` is generated and read-only** — edit `.agents/skills/<name>/SKILL.md` and
regenerate from library-manager (its `.agents/rules/agent-meta.md`); never hand-edit a copy.

## Build & Scripts

```bash
bun install      # install all workspace dependencies
bun run build    # build all packages (tsc -b per package)
bun run watch    # watch mode for all packages
```

## Skills

- `/bun` — installing, building, watching, running scripts
- `/versions` — bumping or checking versions, internal dependency ranges
- `/tsconfig` — creating a package or editing a tsconfig
- `/native-client`, `/native-db`, `/native-panel`, `/native-router` — working with that package
- `/nested-agent-context` — before any work under `libraries/*`
- `/create-skill` — adding or changing a skill

Upstream skills are linked into `.agents/linked-skills/` (index `INDEX.md`) by `link-skills.sh`;
load them by name — a local skill of the same name wins.

## Maintenance

Guidance is single-source: `AGENTS.md`, `.agents/skills/`, `.agents/rules/`; when a change
invalidates a rule, rewrite it in place (`self-education`).

- New guidance is one skill — never `.github/instructions/*`, `.github/copilot-instructions.md`, or
  a file authored under `.claude/skills/` (generated symlinks; after skill changes run
  `sh .agents/scripts/link-skills.sh`). Skill scripts live once, in `.agents/skills/<name>/scripts/`.
- AGENTS.md + its imports + MEMORY.md ≤ 40 000 chars (`sh .agents/scripts/agents-size.sh`);
  subsystem rules go to their skill, incidents to `.agents/memory/`.
