import { useState } from "react";
//import { sculptureList } from "./data.js";

// 1. Recibimos "sculptures" desde App.jsx mediante desestructuración de props
export default function SculpturesPage({ sculptures }) {
  const [index, setIndex] = useState(0);

    // 2. Guardia de seguridad: si la lista está vacía (ej. borraron todas en Remove), evitamos que la app falle
    if (!sculptures || sculptures.length === 0) {
        return (
            <>
                <h2>Sculptures Gallery</h2>
                <p>No sculptures available in the gallery.</p>
            </>
        );
    }

  /*
  function handleClick() {
    setIndex(index + 1);
  }
   */

    // Aseguramos que el índice sea válido si se eliminó el último elemento
    const safeIndex = index >= sculptures.length ? 0 : index;

    function handleClick() {
        if (safeIndex < sculptures.length - 1) {
            setIndex(safeIndex + 1);
        } else {
            setIndex(0);
        }
    }

  //let sculpture = sculptureList[index];
    let sculpture = sculptures[safeIndex];

  return (
    <>
      <h2>Sculpures Gallery</h2>
      <button onClick={handleClick}>Next</button>({index + 1} of{" "}
      {sculptures.length})
      <h2>
        <i>{sculpture.name} </i>
        by {sculpture.artist}
      </h2>
      <p>{sculpture.year}</p>
      <img src={sculpture.url} alt={sculpture.alt} />
      <p>{sculpture.description}</p>
    </>
  );
}
