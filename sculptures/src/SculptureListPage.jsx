import { useState } from "react";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import ConfirmDialog from "./components/ConfirmDialog.jsx";

function normalize(value) {
    return String(value ?? "")
        .toLocaleLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

export default function SculptureListPage() {
    const { sculptures, deleteSculpture } = useOutletContext();
    const [searchParams, setSearchParams] = useSearchParams();
    const [pendingDelete, setPendingDelete] = useState(null);

    // El filtro vive en la URL: /?artist=hepworth
    const artistFilter = searchParams.get("artist") ?? "";
    const trimmedFilter = artistFilter.trim();
    const hasFilter = trimmedFilter.length > 0;

    const visibleSculptures = hasFilter
        ? sculptures.filter((sculpture) =>
              normalize(sculpture.artist).includes(normalize(trimmedFilter))
          )
        : sculptures;

    function updateFilter(value) {
        const next = new URLSearchParams(searchParams);
        if (value.trim()) {
            next.set("artist", value);
        } else {
            next.delete("artist");
        }
        setSearchParams(next, { replace: true });
    }

    function clearFilter() {
        const next = new URLSearchParams(searchParams);
        next.delete("artist");
        setSearchParams(next, { replace: true });
    }

    function confirmDelete() {
        if (!pendingDelete) return;
        deleteSculpture(pendingDelete.id);
        setPendingDelete(null);
    }

    return (
        <section className="page">
            <p className="eyebrow">Catalogue</p>
            <h2>Sculptures</h2>
            <p className="page-lead">
                Browse the catalogue, view a sculpture, edit it or remove it.
            </p>

            <div className="catalogue-toolbar">
                <div className="filter-field">
                    <label className="form-label" htmlFor="artist-filter">
                        Filter by artist
                    </label>
                    <input
                        className="form-input"
                        id="artist-filter"
                        type="search"
                        value={artistFilter}
                        onChange={(event) => updateFilter(event.target.value)}
                        placeholder="e.g. Hepworth"
                        autoComplete="off"
                    />
                </div>

                {hasFilter && (
                    <button
                        className="button-ghost"
                        type="button"
                        onClick={clearFilter}
                    >
                        Clear filter
                    </button>
                )}
            </div>

            {hasFilter && (
                <p className="filter-summary" role="status">
                    Showing {visibleSculptures.length} of {sculptures.length}{" "}
                    {sculptures.length === 1 ? "sculpture" : "sculptures"}{" "}
                    matching “{trimmedFilter}”.
                </p>
            )}

            {!hasFilter && sculptures.length > 0 && (
                <p className="filter-summary" role="status">
                    {sculptures.length}{" "}
                    {sculptures.length === 1 ? "sculpture" : "sculptures"} in
                    the catalogue.
                </p>
            )}

            {sculptures.length === 0 && (
                <div className="empty-card">
                    <span className="empty-icon" aria-hidden="true">
                        🗿
                    </span>
                    <p className="page-lead">
                        The catalogue is empty. Add the first sculpture.
                    </p>
                    <Link className="button-primary" to="/sculptures/new">
                        Add sculpture
                    </Link>
                </div>
            )}

            {sculptures.length > 0 && visibleSculptures.length === 0 && (
                <div className="empty-card">
                    <span className="empty-icon" aria-hidden="true">
                        🔍
                    </span>
                    <p className="page-lead">
                        No sculptures match “{trimmedFilter}”.
                    </p>
                    <button
                        className="button-ghost"
                        type="button"
                        onClick={clearFilter}
                    >
                        Clear filter
                    </button>
                </div>
            )}

            {visibleSculptures.length > 0 && (
                <div className="catalogue-grid">
                    {visibleSculptures.map((sculpture) => (
                        <article className="sculpture-card" key={sculpture.id}>
                            <img
                                src={sculpture.url}
                                alt={sculpture.alt ?? ""}
                                loading="lazy"
                            />
                            <h2>{sculpture.name}</h2>
                            <p className="card-artist">{sculpture.artist}</p>
                            {sculpture.year !== "" &&
                                sculpture.year != null && (
                                    <p className="card-year">
                                        {sculpture.year}
                                    </p>
                                )}
                            {sculpture.location && (
                                <p className="card-location">
                                    {sculpture.location}
                                </p>
                            )}

                            <div className="card-actions">
                                <Link
                                    className="button-ghost"
                                    to={`/sculptures/${sculpture.id}`}
                                >
                                    View
                                </Link>
                                <Link
                                    className="button-ghost"
                                    to={`/sculptures/${sculpture.id}/edit`}
                                >
                                    Edit
                                </Link>
                                <button
                                    className="button-danger"
                                    type="button"
                                    onClick={() =>
                                        setPendingDelete(sculpture)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <ConfirmDialog
                open={Boolean(pendingDelete)}
                title="Delete sculpture?"
                description={
                    pendingDelete
                        ? `“${pendingDelete.name}” by ${pendingDelete.artist} will be removed from the catalogue. This cannot be undone.`
                        : ""
                }
                confirmLabel="Delete"
                onConfirm={confirmDelete}
                onCancel={() => setPendingDelete(null)}
            />
        </section>
    );
}
