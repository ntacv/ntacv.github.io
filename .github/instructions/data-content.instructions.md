---
name: "Data & Content Instructions"
applyTo: "src/data/**"
description: "Apply to data and content files. Ensures consistent data structure, typing, and integration with components. Use when adding new content arrays or modifying existing data."
---

# File Instructions: Data & Content

All data files in `src/data/` follow these patterns:

## Structure

- **Constant arrays**: Each content group is an exported array
- **Object properties**: Use camelCase for all keys
- **URLs and links**: Use full URLs (http/https); relative paths are resolved by components at render time

## Content Arrays

### SOCIAL_LINKS

```javascript
export const SOCIAL_LINKS = [
  { icon: "globe", href: "https://...", label: "Website" },
  { icon: "github", href: "https://...", label: "GitHub" },
];
```

**Properties:**
- `icon`: Font Awesome icon name (without `Fa` prefix, e.g., "github", not "FaGithub")
- `href`: Full URL
- `label`: Display name for accessibility

### LANGUAGES

```javascript
export const LANGUAGES = [
  { color: "#e65127", percent: 90, text: "HTML experience" },
];
```

**Properties:**
- `color`: Hex color code for progress bar
- `percent`: 0–100 skill level
- `text`: Skill description (can include HTML entities like `&lt;html&gt;`)

### PROJECT_CARDS & HOBBY_CARDS

```javascript
export const PROJECT_CARDS = [
  { src: "thumbnail.png", href: "https://...", text: "Project name" },
];
```

**Properties:**
- `src`: Image filename in `public/assets/images/`
- `href`: Project URL or "#" for inactive links
- `text`: Card display text

## Typing

Use JSDoc for all exported data:

```javascript
/**
 * @typedef {Object} SocialLink
 * @property {string} icon
 * @property {string} href
 * @property {string} label
 */

/** @type {SocialLink[]} */
export const SOCIAL_LINKS = [ ... ];
```

## Adding New Content

1. **Define structure**: Add `@typedef` for the new data type
2. **Create array**: Export with `/** @type {...[]} */`
3. **Use in component**: Import in `src/App.jsx` or component
4. **Map and render**: Use `.map()` to render items

```javascript
// In src/data/content.js
/**
 * @typedef {Object} BlogPost
 * @property {string} title
 * @property {string} date
 * @property {string} url
 */

/** @type {BlogPost[]} */
export const BLOG_POSTS = [
  { title: "...", date: "2026-04-22", url: "..." },
];

// In component
import { BLOG_POSTS } from "../data/content";

{BLOG_POSTS.map((post) => (
  <a key={post.url} href={post.url}>
    {post.title}
  </a>
))}
```

## Static vs. Dynamic

- **Static data**: Commits to `src/data/content.js` (no reload required)
- **Dynamic data**: From Google Sheets API (loaded via `ProjectDataList.jsx`)

Do not hardcode dynamic data; use API or environment variables.

---

See also: `src/data/content.js`, `.github/copilot-instructions.md`
