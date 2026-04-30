import { Link } from "react-router-dom";

/**
 * Simple fallback page for unknown routes.
 * @returns {React.ReactElement}
 */
export default function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>Page not found</h1>
      <p>The route you requested does not exist.</p>
      <p>
        <Link to="/">Back to the home page</Link>
      </p>
    </main>
  );
}