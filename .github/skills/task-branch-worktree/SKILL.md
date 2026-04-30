---
name: task-branch-worktree
description: "Use when: starting any new task, bug fix, feature, or documentation change. Standardizes one task per branch and one worktree per task for parallel work."
---

# Task Branch and Worktree Skill

## Purpose

Start every new task on its own branch and, when multiple tasks are active, use separate git worktrees so they can run in parallel without interfering with each other.

## Core Rule

1. Every task gets a dedicated branch.
2. Every active task gets its own worktree.
3. Never mix bug, feature, and documentation work on the same branch if the tasks can be separated.

## Branch Naming

Use a prefix that matches the task type:

- `feat/` for new features
- `fix/` for bugs
- `docs/` for documentation

Examples:

- `feat/add-project-filtering`
- `fix/fix-scroll-animation-jump`
- `docs/update-workflow-skill`

## Worktree Layout

Keep parallel tasks in sibling worktrees under a shared worktree folder. A simple pattern is:

- root repo: the main checkout
- worktrees: `.worktrees/<branch-name>`

Example:

```powershell
git worktree add .worktrees/feat-add-project-filtering -b feat/add-project-filtering
git worktree add .worktrees/bug-fix-scroll-animation -b bug/fix-scroll-animation
git worktree add .worktrees/docs-update-workflow -b docs/update-workflow
```

## Starting A New Task

1. Identify the task type: feature, bug, or documentation.
2. Create a new branch from the current base branch.
3. Add a new worktree for that branch if another task is already in progress.
4. Keep the worktree focused on that single task until it is ready to merge.

## Parallel Work

When two or more tasks must move at the same time:

- Use one worktree per task.
- Keep branch names aligned with task type.
- Avoid cross-task edits inside a single worktree.

## Cleanup

After the task is merged or no longer needed:

```powershell
git worktree remove .worktrees/<branch-name>
git branch -d <branch-name>
```

## Recommended Behavior For The Agent

- Prefer creating a new branch instead of reusing the current one.
- Prefer a new worktree when the request is unrelated to the task already open in the current checkout.
- Keep bug, feat, and docs work isolated so changes stay reviewable and easy to merge.

See also: [.github/skills/git-workflow/SKILL.md](../git-workflow/SKILL.md)
