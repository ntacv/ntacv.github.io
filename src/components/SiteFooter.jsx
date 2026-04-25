/**
 * Global website footer.
 * @returns {React.ReactElement}
 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return <footer className="site-footer">© {year} — made by human</footer>;
}
