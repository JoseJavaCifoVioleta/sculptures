import { Navigate, Route, Routes } from "react-router-dom";
import useSculptures from "./hooks/useSculptures.js";
import Layout from "./Layout.jsx";
import SculptureListPage from "./SculptureListPage.jsx";
import SculptureDetailPage from "./SculptureDetailPage.jsx";
import SculptureFormPage from "./SculptureFormPage.jsx";
import SculpturesPage from "./SculpturesPage.jsx";
import NoPage from "./NoPage.jsx";

export default function App() {
    const {
        sculptures,
        addSculpture,
        updateSculpture,
        deleteSculpture,
        resetSculptures,
    } = useSculptures();

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Layout
                        sculptures={sculptures}
                        addSculpture={addSculpture}
                        updateSculpture={updateSculpture}
                        deleteSculpture={deleteSculpture}
                        resetSculptures={resetSculptures}
                    />
                }
            >
                <Route index element={<SculptureListPage />} />
                <Route
                    path="gallery"
                    element={
                        <SculpturesPage caption="Highlights from the catalogue" />
                    }
                />
                <Route path="sculptures/new" element={<SculptureFormPage />} />
                <Route
                    path="sculptures/:id"
                    element={<SculptureDetailPage />}
                />
                <Route
                    path="sculptures/:id/edit"
                    element={<SculptureFormPage />}
                />

                {/* Rutas antiguas: siguen funcionando mediante redirección. */}
                <Route
                    path="add"
                    element={<Navigate to="/sculptures/new" replace />}
                />
                <Route path="remove" element={<Navigate to="/" replace />} />
                <Route
                    path="filter-by-year"
                    element={<Navigate to="/" replace />}
                />

                <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
    );
}
