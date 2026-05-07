# Rich Text Editor

A Teams-style inline rich text editor with a paired read-only viewer.
The two components share a single HTML string as their contract — `RichTextEditor` writes it, `RichTextViewer` renders it.

---

## Files

| File | Role |
|---|---|
| `components/rich-text-editor/RichTextEditor.tsx` | Composer — `contentEditable` div + toolbar |
| `components/rich-text-editor/RichTextViewer.tsx` | Renderer — read-only HTML display |
| `app/snippets/rich-text-editor/page.tsx` | Demo — side-by-side compose + preview |

---

## Component: `RichTextEditor`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `undefined` | Initial HTML — seeded once on mount |
| `onChange` | `(html: string) => void` | `undefined` | Fires on every keystroke or format change; passes raw HTML (or `""` when empty) |
| `placeholder` | `string` | `"Write something..."` | Shown when editor is empty and unfocused |
| `maxLength` | `number` | `2000` | Character limit; triggers warning colours on the counter |

### Basic usage

```tsx
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";

const [html, setHtml] = useState("");

<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="Type your message..."
/>
```

### Visual behaviour

| State | Border |
|---|---|
| Resting | `1.5px solid slate-400` |
| Focused | `1.5px solid slate-400` + `3px solid blue-500` on bottom only |
| Over limit (unfocused) | `1.5px solid red-400` |

- **Placeholder** — visible when empty AND unfocused; hidden on focus.
- **Toolbar** — single scrollable row; resizes buttons to `32×32` on desktop, `36×36` on mobile.
- **Character counter** — always visible bottom-right. Turns amber at 80 %, red at 95 % and over.
- **Overflow label** — bottom-left, shows `Exceeded by N characters` only when over limit.

### Toolbar

```
[ B ][ I ][ U ][ S ]   [ • ][ 1. ]   [ H2 ][ " ]
 ──── inline ────       ─ lists ─     ─── block ───
```

| Button | Icon | Behaviour |
|---|---|---|
| Bold | `Bold` | Toggle — `execCommand("bold")` |
| Italic | `Italic` | Toggle — `execCommand("italic")` |
| Underline | `Underline` | Toggle — `execCommand("underline")` |
| Strikethrough | `Strikethrough` | Toggle — `execCommand("strikeThrough")` |
| Bullet List | `List` | Toggle — `execCommand("insertUnorderedList")` |
| Number List | `ListOrdered` | Toggle — `execCommand("insertOrderedList")` |
| Title | `Heading2` | Block toggle — `formatBlock → h2` (re-clicking resets to `p`) |
| Quote | `Quote` | Block toggle — `formatBlock → blockquote` (re-clicking resets to `p`) |

**Button states:**

| State | Style |
|---|---|
| Idle | `text-slate-700`, hover `bg-slate-200` |
| Active | `bg-slate-300 text-slate-900`, icon `strokeWidth 2.5` |

### Toolbar active state detection

- **Toggle buttons** — `document.queryCommandState(command)` returns `true/false`.
- **Block buttons** — `document.queryCommandValue("formatBlock")` returns the current block tag; compared against the button's `value` (`"h2"` / `"blockquote"`).
- Sync runs on: `selectionchange` (document-level), `mouseup`, `touchEnd`, and immediately after every `applyFormat` call.

### Focus retention on toolbar clicks

All toolbar buttons use `onMouseDown` with `e.preventDefault()` instead of `onClick`.
This keeps the editor focused and preserves the current selection so `execCommand` applies to the correct range.

### Empty-state format reset

When all text is deleted, the browser retains an internal "override typing style" — the next character typed inherits bold/italic even though the toolbar shows no active format.

**Two-layer fix:**

1. `handleInput` — detects empty via `getEditorText` (ZWS-safe) and clears toolbar state.
2. `onKeyDown` — on the first printable keystroke while empty, synchronously runs `innerHTML = ""` and resets the caret, stripping the browser's pending format context before the character is inserted.

### Initial value seeding

`value` is written into the DOM **once** on mount, guarded by a `seededRef`.
Subsequent `value` prop changes do not overwrite the editor — this avoids fighting live user input with controlled re-renders.
To reset the editor externally, change its `key` prop.

