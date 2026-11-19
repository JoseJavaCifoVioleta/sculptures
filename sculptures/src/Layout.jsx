import { Link, NavLink, Outlet } from "react-router-dom";

export default function Layout({
    sculptures,
    addSculpture,
    updateSculpture,
    deleteSculpture,
    resetSculptures,
}) {
    return (
        <>
            <header className="site-header">
                <Link to="/" className="brand">
                    Sculptures Site
                </Link>

                <nav>
                    <NavLink to="/" end>
                        List
                    </NavLink>
                    <NavLink to="/gallery">Gallery</NavLink>
                    <NavLink to="/sculptures/new">Add</NavLink>
                </nav>
            </header>

            <main>
                <Outlet
                    context={{
                        sculptures,
                        addSculpture,
                        updateSculpture,
                        deleteSculpture,
                        resetSculptures,
                    }}
                />
            </main>
        </>
    );
}
