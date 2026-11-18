import { sculptureList } from "./data.js";
import SculpturesPage from "./SculpturesPage";
import SculptureAdd from "./SculpturesAdd";
import SculptureRemove from "./SculpturesRemove";
import SculpturesFilteredByYear from "./SculpturesFilteredByYear";
import { useState } from "react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("sculpture-page");
  // 1. Elevamos el estado: App ahora es el dueño de la lista compartida
  const [sculptures, setSculptures] = useState(sculptureList);

  const dispatcherPage = () => {
    switch (currentPage) {
      case "sculpture-page": // Solo necesita leer la lista
          return <SculpturesPage sculptures={sculptures} />;
      case "sculpture-add":
          // Necesita leer la lista y modificarla
          return (
              <SculptureAdd
                  sculptures={sculptures}
                  setSculptures={setSculptures}
              />
          );
      case "sculpture-remove":
          // Necesita leer la lista y modificarla
          return (
              <SculptureRemove
                  sculptures={sculptures}
                  setSculptures={setSculptures}
              />
          );
      case "sculptures-filtered-by-year":
          // Solo necesita leer la lista para filtrarla
          return <SculpturesFilteredByYear sculptures={sculptures} />;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <>
      <h1>Sculptures Site </h1>

      <div
        style={{
          display: "flex",
          gap: "1rem",
          borderBottom: "2px solid #ccc",
          paddingBottom: "0.5rem",
          marginBottom: "2rem",
        }}
      >
        <button onClick={() => setCurrentPage("sculpture-page")}>Home</button>
        <button onClick={() => setCurrentPage("sculpture-add")}>Add</button>
        <button onClick={() => setCurrentPage("sculpture-remove")}>
          Remove
        </button>
        <button onClick={() => setCurrentPage("sculptures-filtered-by-year")}>
          Filter by year
        </button>
      </div>

      {dispatcherPage()}
    </>
  );
}
