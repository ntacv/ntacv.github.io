export default function CardContainer({ children, className = "" }) {
  return <div className={`container-flex ${className}`.trim()}>{children}</div>;
}
