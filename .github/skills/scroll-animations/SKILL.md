---
name: "Scroll Animations Skill"
description: "Use when: debugging animation behavior, tuning parallax values, adding new animated elements, or adjusting animation timing/easing. Covers the useScrollAnimation hook, formula SVG parallax, mobile animations, and animation state management."
---

# Scroll Animations Skill

## Overview

The `useScrollAnimation` hook in `src/hooks/useScrollAnimation.js` manages all scroll-triggered animations:

1. **Parallax formula SVGs** — Five SVG formula layers translate and scale based on scroll position.
2. **Toggle state** — Animation enable/disable checkbox.
3. **Start from zero** — Animation reset toggle for testing (dev feature).
4. **Mobile sliding blocks** — Secondary animation for mobile viewports.

## Hook API

### `useScrollAnimation(animationEnabled, startFromZero)`

**Parameters:**
- `animationEnabled` (boolean): Whether animations are active
- `startFromZero` (boolean): Reset animation scale to 0 at scroll=0

**Side effects:**
- Attaches scroll event listener with `passive: true`
- Queries DOM for animation elements
- Updates CSS transforms on every scroll event
- Cleans up listener on unmount

### Usage in App.jsx

```jsx
export default function App() {
  const [animationEnabled, setAnimationEnabled] = useState(true);
  const [startFromZero, setStartFromZero] = useState(false);

  useScrollAnimation(animationEnabled, startFromZero);

  return (
    <>
      {/* Animation container */}
      <ZoomAnimation />
      
      {/* Toggle controls */}
      <input
        type="checkbox"
        checked={animationEnabled}
        onChange={(e) => setAnimationEnabled(e.target.checked)}
      />
    </>
  );
}
```

## Animation Mechanics

### Parallax Calculation

The `animateRatio()` function computes transform values:

```javascript
function animateRatio(toTop, toScale = 1, toX = 0, toY = 0, startFromZero = false) {
  let scale = startFromZero ? 0 : 1;
  scale += 0.002 * toScale * toTop;  // Growth rate: 0.002
  
  const left = toX * 0.2 * toTop;    // Horizontal offset
  const top = toY * 0.2 * toTop;     // Vertical offset
  
  return `scale(${scale}) translateX(${left}px) translateY(${top}px)`;
}
```

**Tuning parameters:**
- `0.002`: Growth rate — increase for faster scale-up
- `0.2`: Offset multiplier — increase for wider horizontal/vertical spread
- `toScale, toX, toY`: Per-element ratios (scale direction, horizontal bias, vertical bias)

### Formula Elements

Five SVG formulas are animated:

| Element | toScale | toX | toY | Initial position | Purpose |
|---------|---------|-----|-----|------------------|---------|
| `formula-ring` | 1 | 0 | 0 | Center ring | Central focus element |
| `formula-1` | 1 | -5 | -1 | Top-left | Upper-left parallax |
| `formula-2` | 1 | 4 | -1 | Top-right | Upper-right parallax |
| `formula-3` | 1 | 5 | 1 | Bottom-right | Lower-right parallax |
| `formula-4` | 1 | -2 | 1 | Bottom-left | Lower-left parallax |
| `formula-5` | 1 | -4 | 0 | Left-center | Left parallax |

### Hiding Behavior

When `scrollY > 1000px`, all formula elements hide (CSS `display: none`). Prevents visual clutter on long scroll.

```javascript
const shouldHide = toTop > 1000;
formulas.forEach((node) => {
  node.style.display = shouldHide ? "none" : "block";
});
```

## Mobile Animation

On mobile (viewport width < 1150px), the `formula-ring` is hidden via CSS media query.

Two sliding blocks animate instead:

```jsx
<div className="zoom-animation mobile-only">
  <div className="anim-bloc right" />
  <div className="anim-bloc left" />
</div>
```

**Behavior:**
- `.right`: Slides left based on scroll (left += 0.9 * scrollY)
- `.left`: Slides right (right += 0.9 * scrollY)
- Both have 0.1 opacity to avoid visual distraction

## Styling

All animation CSS in `src/styles/app.css`:

```css
.zoom-animation {
  display: none;  /* Hidden by default, shown when enabled */
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: all 0.2s ease;
}

.atom-background {
  position: absolute;
  width: 100%;
}

.formula-ring {
  /* Initial positioning */
}
```

## Performance Notes

- **Event listener**: `passive: true` flag prevents blocking during scroll.
- **No unnecessary DOM queries**: Elements are queried once per mount; filters handle null values.
- **No state updates in scroll handler**: Transforms updated via direct DOM manipulation (`node.style.*`).
- **Cleanup**: Event listener removed on unmount to prevent memory leaks.

## Debugging

### Check if animations are running

1. Open browser DevTools (F12)
2. Open Console
3. Type: `document.querySelector('.zoom-animation').style.display`
4. If `"block"`, animations are visible
5. Check toggle checkbox status to enable/disable

### Adjust animation speed

Edit `animateRatio()` in `src/hooks/useScrollAnimation.js`:

```javascript
// Faster: increase from 0.002 to 0.003
scale += 0.003 * toScale * toTop;

// Slower: decrease to 0.001
scale += 0.001 * toScale * toTop;
```

### Adjust parallax spread

Edit offset multiplier:

```javascript
// More spread: change from 0.2 to 0.3
const left = toX * 0.3 * toTop;
```

### Test with "Start from infinity" toggle

1. Check the "Start from infinity" checkbox in the UI
2. Scroll — animation should start at scale 0, not scale 1
3. Use for testing animation ramp-up behavior

## Adding New Animated Elements

To add a new parallax formula SVG:

1. **Place SVG in `public/assets/formula/`** (or reference existing image)
2. **Add to ZoomAnimation component** in `src/App.jsx`:
   ```jsx
   <img className="atom-background formula-6" src="/assets/..." alt="..." />
   ```
3. **Add CSS positioning** in `src/styles/app.css`:
   ```css
   .formula-6 {
     width: 500px;
     top: 150px;
     right: 100px;
   }
   ```
4. **Add to hook** in `src/hooks/useScrollAnimation.js`:
   ```javascript
   const formula6 = /** @type {HTMLElement | null} */ (
     document.querySelector(".formula-6")
   );
   const formulas = [..., formula6].filter((node) => node !== null);
   if (formula6) formula6.style.transform = animateRatio(toTop, 1, 3, -1, startFromZero);
   ```

## Future Enhancements

- [ ] Use requestAnimationFrame for smoother 60 FPS animation
- [ ] Add easing functions (ease-in-out, cubic-bezier)
- [ ] Add animation presets (slow, medium, fast)
- [ ] Add parallax depth/z-index staggering
- [ ] Consider GSAP library for advanced animation sequencing

---

See also: `src/hooks/useScrollAnimation.js`, `src/styles/app.css`, `copilot-instructions.md`
