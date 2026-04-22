---
name: git-workflow
description: "Use when: managing git branches and commits per feature, starting new feature work, or committing completed work. Automates branch creation and organizes commits logically (one commit per working feature/improvement)."
---

# Git Workflow Skill

## Overview

Semi-automated git management for feature branches and logical commits:
- **Branches**: Auto-create feature branches with consistent naming from `feat/react-migration`
- **Commits**: Structure by working features—one commit per working subject, separate commits for improvements/optimizations
- **Pushing**: Manual control—you decide when to push

## Workflow: New Feature

### 1. Start a New Feature
```bash
# Option A: Ask agent to create branch
"Start new feature for [description]"

# Option B: Manual branch creation from feat/react-migration
git checkout feat/react-migration
git pull origin feat/react-migration
git checkout -b feat/your-feature-name
```

**Branch naming**: `feat/short-description` (kebab-case, descriptive)

### 2. Build the Feature
Write code, tests, styles — iterate until the feature works independently.

### 3. Stage & Commit (One Commit Per Working Subject)
```bash
# See what changed
git status

# Stage specific changes (logical grouping)
git add src/components/MyComponent.jsx
git add src/styles/app.css

# Commit with clear message
git commit -m "Add MyComponent with animations"
```

**Commit messages**: `[Type] Brief description` where Type is:
- `Add` — new feature/component
- `Fix` — bug fix
- `Update` — enhance existing feature
- `Optimize` — performance/refactor improvements
- `Style` — CSS/layout changes
- `Docs` — documentation updates

### 4. For Improvements/Optimizations
If you refactor or optimize *after* a feature works, **create a separate commit**:
```bash
# Make optimization changes
# Stage only optimization changes
git add src/hooks/useScrollAnimation.js

git commit -m "Optimize useScrollAnimation hook performance"
```

### 5. Ready to Share? Push
```bash
# First time pushing a new branch
git push -u origin feat/your-feature-name

# Subsequent pushes
git push
```

Then create a PR to `feat/react-migration` (or `main` as needed).

## Workflow: Continuing Existing Work

### Resume a Feature Branch
```bash
git checkout feat/your-feature-name
git pull origin feat/your-feature-name
```

### Add to Existing Branch
Make changes, then commit as per Section 3 above. Each commit should be a discrete, working unit.

## Common Commands

| Task | Command |
|------|---------|
| List all branches | `git branch -a` |
| See commit history | `git log --oneline -10` |
| Undo last commit (keep changes) | `git reset --soft HEAD~1` |
| Switch branches | `git checkout feat/branch-name` |
| Delete local branch | `git branch -d feat/branch-name` |
| Delete remote branch | `git push origin --delete feat/branch-name` |
| Check status | `git status` |

## Commit Examples

✅ **Good commits** (one per working subject):
- `Add CardContainer component with props`
- `Fix animation timing in useScrollAnimation`
- `Optimize formula SVG parallax calculations`
- `Update README with new instructions`

❌ **Avoid** (too broad or mixed concerns):
- `Update stuff` (unclear)
- `Add component, fix bug, and update styles` (three commits worth of work)

## Integration with `todo.md`

As you work:
1. Check `todo.md` for current priorities
2. Create branch for a todo item: `feat/your-todo-name`
3. Commit each logical step within that feature
4. Update `todo.md` status to `completed`
5. Push and create PR when feature is done

## Auto-Start a Feature (Ask Agent)

You can ask the agent directly:
```
"Create a new branch for [feature name and description]"
```

The agent will:
1. ✅ Verify you're on `feat/react-migration` with latest changes
2. ✅ Create a new branch: `feat/your-feature-name`
3. ✅ List next steps and guide you through the workflow
