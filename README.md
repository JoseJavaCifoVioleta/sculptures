# Sculptures

A small React SPA for practising **CRUD** (Create, Read, Update, Delete) and React Router, using a catalogue of public sculptures as the data set.

## Features

- **Catalogue** (`/`, `SculptureListPage.jsx`): card grid with View / Edit / Delete, artist filter through the URL (`/?artist=hepworth`) and a confirmation dialog before deleting.
- **Detail** (`/sculptures/:id`, `SculptureDetailPage.jsx`): every field, conditional `location`, edit and delete actions.
- **Create / Update** (`/sculptures/new`, `/sculptures/:id/edit`, `SculptureFormPage.jsx`): one controlled form reused for both modes, with inline validation for `name`, `artist` and `url`.
- **Gallery** (`/gallery`, `SculpturesPage.jsx`): the ten `docs/exercise.md` ideas — Previous/Next, disabled edges, thumbnails, Like, year, `caption` prop, Loop (wrap-around), background colour, animation toggle and Show more/less.
- **Shared state** (`src/hooks/useSculptures.js`): immutable updates, `localStorage` persistence and migration of old records that have no `id`.
- **Nested routes + top nav** (`App.jsx`, `Layout.jsx`): `Outlet` context, `NavLink` active state, legacy redirects and a 404 page.

Data lives in `src/data.js` (`sculptureList`, 12 items with `id`).

## Routes

| Path | Page | Purpose |
|---|---|---|
| `/` | `SculptureListPage` | Read all + filter + delete |
| `/gallery` | `SculpturesPage` | Gallery exercises |
| `/sculptures/new` | `SculptureFormPage` | Create |
| `/sculptures/:id` | `SculptureDetailPage` | Read one |
| `/sculptures/:id/edit` | `SculptureFormPage` | Update |
| `/add`, `/remove`, `/filter-by-year` | redirects | Backwards compatibility |
| `*` | `NoPage` | 404 |

## Repository structure

```
sculptures/            ← git root
├── docs/              ← exercise statements, notes and screenshots (not part of the app)
│   ├── exercise.md
│   ├── React Sculptures CRUD Practice.md
│   └── css/README.md
└── sculptures/        ← Vite + React app
    ├── index.html
    ├── vite.config.js
    ├── eslint.config.js
    ├── package.json
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── Layout.jsx
        ├── SculptureListPage.jsx
        ├── SculptureDetailPage.jsx
        ├── SculptureFormPage.jsx
        ├── SculpturesPage.jsx
        ├── NoPage.jsx
        ├── components/ConfirmDialog.jsx
        ├── hooks/useSculptures.js
        ├── data.js
        └── index.css
```

The docs are kept **outside** the code project on purpose, so the app folder contains only code.

## Getting started

Run these from the inner app folder:

```bash
cd sculptures
npm install
npm run dev       # dev server at http://localhost:5173
npm run build     # production build in dist/
npm run preview   # serve the production build locally
npm run lint      # ESLint
```

## Migration: CodeSandbox / CRA → Vite

The project began as a **CodeSandbox** template built on **Create React App** (`react-scripts`). In commit `8b92cdb` it was rebuilt from scratch with **Vite**. All of this happened on `main`.

### What changed

| | Before (CRA / CodeSandbox) | After (Vite) |
|---|---|---|
| Location | repo root | `sculptures/` subfolder |
| Tooling | `react-scripts` 5 | `vite` 8 + `@vitejs/plugin-react` |
| Entry point | `src/index.js` | `src/main.jsx` |
| HTML | `public/index.html` | `index.html` (project root) |
| Root component | `src/App.js` | `src/App.jsx` |
| Styles | `src/styles.css` | `src/index.css`, `src/App.css` |
| Scripts | `start`, `build`, `test`, `eject` | `dev`, `build`, `preview`, `lint` |
| Build output | `build/` | `dist/` |
| Lockfiles | `package-lock.json` + `pnpm-lock.yaml` | `package-lock.json` only |
| Linting | CRA built-in | `eslint.config.js` (flat config) |
| Extras | `.codesandbox/tasks.json` | React Compiler (`babel-plugin-react-compiler`) |

### What did not change

The application code (`SculpturesPage`, `SculpturesAdd`, `SculpturesRemove`, `SculpturesFilteredByYear`, `data.js`) was moved over **unchanged** during the migration. Only `App.js` was renamed to `App.jsx`, because Vite requires JSX to be in `.jsx` files.

> The CRUD practice later replaced `SculpturesAdd`, `SculpturesRemove` and `SculpturesFilteredByYear` with the routed pages listed above, so those three files no longer exist.

### Why Vite

- Much faster dev server startup and HMR
- CRA (`react-scripts`) is deprecated and no longer maintained
- Simpler, explicit configuration (`vite.config.js`)

The previous CRA version can still be found in git history before commit `8b92cdb`.

## CRUD practice

The exercise is described in [`docs/React Sculptures CRUD Practice.md`](docs/React%20Sculptures%20CRUD%20Practice.md), and the gallery ideas in [`docs/exercise.md`](docs/exercise.md). The reference solution lives in the app folder:

| Concept | Implementation |
|---|---|
| Shared state + persistence | `src/hooks/useSculptures.js` (called once in `App.jsx`) |
| Nested routes, `Layout` + `Outlet` | `src/App.jsx`, `src/Layout.jsx` |
| Shared state in child routes | `<Outlet context={...}>` → `useOutletContext()` |
| Read all / filter / delete | `src/SculptureListPage.jsx` (`useSearchParams`) |
| Read one | `src/SculptureDetailPage.jsx` (`useParams`) |
| Create + Update | `src/SculptureFormPage.jsx` (one form, `useNavigate`) |
| Confirmation dialog | `src/components/ConfirmDialog.jsx` (`<dialog>`) |
| Gallery exercises | `src/SculpturesPage.jsx` |
| Legacy redirects + 404 | `src/App.jsx`, `src/NoPage.jsx` |

Verification on the `PRA-React-Sculptures-CRUD-Practice` branch: `npm run lint` and `npm run build` pass, and the full flow (list, filter, detail, create, edit, validation, delete from list and detail, gallery interactions, legacy routes and 404) was tested with headless Chrome.

Docs:

- [`docs/React Sculptures CRUD Practice.md`](docs/React%20Sculptures%20CRUD%20Practice.md) — statement + reference implementation
- [`docs/exercise.md`](docs/exercise.md) — ten gallery ideas + status
- [`docs/css/README.md`](docs/css/README.md) — CSS notes (updated with the CRUD additions)
