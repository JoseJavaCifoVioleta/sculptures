import { useEffect, useState } from "react";
import { sculptureList } from "../data.js";

// Clave usada por la versión anterior de la galería.
export const STORAGE_KEY = "sculptures_app_data";

// Los datos antiguos no tenían id. Al cargarlos, les asignamos uno estable
// para que editar, borrar y las keys de React sigan funcionando.
function ensureIds(list) {
    return list.map((sculpture, index) =>
        sculpture.id === undefined || sculpture.id === null
            ? { ...sculpture, id: `legacy-${index + 1}` }
            : sculpture
    );
}

function isValidSculpture(value) {
    return (
        value !== null &&
        typeof value === "object" &&
        typeof value.name === "string" &&
        typeof value.artist === "string" &&
        typeof value.url === "string"
    );
}

function loadSculptures() {
    if (typeof window === "undefined") {
        return [...sculptureList];
    }

    try {
        const stored = window.localStorage.getItem(STORAGE_KEY);
        if (!stored) return [...sculptureList];

        const parsed = JSON.parse(stored);
        if (!Array.isArray(parsed) || !parsed.every(isValidSculpture)) {
            return [...sculptureList];
        }

        return ensureIds(parsed);
    } catch {
        return [...sculptureList];
    }
}

export default function useSculptures() {
    const [sculptures, setSculptures] = useState(loadSculptures);

    useEffect(() => {
        try {
            window.localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(sculptures)
            );
        } catch {
            // Si localStorage está lleno o bloqueado, la app sigue en memoria.
        }
    }, [sculptures]);

    function addSculpture(sculpture) {
        const newSculpture = {
            ...sculpture,
            id: crypto.randomUUID(),
        };
        setSculptures((current) => [...current, newSculpture]);
    }

    function updateSculpture(id, changes) {
        setSculptures((current) =>
            current.map((sculpture) =>
                String(sculpture.id) === String(id)
                    ? { ...sculpture, ...changes, id: sculpture.id }
                    : sculpture
            )
        );
    }

    function deleteSculpture(id) {
        setSculptures((current) =>
            current.filter(
                (sculpture) => String(sculpture.id) !== String(id)
            )
        );
    }

    function resetSculptures() {
        setSculptures([...sculptureList]);
    }

    return {
        sculptures,
        addSculpture,
        updateSculpture,
        deleteSculpture,
        resetSculptures,
    };
}
