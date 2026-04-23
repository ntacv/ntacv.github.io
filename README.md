# ntacv.github.io

React portfolio project migrated from CDN-based HTML/JSX to an npm + Vite React setup.

## Requirements

- Node.js 20+
- npm 10+

## Setup

```bash
npm install
```

## Run (development)

```bash
npm run dev
```

Default URL:

- http://localhost:5173

## Build

```bash
npm run build
```

Build output folder:

- dist/

## Preview Production Build

```bash
npm run preview
```

## Environment Variables

Create a `.env` file from `.env.example`.

Available variables:

- VITE_GOOGLE_SHEETS_API_KEY: optional key for loading Google Sheets API project data.

If the variable is missing, the app stays functional and shows a non-blocking message in the project data section.

### Configure Google Sheets API Key

To enable live project data loading, generate an API key:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable the **Google Sheets API**:
   - In the left menu, go to **APIs & Services** > **Library**
   - Search for "Sheets API"
   - Click the result and press **Enable**
4. Create an API key:
   - Go to **APIs & Services** > **Credentials**
   - Click **Create Credentials** > **API Key**
   - Copy the generated key
5. Add to `.env`:
   ```
   VITE_GOOGLE_SHEETS_API_KEY=your_api_key_here
   ```
6. Restart the dev server (`npm run dev`)

**Security**: Never commit `.env` to version control. The file is excluded in `.gitignore`.

Check out bitwarden connection

## Project Structure

- src/App.jsx: main page composition.
- src/components/: reusable UI components.
- src/hooks/useScrollAnimation.js: scroll-based animation behavior.
- src/data/content.js: static site content arrays.
- src/styles/app.css: consolidated styles.
- public/assets/: static images and formula assets.
- public/pages/cv/: static CV page.

## AI Context & Documentation

This project includes structured AI guidance:

- **`.github/copilot-instructions.md`**: Workspace-wide project context, structure, and workflow rules
- **`todo.md`**: Tracked tasks, priorities, and progress status
- **`.github/skills/`**: Domain-specific guidance for React components and scroll animations
- **`.github/instructions/`**: File-level conventions for components, data, and builds

Use these when working with AI assistants or planning contributions.

## Notes

- Old CDN/legacy files are still present for reference, but the app now runs through Vite entrypoints (index.html + src/main.jsx).
- Do not commit real API keys in source control.
- See `todo.md` for current tasks and priorities.
