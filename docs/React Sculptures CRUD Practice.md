# React Practice Exercise — Sculptures CRUD App

Build a small React SPA that manages a catalogue of public sculptures with **all four CRUD operations** (Create, Read, Update, Delete) and a **top navigation bar** powered by `react-router-dom`.

Data source: [`src/data.js`](https://github.com/AlbertProfe/sculptures/blob/main/src/data.js) from [AlbertProfe/sculptures](https://github.com/AlbertProfe/sculptures) — see the [project wiki](https://github.com/AlbertProfe/sculptures/wiki) for background and context.

**React concepts:** `react-router-dom` (`BrowserRouter`, `Routes`, `Route`, `Link`, `NavLink`, `Outlet`, `useParams`, `useNavigate`, `useOutletContext`), `useState`, controlled forms, lifting state up, conditional rendering.

---

## 1. Scaffold the Vite project

```bash
npm create vite@latest sculptures-app -- --template react
cd sculptures-app
npm install
npm install react-router-dom
npm run dev
```

Open `http://localhost:5173` and verify the default Vite page loads.

---

## 2. Prepare the data

Copy `sculptureList` into `src/data.js`. **Two traps to fix:**

- **No `id` field.** Every CRUD app needs a stable key. Add a unique `id` to each object (or generate one on load with `crypto.randomUUID()`).
- **`location` is optional.** Not every sculpture has it — render it conditionally.

```js
// src/data.js
export const sculptureList = [
  {
    id: 1,
    name: "Homenaje a la Neurocirugía",
    artist: "Marta Colvin Andrade",
    description: "Although Colvin is predominantly known for abstract themes ...",
    year: 2023,
    location: "Oxford Street, 32, London",
    url: "https://i.imgur.com/Mx7dA2Y.jpg",
    alt: "A bronze statue of two crossed hands ...",
  },
  // ...remaining sculptures
];
```

---

## 3. Think first — before you code

- **Where should the `sculptures` state live?** The list must be visible and mutable from several routes — which component is their common ancestor?
- **How do child routes access shared state?** Look up `<Outlet context={...} />` and `useOutletContext()`.
- **Can one form serve both Create and Update?** What does `useParams()` return on `/sculptures/new` vs `/sculptures/5/edit`?
- **What should happen after save/delete?** Which hook navigates programmatically?

---

## 4. Routes and top nav bar

```jsx
// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { sculptureList } from "./data.js";
import Layout from "./pages/Layout.jsx";
import SculptureListPage from "./pages/SculptureListPage.jsx";
// TODO: import SculptureDetailPage, SculptureFormPage, NoPage

export default function App() {
  const [sculptures, setSculptures] = useState(sculptureList);

  // TODO: addSculpture / updateSculpture / deleteSculpture handlers

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* TODO: index route → SculptureListPage */}
          {/* TODO: "sculptures/:id" → detail (Read one) */}
          {/* TODO: "sculptures/new" → form (Create) */}
          {/* TODO: "sculptures/:id/edit" → form (Update) */}
          {/* TODO: "*" → NoPage */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

```jsx
// src/pages/Layout.jsx — top navigation bar
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <nav className="topbar">
        {/* TODO: NavLink to "/" (List) and "/sculptures/new" (Add) */}
        {/* Hint: NavLink adds an "active" class — style it */}
      </nav>
      <main>
        {/* TODO: render nested routes + pass shared state via context */}
      </main>
    </>
  );
}
```

---

## 5. Read — list and detail pages

```jsx
// src/pages/SculptureListPage.jsx
import { Link, useOutletContext } from "react-router-dom";

