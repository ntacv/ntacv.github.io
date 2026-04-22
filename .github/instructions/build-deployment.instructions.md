---
name: "Build & Deployment Instructions"
applyTo: "package.json, vite.config.js, dist/**, public/**"
description: "Apply when: configuring build process, managing dependencies, preparing for deployment, or troubleshooting build errors. Covers Vite setup, asset handling, and production readiness."
---

# File Instructions: Build & Deployment

## Build Process

### Scripts

```bash
npm run dev      # Start Vite dev server (http://127.0.0.1:5173)
npm run build    # Create production bundle in dist/
npm run preview  # Preview production build locally
```

### Output

- **dist/**: Production-ready files
  - `index.html`: Injected with final bundle references
  - `assets/index-*.css`: Minified CSS (hashed for cache-busting)
  - `assets/index-*.js`: Minified JS bundle (hashed for cache-busting)

### Build Artifacts

- Size: ~162 KB unminified JS + 4.7 KB CSS
- Gzipped: ~53 KB JS + 1.6 KB CSS
- Build time: ~1-2 seconds

## Vite Configuration

### vite.config.js

```javascript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

**Plugins:**
- `@vitejs/plugin-react`: Enables JSX transformation and Fast Refresh

**Future options** (if needed):
- `base: "/ntacv.github.io/"` for GitHub Pages subpath deployment
- `build.outDir` for custom output directory

## Managing Dependencies

### Adding Packages

```bash
npm install package-name
```

**Current production deps:**
- `react@^18.3.1`
- `react-dom@^18.3.1`
- `react-icons@^5.5.0`

### Removing Unused Packages

Check for unused:

```bash
npm ls --depth=0
```

### Security Audits

```bash
npm audit        # Check for vulnerabilities
npm audit fix    # Auto-fix low/moderate issues
npm audit fix --force  # Fix all (may break compatibility)
```

## Asset Handling

### Public Assets

Files in `public/` are served as-is:

- `public/assets/`: Images, SVG formulas, photos
- `public/pages/cv/`: Static CV page
- URL reference: `/assets/...`, `/pages/cv/...`

### Imported Assets

Assets imported in JS are processed by Vite:

```javascript
import logo from "../assets/logo.svg";
```

### Image Optimization

*Not yet configured.* Future: add `vite-plugin-image` for auto-optimization.

## Environment Variables

### Configuration

`.env` file (never committed):

```
VITE_GOOGLE_SHEETS_API_KEY=your-actual-key-here
```

### Usage in Code

```javascript
const key = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
if (!key) {
  console.warn("API key not set");
}
```

### Build-Time Substitution

Vite replaces `import.meta.env.VITE_*` at build time. Non-existent vars are `undefined`.

## Deployment

### GitHub Pages

```bash
# Build
npm run build

# Push dist/ folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

### Vercel / Netlify

1. Connect repo
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Add environment variables (including VITE_GOOGLE_SHEETS_API_KEY)

### Environment Variables in CI/CD

Add as repository secrets:

- GitHub Actions: Settings > Secrets and variables > Actions
- Vercel/Netlify: Project settings > Environment variables

## Troubleshooting

### Build fails with "Module not found"

```bash
npm install  # Reinstall dependencies
npm run build
```

### Changes not reflected in build

```bash
rm -rf dist/
npm run build  # Clean rebuild
```

### Dev server won't start

```bash
# Kill lingering process
lsof -i :5173  # macOS/Linux
Get-Process -Name node | Stop-Process  # Windows

# Restart
npm run dev
```

### Bundle size too large

Check for large dependencies:

```bash
npm ls  # List tree
```

Consider:
- Tree-shaking unused imports
- Lazy-loading heavy components
- Code splitting for routes (future)

## Production Checklist

- [ ] `npm run build` succeeds
- [ ] No build warnings or errors
- [ ] `.env` is in `.gitignore`
- [ ] API keys are secrets, not in source
- [ ] Static assets load correctly in dist/
- [ ] No console errors in production build preview
- [ ] Lighthouse audit passed (if applicable)

---

See also: `vite.config.js`, `package.json`, `.env.example`, `.github/copilot-instructions.md`