### `getEditorText` helper

```ts
const getEditorText = (el: HTMLElement): string =>
  (el.textContent ?? "").replace(/[\u200B\u200C\u200D\uFEFF\u00AD]/g, "").trim();
```

Uses `textContent` (layout-independent, `<br>` = `""`) instead of `innerText`.
Strips invisible Unicode characters (ZWS `\u200B` etc.) that Chrome injects into empty format elements like `<b></b>` — JS's `.trim()` does not remove these, causing `queryCommandState` to erroneously report bold/italic as active on empty content.

---

## Component: `RichTextViewer`

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `html` | `string` | ✅ | Raw HTML string from `RichTextEditor`'s `onChange` |
| `className` | `string` | — | Optional extra classes on the wrapper `<div>` |

### Basic usage

```tsx
import { RichTextViewer } from "@/components/rich-text-editor/RichTextViewer";

<RichTextViewer html={html} />
```

### Empty state

If `html` is empty, whitespace-only, or `"<br>"`, renders:
```
Nothing to preview yet.   ← italic slate-400
```

### Prose styles

Both components share the same style map so rendered output is visually identical to what the user sees while typing.

| Element | Style |
|---|---|
| `h2` | `text-base font-semibold text-slate-900 mb-1` |
| `p` | `leading-relaxed text-slate-700` |
| `blockquote` | `border-l-4 border-slate-200 pl-3 italic text-slate-500` |
| `ul` | `list-disc pl-5 space-y-0.5` |
| `ol` | `list-decimal pl-5 space-y-0.5` |
| `li` | `leading-relaxed` |

---

## Compose → Review pattern

```tsx
// Compose
const [html, setHtml] = useState("");
<RichTextEditor onChange={setHtml} />

// Review (same or different route)
<RichTextViewer html={html} />
```

The HTML string is the transport layer. Store it in React state, a URL param, an API payload, or localStorage — whatever your architecture requires.

---

## Security note

