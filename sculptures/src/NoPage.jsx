import { Link } from "react-router-dom";

export default function NoPage() {
    return (
        <section className="page">
            <p className="eyebrow">404</p>
            <h2>Page not found</h2>
            <p className="page-lead">
                The page you are looking for does not exist.
            </p>
            <Link className="button-ghost" to="/">
                Back to the catalogue
            </Link>
        </section>
    );
}
