---
name: "ntacv.github.io Project Workspace Instructions"
description: "Context for ntacv portfolio React app: Vite setup, component patterns, animation hooks, API safety. Follow project structure, consult todo.md for current work items, and report progress via todo list updates."
---

# ntacv.github.io Workspace Instructions

## Project Overview

**ntacv.github.io** is a React portfolio app migrated from CDN-based HTML/JSX to npm + Vite.

- **Version**: v0.3.0 (React+Vite migration)
- **Current branch**: `feat/react-migration` (active dev branch)
- **Default branch**: `main`
- **Tech Stack**: React 18, Vite, react-icons
- **Node requirement**: 20+, npm 10+

## Project Structure

```
src/
  ├── App.jsx                    # Main page composition
  ├── main.jsx                   # Vite entry point
  ├── components/                # Reusable UI components
  │   ├── CardContainer.jsx
  │   ├── CardItem.jsx
  │   ├── CodeText.jsx
  │   ├── LangPercent.jsx
  │   ├── Mosaic.jsx
  │   ├── ProjectDataList.jsx
  │   └── SocialLinks.jsx
  ├── hooks/                     # React hooks for behavior
  │   └── useScrollAnimation.js  # Scroll-triggered parallax animations
  ├── data/                      # Static data constants
  │   └── content.js             # Cards, languages, socials, hobbies
  └── styles/
      └── app.css                # All consolidated styles
public/
  ├── assets/                    # Images, formulas, photo mosaic
  └── pages/cv/                  # Static CV page (legacy)
```

## Key Rules

### 1. Component Development

- **File naming**: PascalCase for React components (`CardItem.jsx`), camelCase for hooks/utils (`useScrollAnimation.js`).
- **Exports**: Default exports for components.
- **Props**: All components accept optional `children` where appropriate; use object destructuring.
- **See skill** `.github/skills/react-components/SKILL.md` for detailed component patterns and best practices.

### 2. Animations & Scroll Behavior

- Scroll animations use the `useScrollAnimation` custom hook in `src/hooks/useScrollAnimation.js`.
- Hook manages formula SVG parallax, toggle state, and mobile animations.
- See skill `.github/skills/scroll-animations/SKILL.md` for animation tuning and event handling patterns.

### 3. API & Environment Safety

- **Google Sheets API key** is accessed via `import.meta.env.VITE_GOOGLE_SHEETS_API_KEY`.
- Never hardcode keys in source code.
- Copy `.env.example` to `.env` locally; add your actual key (not committed).
- If the key is missing, `ProjectDataList.jsx` gracefully shows a non-blocking message.
- Home section visibility is driven by the Google Sheets `toggles` tab (`A:B`), with supported keys: `projects`, `animation`, `intro`, `links`, `languages`, `live`, `hobbies`, `photos`.
- Toggle values are considered enabled for `true`, `1`, `yes`, `on` (case-insensitive); missing rows default to visible.

### 4. Styling

- All CSS is consolidated in `src/styles/app.css`.
- Use CSS custom properties (`:root` for colors, sizes, fonts).
- Responsive breakpoints: `@media screen and (max-width: 800px)`.
- Mobile-first approach; desktop overrides in media queries.

### 5. Static Assets & Legacy Pages

- Static files are served from `public/`. Image references use `/assets/...` paths.
- CV page is at `public/pages/cv/index.html`; link is `/pages/cv/`.
- Old legacy scripts (`scripts/index.js`, `scripts/data.js`, `scripts/animation.js`, `style.css`, `style-formula.css`) remain for reference but are not used by the app.

## Workflow

### Running the App

```bash
# Development
npm install     # First time only
npm run dev     # Starts Vite dev server at http://127.0.0.1:5173

# Production build
npm run build   # Creates dist/ folder
npm run preview # Preview production build locally
```

### Making Changes

1. **Check todo list**: See `todo.md` for current priorities and ongoing work.
2. **Create a branch** from `feat/react-migration` (or `main` if starting new work).
3. **Update components** in `src/components/`.
4. **Update styles** in `src/styles/app.css`.
5. **Test locally**: `npm run dev`.
6. **Build check**: `npm run build` (must succeed cleanly).
7. **Update todo**: Mark completed items in `todo.md` and report progress in PR.

### Adding New Components

- Place in `src/components/`.
- Export as default.
- Accept props with object destructuring.
- Use JSDoc for type hints (see existing components).
- Add import/export to `src/App.jsx` if top-level; use lazy loading for route-based components if expanded.

### Git Workflow

- Current development branch: `feat/react-migration`.
- When ready for review: Create PR to `main` with summary of changes.
- `.gitignore` excludes `node_modules/`, `dist/`, `.env`.

## Technologies

- **Vite**: Fast build tool and dev server.
- **React 18**: UI library (functional components, hooks).
- **react-icons**: Icon library (FaBook, FaGithub, etc. from Font Awesome).
- **Google Sheets API**: Optional live project data loading (requires API key).

## Important Notes

- **Build succeeds**: The app compiles to ~162 KB JS + 4.7 KB CSS (unminified), ~53 KB + 1.6 KB gzipped.
- **No TypeScript**: Currently JSDoc-typed for gradual migration path. Add tsconfig.json + .ts extensions if full TS is desired.
- **Legacy support**: Old files remain but are not executed. Safe to delete after full migration validation.

## Common Tasks

| Task | How |
|------|-----|
| Add a new social link | Edit `src/data/content.js` SOCIAL_LINKS array. |
| Add a new project card | Edit `src/data/content.js` PROJECT_CARDS array. |
| Change animations | Edit `src/hooks/useScrollAnimation.js` or `src/styles/app.css` timing/easing. |
| Add new env var | Add to `.env.example`, then use `import.meta.env.VITE_*` in code. |
| Update styles globally | Edit `src/styles/app.css` (CSS variables in `:root` apply everywhere). |

## Resources

- **Vite docs**: https://vitejs.dev/
- **React docs**: https://react.dev/
- **Google Sheets API**: https://developers.google.com/sheets/api

---

**Last updated**: April 22, 2026  
**See also**: `todo.md`, `.github/skills/` for domain-specific guidance.