The editor outputs raw HTML. **Sanitise server-side** before persisting or rendering to other users to prevent XSS — e.g. use [DOMPurify](https://github.com/cure53/DOMPurify) or an equivalent library.

---

## Notes

- `execCommand` / `queryCommandState` are spec-deprecated but remain the only universally supported way to drive `contentEditable` without a full editor library. All major browsers (Chrome, Firefox, Safari, Edge) continue to support them. No replacement API exists yet.
- The editor outputs **HTML**, not Markdown.
- Paste from external sources (Word, Notion) may inject `style=""` or `<span>` noise into the HTML. Acceptable for a POC; sanitise for production.


---

## Files

| File | Role |
|---|---|
| `components/rich-text-editor/RichTextEditor.tsx` | Composer — `contentEditable` div + toolbar |
| `components/rich-text-editor/RichTextViewer.tsx` | Renderer — read-only HTML display |
| `app/snippets/rich-text-editor/page.tsx` | Demo — side-by-side compose + preview |

---

## Component: `RichTextEditor`

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `undefined` | Initial HTML content — seeded once on mount |
| `onChange` | `(html: string) => void` | `undefined` | Fires on every keystroke or format change, passes raw HTML |
| `placeholder` | `string` | `"Write something..."` | Shown when editor is empty and unfocused |

### Basic usage

```tsx
import { RichTextEditor } from "@/components/rich-text-editor/RichTextEditor";

const [html, setHtml] = useState("");

<RichTextEditor
  value={html}
  onChange={setHtml}
  placeholder="Type your message..."
/>
```

### Visual behaviour

- **Resting state** — no visible border, blends into the page
- **Focused state** — only the bottom border activates: `2px solid blue-500`
- **Placeholder** — shows when empty AND unfocused; hides immediately on focus
- **Toolbar** — single row, left-aligned, with Clear Formatting pinned to the far right

### Toolbar layout

```
[ B ][ I ][ U ][ S ] | [ H2 ][ ¶ ][ " ] | [ • ][ 1. ]      [ ✕ ]
 ────── inline ──────   ──── block ────    ─ lists ─    clear (right)
```

Each button is `32×32px` with:
- Icon only (no labels)
- `title` attribute for native tooltip
- Hover: `slate-100` background + `slate-700` icon
- Active (format applied): `blue-50` background + `blue-600` icon + heavier icon stroke (`2.5`)
- Clear button hover: `red-50` background + `red-400` icon — visually signals "destructive"

### Toolbar actions

| Button | Icon | Type | `execCommand` |
|---|---|---|---|
| Bold | `Bold` | toggle | `bold` |
| Italic | `Italic` | toggle | `italic` |
| Underline | `Underline` | toggle | `underline` |
| Strikethrough | `Strikethrough` | toggle | `strikeThrough` |
| Title | `Heading2` | block | `formatBlock → h2` |
| Paragraph | `Pilcrow` | block | `formatBlock → p` |
| Quote | `Quote` | block | `formatBlock → blockquote` |
| Bullet List | `List` | toggle | `insertUnorderedList` |
| Number List | `ListOrdered` | toggle | `insertOrderedList` |
| Clear Format | `RemoveFormatting` | action | `removeFormat` + `formatBlock → p` |

### Active state detection

- **Toggle buttons** (`bold`, `italic`, etc.) — `document.queryCommandState(command)` returns `true/false`
- **Block buttons** (`h2`, `p`, `blockquote`) — `document.queryCommandValue("formatBlock")` returns the current block tag name; compared against the button's `value`
- Sync happens on: `selectionchange` (document-level listener), `keyup`, `mouseup`, and after every format apply

### Focus retention

All toolbar buttons use `onMouseDown` with `e.preventDefault()` instead of `onClick`.
This prevents the editor `<div>` from losing focus when the user clicks a toolbar button —
the selection is preserved and `execCommand` applies to the correct range.

### Initial value seeding

`value` is only written into the DOM **once** on mount via a `seededRef` guard.
Subsequent `value` changes do not overwrite the editor — this prevents fighting the user's
live input with controlled re-renders. If you need full controlled behaviour, clear the editor
externally by changing a `key` prop.

---

## Component: `RichTextViewer`

### Props

| Prop | Type | Required | Description |
|---|---|---|---|
| `html` | `string` | ✅ | Raw HTML string from `RichTextEditor`'s `onChange` |
| `className` | `string` | — | Optional extra classes on the wrapper `<div>` |

### Basic usage

```tsx
import { RichTextViewer } from "@/components/rich-text-editor/RichTextViewer";

<RichTextViewer html={html} />
```

### Empty state

If `html` is empty, whitespace-only, or `"<br>"`, the component renders:
```
Nothing to preview yet.   ← slate-400 italic
```

### Prose styles

Both `RichTextEditor` and `RichTextViewer` use the exact same style map so rendered output
is pixel-identical to what the user sees while typing.

| Element | Style |
|---|---|
| `h2` | `text-base font-semibold text-slate-900` |
| `p` | `leading-relaxed text-slate-700` |
| `blockquote` | `border-l-4 border-slate-200 pl-3 italic text-slate-500` |
| `ul` | `list-disc pl-5 space-y-0.5` |
| `ol` | `list-decimal pl-5 space-y-0.5` |
| `li` | `leading-relaxed` |

---

## Compose → Review pattern

```tsx
// Compose page
const [html, setHtml] = useState("");
<RichTextEditor onChange={setHtml} />

// Review page (different route, html stored in state/context/API)
<RichTextViewer html={html} />
```

The HTML string is the transport layer. Store it wherever suits your architecture
(React state, URL param, API payload, localStorage).

---

## TODO: API integration

```ts
// TODO: [API] POST /api/messages  — send { content: html } to backend
// TODO: [API] GET  /api/messages/:id — fetch saved html for viewer
```

---

## Notes

- `execCommand` / `queryCommandState` are marked deprecated in MDN but remain the only
  universally supported way to interact with `contentEditable` without a full editor library.
  All modern browsers (Chrome, Firefox, Safari, Edge) support them. No replacement exists yet.
- The editor outputs **HTML**, not Markdown. Sanitise server-side before storing or displaying
  to other users to prevent XSS.
