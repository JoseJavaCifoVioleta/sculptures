import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { sculptureList } from "./data.js";
import SculpturesPage from "./SculpturesPage";
import SculptureAdd from "./SculpturesAdd";
import SculptureRemove from "./SculpturesRemove";
import SculpturesFilteredByYear from "./SculpturesFilteredByYear";

export default function App() {
    // El estado compartido de las esculturas sigue viviendo aquí sin cambios
    const [sculptures, setSculptures] = useState(sculptureList);

    return (
        <>
            <h1>Sculptures Site</h1>

            {/* 1. Menú de navegación con <Link> en lugar de <button> o <a> */}
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

            {/* 2. Definición de qué componente se pinta según la URL actual */}
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
                {/* 3. Ruta comodín (*) por si el usuario escribe una URL que no existe */}
                <Route path="*" element={<div>404 - Page not found</div>} />
            </Routes>
        </>
    );
}
