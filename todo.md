# Project TODO List

Track current and upcoming work for the ntacv.github.io React migration and feature development.

**Updated**: April 22, 2026  
**Active branch**: `feat/react-migration`

---

## React Migration (v0.3.0)

**Status**: Core migration complete ✅

- [x] Scaffold Vite + React project structure
- [x] Migrate UI components from vanilla JSX to organized React components
- [x] Port scroll animation logic to `useScrollAnimation` hook
- [x] Move Google Sheets API key to environment variables (safe handling)
- [x] Consolidate CSS into `src/styles/app.css`
- [x] Verify production build succeeds
- [x] Update README with setup/run/build docs
- [ ] Remove legacy script files (`scripts/index.js`, `scripts/data.js`, `scripts/animation.js`)
- [ ] Remove legacy CSS files (`style.css`, `style-formula.css`)
- [ ] Archive old files to legacy/ folder for reference, then remove from git

---

## Code Quality & Tooling (v0.4.0)

**Priority**: High  
**Status**: Blocked on migration completion

- [ ] Add ESLint configuration (AirBnB or standard preset)
- [ ] Add Prettier for consistent formatting
- [ ] Add npm scripts: `npm run lint`, `npm run format`
- [ ] Run linter on all src/ files; fix violations
- [ ] Add pre-commit hook to run lint + format before commits
- [ ] Consider Jest for unit tests (optional for v0.4.0)

---

## Environment & Secrets (v0.3.1)

**Priority**: High  
**Status**: Partially done

- [x] Add `.env.example` with VITE_GOOGLE_SHEETS_API_KEY placeholder
- [x] Document env var usage in copilot-instructions.md
- [ ] Verify `.env` is in `.gitignore` (already done, confirm)
- [ ] Add GitHub Actions secret for VITE_GOOGLE_SHEETS_API_KEY if deploying
- [ ] Document secret setup for contributors

---

## Component Library Expansion (v0.4.x)

**Priority**: Medium  
**Status**: Planned

- [ ] Extract hover message component for social links ("Playbook", "Notion", etc.)
- [ ] Create reusable Button component
- [ ] Create reusable Section header component
- [ ] Consider Storybook for component showcase

---

## Features & Content (v0.5.x+)

**Priority**: Low  
**Status**: Backlog (from original README)

- [ ] Add language support (i18n): French, Spanish, Chinese
- [ ] Add dark/light theme toggle
- [ ] Random color theme on page refresh
- [ ] PWA with offline support
- [ ] SEO improvements: meta tags, sitemap.xml, robots.txt
- [ ] Connect to Strapi CMS for dynamic content
- [ ] Embed Playbook portfolio as iframe or API
- [ ] Add vlog/video section with YouTube embeds
- [ ] Archives: site 2018, 2022, personal architecture
- [ ] CV auto-update pipeline

---

## Documentation & Deployment (v0.4.x)

**Priority**: Medium  
**Status**: In progress

- [x] Create `.github/copilot-instructions.md` (this project context)
- [x] Create `.github/skills/react-components/SKILL.md`
- [x] Create `.github/skills/scroll-animations/SKILL.md`
- [x] Create `todo.md` (this file)
- [ ] Create deployment guide (Vercel / Cloudflare Pages / GitHub Pages)
- [ ] Create CONTRIBUTING.md for new contributors
- [ ] Document component API in `.github/instructions/`

---

## How to Use This List

1. **For agents/assistants**: Read this list at the start of each session. Update status and check items as work completes.
2. **For PRs**: Reference the relevant section. Update status. Add new items if discovered.
3. **For reviews**: Check that completed items are marked and that changes align with current priorities.
4. **Frequency**: Update after each meaningful session or PR merge.

---

## Notes

- **Legacy files**: Scripts and old styles not being used; safe to remove in v0.3.1 cleanup.
- **Build status**: Vite build passes cleanly. No runtime errors in dev mode.
- **Branch strategy**: All work on `feat/react-migration` until ready to merge to `main`.
