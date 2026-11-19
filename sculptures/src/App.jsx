import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { sculptureList } from "./data.js";
import Layout from "./Layout";
import SculpturesPage from "./SculpturesPage";
import SculptureAdd from "./SculpturesAdd";
import SculptureRemove from "./SculpturesRemove";
import SculpturesFilteredByYear from "./SculpturesFilteredByYear";

// Definimos una clave única para guardar los datos en el navegador
const STORAGE_KEY = "sculptures_app_data";

export default function App() {
    // 1. Inicialización perezosa (Lazy Initialization):
    // Al arrancar la app, comprobamos si ya existen datos guardados en localStorage
    const [sculptures, setSculptures] = useState(() => {
        const savedSculptures = localStorage.getItem(STORAGE_KEY);
        // Si hay datos guardados, los convertimos de texto JSON a array de JS
        if (savedSculptures) {
            return JSON.parse(savedSculptures);
        }
        // Si es la primera vez que entra el usuario, cargamos la lista inicial por defecto
        return sculptureList;
    });

    // 2. Sincronización automática con useEffect:
    // Cada vez que el estado "sculptures" cambie (añadir o borrar), lo guardamos
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sculptures));
    }, [sculptures]);

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route
                    index
                    element={<SculpturesPage sculptures={sculptures} />}
                />
                <Route
                    path="add"
                    element={
                        <SculptureAdd
                            sculptures={sculptures}
                            setSculptures={setSculptures}
                        />
                    }
                />
                <Route
                    path="remove"
                    element={
                        <SculptureRemove
                            sculptures={sculptures}
                            setSculptures={setSculptures}
                        />
                    }
                />
                <Route
                    path="filter-by-year"
                    element={<SculpturesFilteredByYear sculptures={sculptures} />}
                />
                <Route path="*" element={<div>Select a page</div>} />
            </Route>
        </Routes>
    );
}
