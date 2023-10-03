import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="error">
      <p>404 ERROR</p>
      <h2>Page not Found</h2>
      <p>We can't find what you're looking for, but the link below may get you back on track.</p>

      <p>
        Got to the{" "}
        <Link to="/" className="link">
          Homepage
        </Link>
      </p>
    </div>
  );
}
