import { useState } from "react";
import { useOutletContext } from "react-router-dom";

const BACKGROUNDS = [
    { label: "Default", value: "transparent" },
    { label: "Sand", value: "rgba(255, 196, 87, 0.16)" },
    { label: "Sky", value: "rgba(87, 168, 255, 0.16)" },
    { label: "Mint", value: "rgba(72, 199, 142, 0.16)" },
    { label: "Lilac", value: "rgba(178, 132, 255, 0.16)" },
];

const DESCRIPTION_LIMIT = 180;

export default function SculpturesPage({ caption = "Sculptures Gallery" }) {
    const { sculptures } = useOutletContext();

    const [index, setIndex] = useState(0);
    const [likes, setLikes] = useState({});
    const [loop, setLoop] = useState(false);
    const [backgroundIndex, setBackgroundIndex] = useState(0);
    const [animate, setAnimate] = useState(false);
    // Guardamos el id expandido: al cambiar de escultura vuelve a la versión corta.
    const [expandedId, setExpandedId] = useState(null);

    // Si se borra el último elemento, el índice puede quedar fuera de rango.
    const safeIndex =
        sculptures && sculptures.length > 0
            ? index >= sculptures.length
                ? 0
                : index
            : 0;

    const sculpture = sculptures?.[safeIndex];
    const expanded = expandedId === sculpture?.id;

    if (!sculptures || sculptures.length === 0) {
        return (
            <section className="page">
                <p className="eyebrow">Gallery</p>
                <h2>{caption}</h2>
                <p className="page-lead">
                    No sculptures available in the gallery.
                </p>
            </section>
        );
    }

    const isFirst = safeIndex === 0;
    const isLast = safeIndex === sculptures.length - 1;

    function handleNext() {
        if (isLast) {
            if (loop) setIndex(0);
            return;
        }
        setIndex(safeIndex + 1);
    }

    function handlePrevious() {
        if (isFirst) {
            if (loop) setIndex(sculptures.length - 1);
            return;
        }
        setIndex(safeIndex - 1);
    }

    function handleLike() {
        setLikes((current) => ({
            ...current,
            [sculpture.id]: !current[sculpture.id],
        }));
    }

    function changeBackground() {
        setBackgroundIndex(
            (current) => (current + 1) % BACKGROUNDS.length
        );
    }

    const isLiked = Boolean(likes[sculpture.id]);
    const description = sculpture.description ?? "";
    const needsToggle = description.length > DESCRIPTION_LIMIT;
    const visibleDescription =
        expanded || !needsToggle
            ? description
            : `${description.slice(0, DESCRIPTION_LIMIT).trimEnd()}…`;

    return (
        <section className="page">
            <p className="eyebrow">Gallery</p>
            <h2>{caption}</h2>
            <p className="page-lead">
                Use Previous/Next, jump with a thumbnail, or turn on Loop to
                wrap around.
            </p>

            <div
                className="gallery-panel"
                style={{ backgroundColor: BACKGROUNDS[backgroundIndex].value }}
            >
                <div className="gallery-controls">
                    <button
                        className="button-ghost"
                        type="button"
                        onClick={handlePrevious}
                        disabled={!loop && isFirst}
                    >
                        Previous
                    </button>
                    <button
                        className="button-ghost"
                        type="button"
                        onClick={handleNext}
                        disabled={!loop && isLast}
                    >
                        Next
                    </button>

                    <label className="check-control">
                        <input
                            type="checkbox"
                            checked={loop}
                            onChange={(event) => setLoop(event.target.checked)}
                        />
                        Loop
                    </label>
                </div>

                <p className="gallery-counter">
                    ({safeIndex + 1} of {sculptures.length})
                </p>

                <div className="gallery-thumbs">
                    {sculptures.map((item, itemIndex) => (
                        <button
                            key={item.id}
                            type="button"
                            onClick={() => setIndex(itemIndex)}
                            aria-current={itemIndex === safeIndex}
                            title={item.name}
                        >
                            <img src={item.url} alt={item.alt ?? ""} />
                        </button>
                    ))}
                </div>

                <h3>
                    <i>{sculpture.name}</i> by {sculpture.artist}
                </h3>

                {sculpture.year !== "" && sculpture.year != null && (
                    <p className="gallery-year">{sculpture.year}</p>
                )}

                <img
                    key={sculpture.id}
                    className={
                        animate
                            ? "gallery-image gallery-image--animated"
                            : "gallery-image"
                    }
                    src={sculpture.url}
                    alt={sculpture.alt ?? ""}
                />

                <div className="gallery-controls">
                    <button
                        className="button-ghost"
                        type="button"
                        onClick={handleLike}
                    >
                        {isLiked ? "Unlike" : "Like"}
                    </button>

                    <label className="check-control">
                        <input
                            type="checkbox"
                            checked={animate}
                            onChange={(event) =>
                                setAnimate(event.target.checked)
                            }
                        />
                        Animate image
                    </label>

                    <button
                        className="button-ghost"
                        type="button"
                        onClick={changeBackground}
                    >
                        Background: {BACKGROUNDS[backgroundIndex].label}
                    </button>
                </div>

                <p className="gallery-like-state" aria-live="polite">
                    {isLiked ? (
                        <strong>You like this sculpture</strong>
                    ) : (
                        "Not liked yet"
                    )}
                </p>

                <p className="gallery-description">{visibleDescription}</p>

                {needsToggle && (
                    <button
                        className="button-ghost"
                        type="button"
                        onClick={() =>
                            setExpandedId((current) =>
                                current === sculpture.id ? null : sculpture.id
                            )
                        }
                    >
                        {expanded ? "Show less" : "Show more"}
                    </button>
                )}
            </div>
        </section>
    );
}
