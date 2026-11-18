import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { sculptureList } from "./data.js";
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
        <>
            <h1>Sculptures Site</h1>

            <nav
                style={{
                    display: "flex",
                    gap: "1rem",
                    borderBottom: "2px solid #ccc",
                    paddingBottom: "0.5rem",
                    marginBottom: "2rem",
                }}
            >
                <Link to="/">Home</Link>
                <Link to="/add">Add</Link>
                <Link to="/remove">Remove</Link>
                <Link to="/filter">Filter by year</Link>
            </nav>

            <Routes>
                <Route
                    path="/"
                    element={<SculpturesPage sculptures={sculptures} />}
                />
                <Route
                    path="/add"
                    element={
                        <SculptureAdd
                            sculptures={sculptures}
                            setSculptures={setSculptures}
                        />
                    }
                />
                <Route
                    path="/remove"
                    element={
                        <SculptureRemove
                            sculptures={sculptures}
                            setSculptures={setSculptures}
                        />
                    }
                />
                <Route
                    path="/filter"
                    element={<SculpturesFilteredByYear sculptures={sculptures} />}
                />
                <Route path="*" element={<div>404 - Page not found</div>} />
            </Routes>
        </>
    );
}
