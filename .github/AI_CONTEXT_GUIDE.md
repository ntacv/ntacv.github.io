---
name: "AI Context Guide"
description: "Map of all AI context files in this project: where to look, when to use each file, and how they integrate."
---

# AI Context Files Guide

This project includes comprehensive AI context and guidance. Use this map to find what you need.

## Quick Navigation

| File | Purpose | When to Use |
|------|---------|------------|
| **`.github/copilot-instructions.md`** | Workspace overview, project structure, core rules | Starting work; onboarding; unclear about architecture |
| **`todo.md`** | Tracked tasks, priorities, progress | Beginning session; updating status; planning work |
| **`.github/skills/react-components/SKILL.md`** | React component patterns, props, JSDoc | Creating/editing React components |
| **`.github/skills/scroll-animations/SKILL.md`** | Animation hook internals, tuning, debugging | Modifying animations or scroll behavior |
| **`.github/instructions/react-components.instructions.md`** | Component naming, file structure, testing | Applied automatically to `src/components/**/*.jsx` |
| **`.github/instructions/data-content.instructions.md`** | Data structure, typing, adding content | Applied to `src/data/**` |
| **`.github/instructions/build-deployment.instructions.md`** | Build process, environment, deployment | Troubleshooting builds or deploying |

## Hierarchy

```
.github/
├── copilot-instructions.md    # ← Start here for project overview
├── instructions/              # Applied to specific file paths
│   ├── react-components.instructions.md
│   ├── data-content.instructions.md
│   └── build-deployment.instructions.md
└── skills/                    # Load on-demand for focused workflows
    ├── react-components/
    │   └── SKILL.md
    └── scroll-animations/
        └── SKILL.md

todo.md                         # Task tracking & progress
```

## How to Work With These Files

### Before Starting Work

1. **Read `copilot-instructions.md`** — Understand project structure, tech stack, key rules
2. **Check `todo.md`** — See what's in progress, what's next, what's blocked

### During Development

1. **Working on React components?** — Skill `react-components` will auto-load; refer to `.github/instructions/react-components.instructions.md`
2. **Modifying animations?** → Load skill `scroll-animations`
3. **Changing build/deploy?** → Check `.github/instructions/build-deployment.instructions.md`

### After Completing Work

1. **Update `todo.md`** — Mark items complete, add discovered blockers, update status
2. **Commit** — Include reference to todo item in commit message (e.g., `feat: remove legacy files (#todo-migration-3)`)

## For AI Assistants (Agents)

When invoked, agents should:

1. Load (or reference) `.github/copilot-instructions.md` for context
2. Check `todo.md` to understand priorities and current state
3. Load relevant **skill** based on task:
   - React component work → `react-components/SKILL.md`
   - Animation work → `scroll-animations/SKILL.md`
4. Load relevant **file instructions** based on file paths being edited
5. **Update `todo.md` with progress** before ending session

## File Descriptions

### `.github/copilot-instructions.md`

- **Scope**: Entire workspace
- **Content**: Project overview, tech stack (Vite, React 18), file structure, rules for components, animations, styling, API safety, common tasks
- **Update frequency**: When project structure changes
- **Target audience**: Anyone joining the project; AI assistants

### `todo.md`

- **Scope**: Task tracking
- **Structure**: Organized by milestone (v0.3.0, v0.4.0, etc.)
- **Content**: Task list with status (not-started, in-progress, completed), priorities, blockers
- **Update frequency**: After each work session or PR
- **Target audience**: Dev team, project maintainers, AI assistants

### `.github/skills/react-components/SKILL.md`

- **Trigger**: Use when working with React components
- **Content**: Naming conventions, component template, props patterns, JSDoc examples, common patterns
- **Key topics**: Destructuring, default exports, children, external links, inline styling, imports

### `.github/skills/scroll-animations/SKILL.md`

- **Trigger**: Use when debugging or modifying scroll animations
- **Content**: Hook API, parallax calculation, formula elements, mobile behavior, performance notes, debugging tips, adding new elements
- **Key topics**: `animateRatio()` tuning, element positioning, scroll event handling, CSS properties

### `.github/instructions/react-components.instructions.md`

- **Applied to**: `src/components/**/*.jsx`
- **Content**: Naming, exports, props/typing, children, external links, inline styling, imports
- **Auto-load**: When editing component files

### `.github/instructions/data-content.instructions.md`

- **Applied to**: `src/data/**`
- **Content**: Data structure, JSDoc typing, content arrays (SOCIAL_LINKS, LANGUAGES, etc.), adding new content
- **Auto-load**: When editing data files

### `.github/instructions/build-deployment.instructions.md`

- **Applied to**: `package.json`, `vite.config.js`, `dist/**`, `public/**`
- **Content**: Build process, scripts, Vite config, dependencies, asset handling, environment variables, deployment, troubleshooting
- **Auto-load**: When editing build/config files

## Examples

### Scenario 1: "Add a new social link"

1. Open `todo.md` → check if task exists, mark in-progress
2. Edit `src/data/content.js`
3. File instructions (`.github/instructions/data-content.instructions.md`) auto-load
4. Add entry to `SOCIAL_LINKS` array with proper structure
5. Update `todo.md` with completion
6. Commit: `feat: add social link (#todo-item)`

### Scenario 2: "Fix animation speed"

1. Open `src/hooks/useScrollAnimation.js`
2. Load skill: `.github/skills/scroll-animations/SKILL.md`
3. Find `animateRatio()` function
4. Adjust `0.002` parameter (growth rate)
5. Test locally: `npm run dev`
6. Commit: `fix: tune scroll animation speed`

### Scenario 3: "Create new component"

1. Check `todo.md` for component-related tasks
2. Load skill: `.github/skills/react-components/SKILL.md`
3. Create file in `src/components/NewComponent.jsx`
4. File instructions auto-load
5. Use component template from skill
6. Add to `src/App.jsx`
7. Update `todo.md`

## Maintenance

- **Quarterly**: Review `todo.md` and archive completed milestones
- **After major changes**: Update relevant `.instructions.md` files
- **When adding new domains**: Create new `.github/skills/<domain>/SKILL.md`

---

**Created**: April 22, 2026  
**See also**: `.github/copilot-instructions.md`, `todo.md`
