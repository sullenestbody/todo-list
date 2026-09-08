import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main>
      <h2>404: Page Not Found</h2>
      <p>The page you requested does not exist.</p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
      <p>
        <Link to="/about">About This App</Link>
      </p>
    </main>
  );
}

export default NotFoundPage;