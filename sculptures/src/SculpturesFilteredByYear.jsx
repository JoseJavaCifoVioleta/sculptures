import { useState } from "react";
//import { sculptureList } from "./data.js";

// 1. Recibimos la lista completa desde App.jsx mediante props
export default function SculpturesFilteredByYear({ sculptures }) {
    // 2. Solo necesitamos guardar en el estado lo que el usuario escribe en el input
    const [year, setYear] = useState("");

    // 3. Estado derivado: calculamos la lista filtrada directamente en cada renderizado
    // Si "year" está vacío, mostramos todas las esculturas; si tiene texto, filtramos
    const filteredSculptures = year
        ? sculptures.filter(
            (scul) => scul.year && scul.year.toString() === year
        )
        : sculptures;

    return (
        <>
            <h2>Filter Sculptures By Year</h2>
            <label>
                Year:
                <input
                    type="number"
                    value={year}
                    // Actualizamos el estado directamente en el evento onChange
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Enter year"
                />
            </label>

            <h4>Filtered Sculptures list:</h4>
            <ul>
                {filteredSculptures.length === 0 ? (
                    <li>No sculptures found for this year.</li>
                ) : (
                    filteredSculptures.map((scul, index) => (
                        <li key={index}>
                            {"#"}
                            {index + 1} {scul.name} by {scul.artist}, {scul.year}
                        </li>
                    ))
                )}
            </ul>
        </>
    );
}
