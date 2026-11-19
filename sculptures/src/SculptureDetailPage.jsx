import { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import ConfirmDialog from "./components/ConfirmDialog.jsx";

export default function SculptureDetailPage() {
    const { id } = useParams();
    const { sculptures, deleteSculpture } = useOutletContext();
    const navigate = useNavigate();
    const [confirmOpen, setConfirmOpen] = useState(false);

    const sculpture = sculptures.find(
        (item) => String(item.id) === String(id)
    );

    if (!sculpture) {
        return (
            <section className="page">
                <p className="eyebrow">Not found</p>
                <h2>Sculpture not found</h2>
                <p className="page-lead">
                    There is no sculpture with id {id} in the catalogue.
                </p>
                <Link className="button-ghost" to="/">
                    Back to the catalogue
                </Link>
            </section>
        );
    }

    function handleDelete() {
        deleteSculpture(sculpture.id);
        setConfirmOpen(false);
        navigate("/");
    }

    return (
        <section className="page">
            <p className="eyebrow">Sculpture</p>
            <h2>{sculpture.name}</h2>

            <div className="detail-layout">
                <div className="detail-media">
                    <img src={sculpture.url} alt={sculpture.alt ?? ""} />
                </div>

                <div className="detail-body">
                    <p className="page-lead">
                        {sculpture.description ?? ""}
                    </p>

                    <dl className="detail-meta">
                        <div>
                            <dt>Artist</dt>
                            <dd>{sculpture.artist}</dd>
                        </div>
                        {sculpture.year !== "" &&
                            sculpture.year != null && (
                                <div>
                                    <dt>Year</dt>
                                    <dd>{sculpture.year}</dd>
                                </div>
                            )}
                        {sculpture.location && (
                            <div>
                                <dt>Location</dt>
                                <dd>{sculpture.location}</dd>
                            </div>
                        )}
                    </dl>

                    <div className="detail-actions">
                        <Link className="button-ghost" to="/">
                            Back to the catalogue
                        </Link>
                        <Link
                            className="button-primary"
                            to={`/sculptures/${sculpture.id}/edit`}
                        >
                            Edit
                        </Link>
                        <button
                            className="button-danger"
                            type="button"
                            onClick={() => setConfirmOpen(true)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>

            <ConfirmDialog
                open={confirmOpen}
                title="Delete sculpture?"
                description={`“${sculpture.name}” by ${sculpture.artist} will be removed from the catalogue. This cannot be undone.`}
                confirmLabel="Delete"
                onConfirm={handleDelete}
                onCancel={() => setConfirmOpen(false)}
            />
        </section>
    );
}
