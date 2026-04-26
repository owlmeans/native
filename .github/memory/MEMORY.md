# Memory Index

Read this at the start of every conversation. Load files relevant to the current task before acting.

## Always relevant
- Project structure, architecture, layers, memory rules → already in `.github/copilot-instructions.md`

## Instructions (load based on task)
- [bun](./../instructions/bun.instructions.md) — Bun package manager & build
- [versions](./../instructions/versions.instructions.md) — Versioning conventions
- [tsconfig](./../instructions/tsconfig.instructions.md) — TypeScript config setup
- [create-skill](./../instructions/create-skill.instructions.md) — How to create Copilot instruction files

## Project facts
- **versioning** — All 4 packages synchronized at `0.1.2`, same as `common` monorepo
- **common dependency** — Common packages consumed via `libraries/common/` symlink + explicit workspace entries

## How to add new memory
- Facts, decisions, gotchas → `.github/memory/<topic>.md` + update this index
- Reusable procedures or reference → `.github/instructions/<name>.instructions.md` + update this index
