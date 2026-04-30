/**
 * Convert a color (hex or CSS color name) to rgba format with opacity.
 * @param {string} color - Hex color or CSS color name
 * @param {number} alpha - Opacity value 0-1
 * @returns {string} rgba() color string
 */
function colorToRgba(color, alpha = 1) {
  const trimmed = String(color).trim();

  // If it's already a hex color, convert to rgba
  if (trimmed.startsWith("#")) {
    const value = trimmed.replace("#", "");
    const normalized = value.length === 3
      ? value
          .split("")
          .map((char) => char + char)
          .join("")
      : value;

    const int = Number.parseInt(normalized, 16);
    const r = (int >> 16) & 255;
    const g = (int >> 8) & 255;
    const b = int & 255;

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // For CSS color names, use a temporary canvas to get RGB values
  try {
    const ctx = document.createElement("canvas").getContext("2d");
    if (!ctx) return `rgba(52, 152, 219, ${alpha})`; // Fallback blue

    ctx.fillStyle = trimmed;
    ctx.fillRect(0, 0, 1, 1);
    const imageData = ctx.getImageData(0, 0, 1, 1);
    const [r, g, b] = imageData.data;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  } catch {
    // Fallback to default blue if color name is invalid
    return `rgba(52, 152, 219, ${alpha})`;
  }
}

export default function LangPercent({ color = "#3498DB", percent = 50, children }) {
  return (
    <div className="lang-percent" style={{ background: colorToRgba(color, 0.7) }}>
      <div className="back-percent" style={{ width: `${percent}%`, background: colorToRgba(color, 1) }} />
      <p>{children}</p>
    </div>
  );
}
