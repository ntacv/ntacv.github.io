---
name: "React Components Instructions"
applyTo: "src/components/**/*.jsx"
description: "Apply to all React components in src/components/. Ensures consistent naming, props patterns, JSDoc typing, and integration with the component library."
---

# File Instructions: React Components

All React components in `src/components/` follow these conventions:

## Naming & Exports

- **PascalCase filenames**: `CardItem.jsx`, not `card-item.jsx`
- **Default exports only**: No named exports from component files
- **One component per file**: Unless tightly paired (e.g., wrapper + content)

## Props & Types

- **Object destructuring**: Never use `props.x` inside component
- **JSDoc for types**: Add `@typedef` and `@param` above every component
- **All props documented**: Even optional props with defaults

```jsx
/**
 * @typedef {Object} MyComponentProps
 * @property {string} title
 * @property {string} [subtitle] - optional
 */

export default function MyComponent({ title, subtitle = "" }) { ... }
```

## Children & Content

- Use `children` prop for inner content
- Always include `{children || "default"}` or `{children}` if required
- Spread unused props only if intentional: `<div {...props}>`

## External Links

Always add accessibility and security attributes:

```jsx
<a href={url} target="_blank" rel="noreferrer" aria-label="description">
  Link text
</a>
```

## Inline Styling

**Avoid `style={}` prop.** Use only CSS classes from `src/styles/app.css`:

```jsx
// ✅ Good
<div className="card-item">

// ❌ Avoid
<div style={{ padding: "10px", background: "#fff" }}>
```

## Imports

- Import React at top (required for JSX)
- Group imports: React first, then libraries, then local imports
- Use relative paths: `../data/content.js`, not `src/data/content.js`

```jsx
import React from "react";
import { useState } from "react";
// or destructure: no need to import React separately in React 17+
```

## Testing

*Future requirement (v0.4.0)*: Each component will have a corresponding `__tests__/ComponentName.test.jsx`.

---

See also: `.github/skills/react-components/SKILL.md`, `.github/copilot-instructions.md`
