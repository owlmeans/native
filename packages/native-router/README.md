# OwlMeans Package Template

This is a template directory for creating new packages within the OwlMeans Common Libraries ecosystem.

## Usage

Copy this template directory when creating a new package:

```bash
cp -r packages/_tpl packages/your-new-package
cd packages/your-new-package
```

Then update:
- `package.json` - Change the package name and dependencies
- `README.md` - Replace with proper documentation following OwlMeans standards
- `src/index.ts` - Implement your package functionality

## Template Structure

- **package.json** - Base package configuration with common scripts and exports
- **tsconfig.json** - TypeScript configuration aligned with OwlMeans standards  
- **src/index.ts** - Entry point file
- **README.md** - This template documentation (replace with actual docs)

<!-- owlmeans:agent-guidance:start -->
## Agent guidance

This package ships embedded Claude Code skills and GitHub Copilot instructions under
`agent-meta/`. After installing your `@owlmeans/*` packages, run the OwlMeans
agent-skills installer to place them into your project's native locations
(`.claude/skills/` and `.github/instructions/`):

```sh
npx @owlmeans/agent-skills
```

The embedded files are version-matched to this package release. Do not edit them
directly — they are regenerated on each publish. To contribute guidance edits,
open a PR against the source monorepo.
<!-- owlmeans:agent-guidance:end -->
