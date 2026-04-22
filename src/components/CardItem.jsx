export default function CardItem({ href, src, children }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="card-item-link">
      <article className="card-item">
        <img src={src ? `/assets/images/${src}` : "/assets/images/formula1.webp"} alt="Card visual" />
        <div className="card-content">{children || "Card"}</div>
      </article>
    </a>
  );
}
