export default function CodeText({ children, color = "black" }) {
  return (
    <span className="code-text" style={{ color }}>
      <span>{children}</span>
    </span>
  );
}
