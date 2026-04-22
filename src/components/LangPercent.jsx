function hexToRgba(hex, alpha = 1) {
  const value = hex.replace("#", "");
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

export default function LangPercent({ color = "#3498DB", percent = 50, children }) {
  return (
    <div className="lang-percent" style={{ background: hexToRgba(color, 0.7) }}>
      <div className="back-percent" style={{ width: `${percent}%`, background: hexToRgba(color, 1) }} />
      <p>{children}</p>
    </div>
  );
}