export default function SculptureListPage() {
  const { sculptures } = useOutletContext();
  // TODO: map sculptures → card rows
  //   <img src={s.url} alt={s.alt} width="80" />
  //   name, artist, year
  //   <Link to={`/sculptures/${s.id}`}>View</Link>
  //   <Link to={`/sculptures/${s.id}/edit`}>Edit</Link>
  //   <button>Delete</button>  (calls deleteSculpture from context)
}
```

```jsx
// src/pages/SculptureDetailPage.jsx
import { useParams } from "react-router-dom";
// TODO: const { id } = useParams(); find sculpture by id
// TODO: show all fields; render location only if it exists
// TODO: "Back to list" link
```

---

## 6. Create + Update — one shared form

```jsx
// src/pages/SculptureFormPage.jsx
import { useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";

export default function SculptureFormPage() {
  const { id } = useParams(); // defined → edit mode
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { /* TODO: get sculptures + handlers from context */ } = useOutletContext();

  // TODO: initialise form state from existing sculpture (edit) or blanks (create)
  // Fields: name, artist, year, location, url, alt, description

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: isEdit ? updateSculpture(...) : addSculpture(...)
    // TODO: navigate("/");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* TODO: one controlled <input> per field, <textarea> for description */}
      <button type="submit">{isEdit ? "Save changes" : "Create sculpture"}</button>
    </form>
  );
}
```

---

## 7. Delete

- Add a **Delete** button on each list row calling `deleteSculpture(id)` from outlet context.
- Bonus: also delete from the detail page, then `navigate("/")`.
- Implement with `setSculptures(sculptures.filter(s => s.id !== id))` — never mutate state.

---

## Bonus challenges

- **Confirm before delete** with `window.confirm()`.
- **Validation** — require `name`, `artist`, `url`; show inline errors.
- **`useSearchParams` filter** — `/?artist=hepworth` filters the list.
- **Extract a `useSculptures` custom hook** to clean up `App.jsx`.
- **Persist to `localStorage`** so edits survive refresh.

---

## Summary — React Concepts Covered

| #   | Topic                                                            | Where                     |
| --- | ---------------------------------------------------------------- | ------------------------- |
| 1   | Vite scaffold                                                    | `npm create vite@latest`  |
| 2   | Nested routes, `Layout` + `Outlet`                               | `App.jsx`, `Layout.jsx`   |
| 3   | Shared state via `useOutletContext`                              | all pages                 |
| 4   | `useParams` dynamic segments                                     | detail & form pages       |
| 5   | `useNavigate` after mutation                                     | form & delete             |
| 6   | CRUD with immutable array updates (`map`, `filter`, spread)      | `App.jsx` handlers        |
| 7   | Controlled form reused for create/edit                           | `SculptureFormPage.jsx`   |
| 8   | Optional field → conditional rendering                           | `location`                |

---

## Reference implementation

This section records how the exercise was solved in `sculptures/`. It is documentation of the finished work, not part of the statement above.

### Routes

| Path | Component | Operation |
|---|---|---|
| `/` | `SculptureListPage.jsx` | Read all, filter, delete |
| `/sculptures/:id` | `SculptureDetailPage.jsx` | Read one |
| `/sculptures/new` | `SculptureFormPage.jsx` | Create |
| `/sculptures/:id/edit` | `SculptureFormPage.jsx` | Update |
| `/gallery` | `SculpturesPage.jsx` | Gallery exercises from `exercise.md` |
| `/add`, `/remove`, `/filter-by-year` | `<Navigate />` | Legacy URLs redirected |
| `*` | `NoPage.jsx` | 404 |

### Files

```
sculptures/src/
├── App.jsx                 routes + useSculptures()
├── Layout.jsx              header, NavLink, <Outlet context={...} />
├── SculptureListPage.jsx   catalogue, artist filter, delete dialog
├── SculptureDetailPage.jsx detail, edit, delete, back to list
├── SculptureFormPage.jsx   shared create/edit form + validation
├── SculpturesPage.jsx      gallery (caption prop, Loop, likes, etc.)
├── NoPage.jsx              404
├── components/
│   └── ConfirmDialog.jsx   reusable <dialog> confirmation
├── hooks/
│   └── useSculptures.js    state, CRUD, localStorage, id migration
├── data.js                 12 sculptures with `id`
└── index.css               catalogue, form, detail, gallery, dialog
```

### How the requirements are met

| Requirement | Implementation |
|---|---|
| `id` in the data | `data.js` uses `id: 1…12`; `useSculptures` assigns `legacy-N` to old stored records without an `id` |
| Optional `location` | Only rendered when the field has a value (list, detail and gallery) |
| State in the common ancestor | `useSculptures()` runs once in `App.jsx`; `Layout` receives its return value |
| Child routes access the state | `<Outlet context={...} />` in `Layout.jsx`, `useOutletContext()` in every page |
| One form for Create and Update | `SculptureFormPage.jsx`; `id` from `useParams()` selects the mode, `key` resets the form |
| Navigate after save | `useNavigate()` → `/` after create or update |
| Navigate after delete | Detail page deletes, closes the dialog and navigates to `/` |
| Immutable updates | `map`, `filter` and spread inside `useSculptures`; `id` is preserved on update |
| Delete confirmation | Reusable `ConfirmDialog` built on native `<dialog>`, focus stays inside, `Cancel` is autofocused |
| Validation | `name`, `artist` and `url` required; URL must be `http(s)`; optional year must be 0–3000; first invalid field gets focus |
| Artist filter | `useSearchParams` keeps `?artist=hepworth` in the URL; accents and case are ignored |
| Persistence | `localStorage` key `sculptures_app_data`, guarded against corrupt or blocked storage |
| 404 | `path="*"` renders `NoPage` |

### Design decisions

- **Previous/Next vs wrap-around.** The two gallery ideas pull in opposite directions. A **Loop** checkbox resolves them: with Loop off the edge buttons are disabled; with Loop on they wrap around. `exercise.md` is satisfied both ways.
- **Gallery likes** are keyed by sculpture `id`, so the state survives navigating between images. The expanded description is stored by `id` too, which returns to the short version when the image changes.
- **Legacy routes** `/add`, `/remove` and `/filter-by-year` remain as redirects so old bookmarks do not break.
- **`localStorage` data without `id`** (from the pre-router version of the app) is migrated on load instead of being discarded.
- **`package-lock.json`** is kept only inside `sculptures/`, which is the real npm project. The empty lockfile that sat at the repo root was deleted.

### Verification

From `sculptures/`:

```bash
npm run lint
npm run build
```

Both pass (ESLint flat config, Vite 8). The end-to-end flow was also exercised with headless Chrome against `npm run dev`:

- list renders 12 cards; `/?artist=hepworth` filters to one; clearing restores all
- detail shows `location` when present and hides it when missing
- edit preloads the form, saves and persists to `localStorage`
- create rejects empty required fields, then adds the sculpture and returns to `/`
- delete works from the list and from the detail page (with confirmation and navigation)
- gallery: Previous disabled on the first item, Next disabled on the last without Loop, thumbnails jump, Loop wraps both ways, Like/Unlike, year, caption, background cycle, animation toggle and Show more/less
- legacy routes redirect and unknown routes show the 404 page

The layout was checked in light mode, dark mode and a narrow viewport.
