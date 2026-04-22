---
name: "React Components Pattern Skill"
description: "Use when: creating new React components, adding props to existing components, organizing component exports, or optimizing component structure. Covers naming, props patterns, JSDoc typing, and integration with App.jsx."
---

# React Components Skill

## Component Structure

### Naming Conventions

- **Component files**: PascalCase (`CardItem.jsx`, `SocialLinks.jsx`)
- **Props objects**: Use destructuring in function signature
- **Default exports**: Always export the component as default

### Template

```jsx
/**
 * @typedef {Object} ComponentProps
 * @property {string} [href]
 * @property {string} [className]
 * @property {React.ReactNode} children
 */

/**
 * Brief description of component purpose.
 * @param {ComponentProps} props
 * @returns {React.ReactElement}
 */
export default function ComponentName({ href, className, children }) {
  return (
    <div className={className}>
      {children}
    </div>
  );
}
```

## Props Best Practices

1. **Destructure in function parameters** — Never use `props.x`.
2. **Provide defaults** — Use object defaults or defaultProps.
3. **Document with JSDoc** — Include `@typedef` and `@param`.
4. **Keep props focused** — Max 5-7 props; consider composition if growing.
5. **Use `children`** — Pass inner content as `children` prop.

## Integration

- **Register in App.jsx**: Import and use at top level or within sections.
- **Lazy load optional**: For large components, use `React.lazy()` + `Suspense`.
- **Pass data down**: Data flows from `src/data/content.js` or via hooks.

## Style and ClassName

- **CSS classes**: Use kebab-case (`card-item`, `social-links`).
- **All styles in app.css**: No inline `<style>` tags.
- **Conditional classes**: Use template literals or classnames library if complex.

```jsx
// ✅ Good
className="card-item"

// ❌ Avoid
style={{ color: "#fff", padding: "10px" }}
```

## Example: Adding a New Component

1. **Create file** in `src/components/FeatureName.jsx`
2. **Define props** with JSDoc typedef
3. **Import dependencies** (React, hooks, data as needed)
4. **Implement component** with clear JSX structure
5. **Export as default**
6. **Import and use in App.jsx** (or parent component)

```jsx
// src/components/Badge.jsx
/**
 * @param {Object} props
 * @param {string} props.label
 * @param {string} [props.color="blue"]
 * @returns {React.ReactElement}
 */
export default function Badge({ label, color = "blue" }) {
  return (
    <span className={`badge badge-${color}`}>
      {label}
    </span>
  );
}
```

## State & Hooks

- **Local state**: Use `useState` for component-level state.
- **Effects**: Use `useEffect` for side effects (fetching, DOM manipulation).
- **Custom hooks**: Create in `src/hooks/` if reusable across multiple components.
- **No Redux/Context yet**: Keep it simple; add if state grows.

## Common Patterns

### Conditional Rendering

```jsx
{condition && <Component />}
{isLoading ? <Loader /> : <Content />}
{items.length > 0 ? <List items={items} /> : <Empty />}
```

### Mapping Lists

```jsx
{ITEMS.map((item) => (
  <ItemComponent key={item.id} {...item} />
))}
```

### External Links

Always add `target="_blank" rel="noreferrer"`:

```jsx
<a href={url} target="_blank" rel="noreferrer">
  Link
</a>
```

## Type Hints

Use JSDoc `@typedef` and `@param` for all components:

```jsx
/**
 * @typedef {Object} CardProps
 * @property {string} title
 * @property {string} [description]
 * @property {string} [imageUrl]
 */

/**
 * Card component.
 * @param {CardProps} props
 */
export default function Card({ title, description, imageUrl }) { ... }
```

## Testing (Future)

- Jest setup coming in v0.4.0
- Test file: `src/components/__tests__/ComponentName.test.jsx`
- Snapshot + behavior tests for critical components

---

See also: `src/components/`, `copilot-instructions.md`
