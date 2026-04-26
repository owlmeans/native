---
name: create-skill
description: Guide for creating a new Claude Code skill in this project. Use when asked to convert knowledge into a skill, create a slash command, or add a new skill file.
---

# Creating a Claude Code Skill

Skills live in `.claude/skills/<skill-name>/SKILL.md`. Each skill is a directory.

## File Structure

```
.claude/skills/<skill-name>/
├── SKILL.md          # Required — entrypoint with frontmatter + instructions
├── reference.md      # Optional — detailed reference docs
└── examples.md       # Optional — usage examples
```

## SKILL.md Frontmatter

```yaml
---
name: skill-name                  # becomes the /slash-command (lowercase, hyphens)
description: What it does and when to use it  # guides auto-invocation by Claude
allowed-tools: Bash(bun *) Read   # tools usable without per-call approval
disable-model-invocation: true    # set true for side-effect tasks (deploy, commit)
user-invocable: false             # set false for background knowledge only
---
```

## Key Frontmatter Fields

| Field | Use when |
|---|---|
| `description` | Always — primary signal for when Claude auto-invokes |
| `allowed-tools` | Skill needs to run specific commands without prompting |
| `disable-model-invocation: true` | Skill has side effects (git push, deploy, etc.) |
| `user-invocable: false` | Skill is background knowledge, not an action |

## After Creating a Skill

1. Update `.claude/memory/MEMORY.md` to mention the skill exists
2. Update `CLAUDE.md` Additional Context section if relevant
3. Test by typing `/skill-name` in Claude Code
