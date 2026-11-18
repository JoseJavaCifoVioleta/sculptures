//import { useState } from "react";
//import { sculptureList } from "./data.js";

// 1. Ya no necesitamos importar useState ni sculptureList
// Recibimos la lista y su modificador directamente desde App.jsx
export default function SculpturesRemove({ sculptures, setSculptures }) {
    function handleRemove(indexToRemove) {
        // 2. Creamos un array nuevo excluyendo el elemento en esa posición
        setSculptures(sculptures.filter((_, index) => index !== indexToRemove));
    }

    return (
        <>
            <h2>Remove Sculpture</h2>
            {sculptures.length === 0 ? (
                <p>No sculptures left to remove.</p>
            ) : (
                <table>
                    {/* 3. En HTML/React, las tablas siempre deben envolver sus filas en <tbody> */}
                    <tbody>
                    {sculptures.map((scul, index) => (
                        // 4. La prop "key" siempre va en el elemento raíz del .map() (el <tr>, no el <td>)
                        <tr key={index}>
                            <td>
                                {scul.name} by {scul.artist} ({scul.year})
                            </td>
                            <td>
                                <button onClick={() => handleRemove(index)}>Remove</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </>
    );
}
