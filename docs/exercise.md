

Ten simple feature ideas t0 add to our basic React Gallery component to practice using useState and props:

1. **Add a Previous Button**  
Add a "Previous" button that decrements the index to go back to the previous sculpture. Make sure to handle edge cases (e.g., disable or wrap around).

2. **Disable Next Button on Last Item**  
Disable the "Next" button when the user reaches the last sculpture in the list, to practice conditional rendering and state handling.

3. **Show Thumbnail Navigation**  
Display small thumbnail images of all sculptures. Clicking a thumbnail sets the index to that sculpture’s position.

4. **Add Like Button**  
Add a "Like" button per sculpture that toggles a liked state. Show whether the sculpture is liked using conditional text or style.

5. **Display Sculpture Year**  
Pass in a year property via props and display the year the sculpture was made.

6. **Add a Caption Prop**  
Add a caption prop for the Gallery component and display it above the image; try both default and passed-in values.

7. **Cycle Index with Wrap Around**  
Modify the next button handler so that clicking “Next” on the last sculpture cycles back to the first sculpture instead of throwing an error.

8. **Change Background Color on Click**  
Add a button that changes the background color of the component using state.

9. **Add Animation Toggle**  
Add a checkbox that toggles a fade/slide animation effect on the sculpture image; track the animation state with useState.

10. **Show More/Less Description**  
Add a button that toggles between showing a truncated or full sculpture description to practice conditional rendering with useState.

---

## Implementation status

All ten ideas are implemented in [`sculptures/src/SculpturesPage.jsx`](../sculptures/src/SculpturesPage.jsx) and reachable at `/gallery`.

| # | Idea | Implementation | Done |
|---|---|---|---|
| 1 | Previous button | `handlePrevious()`; disabled on the first item unless Loop is on | ✅ |
| 2 | Disable Next on the last item | `disabled={!loop && isLast}` | ✅ |
| 3 | Thumbnail navigation | `.gallery-thumbs` renders one button per sculpture; clicking sets the index | ✅ |
| 4 | Like button | `likes` state keyed by sculpture `id`; toggles Like/Unlike and shows a message | ✅ |
| 5 | Sculpture year | Rendered below the title when the field has a value | ✅ |
| 6 | Caption prop | `caption = "Sculptures Gallery"` default; the route passes `"Highlights from the catalogue"` | ✅ |
| 7 | Wrap-around | The **Loop** checkbox makes Next/Previous cycle; with Loop off the edges are disabled (idea 2) | ✅ |
| 8 | Background colour | Button cycles Default → Sand → Sky → Mint → Lilac through state | ✅ |
| 9 | Animation toggle | Checkbox applies `gallery-image--animated` (fade/slide) and respects `prefers-reduced-motion` | ✅ |
| 10 | Show more/less | Descriptions over 180 characters get a toggle; the expanded id resets when the image changes | ✅ |

Idea 2 and idea 7 contradict each other, so both behaviours are exposed through the **Loop** control instead of choosing one permanently.

The gallery reads the catalogue from the shared state, so sculptures created or deleted in the CRUD pages appear or disappear in the gallery too. See [`README.md`](../README.md) for the full feature list and how to run the app.
