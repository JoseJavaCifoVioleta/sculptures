import { useState } from "react";

// 1. Recibimos "sculptures" desde App.jsx mediante desestructuración de props
export default function SculpturesPage({ sculptures }) {
  const [index, setIndex] = useState(0);
  const [likes, setLikes] = useState({});

  // 2. Guardia de seguridad: si la lista está vacía (ej. borraron todas en Remove), evitamos que la app falle
  if (!sculptures || sculptures.length === 0) {
    return (
      <>
        <h2>Sculptures Gallery</h2>
        <p>No sculptures available in the gallery.</p>
      </>
    );
  }

  // Aseguramos que el índice sea válido si se eliminó el último elemento
  const safeIndex = index >= sculptures.length ? 0 : index;
  const sculpture = sculptures[safeIndex];

  function handleClick() {
    if (safeIndex < sculptures.length - 1) {
      setIndex(safeIndex + 1);
    }
  }

  function handlePrevious() {
    if (safeIndex > 0) {
      setIndex(safeIndex - 1);
    }
  }

  function handleLike() {
    setLikes({ ...likes, [safeIndex]: !likes[safeIndex] });
  }

  const isLiked = likes[safeIndex] === true;
  const isFirst = safeIndex === 0;
  const isLast = safeIndex === sculptures.length - 1;

  return (
    <>
      <h2>Sculpures Gallery</h2>
      <button onClick={handlePrevious} disabled={isFirst}>
        Previous
      </button>{" "}
      <button onClick={handleClick} disabled={isLast}>
        Next
      </button>
      <p>
        ({safeIndex + 1} of {sculptures.length})
      </p>
      <div>
        {sculptures.map((scul, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-current={i === safeIndex}
            title={scul.name}
          >
            <img src={scul.url} alt={scul.alt} />
          </button>
        ))}
      </div>
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <p>{sculpture.year}</p>
      <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
      <p>{isLiked ? <strong>You like this sculpture</strong> : "Not liked yet"}</p>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
