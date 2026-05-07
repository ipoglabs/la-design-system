---
applyTo: "components/**/*.tsx,app/**/*.tsx"
---

# Component & Page Rules — poc-next

When creating or editing any component or page, you **must** derive all styling decisions from the patterns already established in this codebase. Do not introduce arbitrary colors, spacing, or structure. Follow these rules religiously.

---

## 0. Page Imports — ONLY from `components/*`

**This is the most critical rule. It is non-negotiable.**

When building any page (`app/**/*.tsx`) or any new component (`components/**/*.tsx`):

- **ONLY** import UI primitives, wrappers, and building blocks from `components/*`
- **NEVER** import directly from external libraries inside a page or feature component

```tsx
// ✅ CORRECT
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Field, FieldLabel } from "@/components/ui/field";
import { PhoneNumberInput } from "@/components/phone-number-input";
import { Timeline } from "@/components/timeline/Timeline";

// ❌ WRONG — never do this in a page or feature component
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
import { Input } from "some-ui-lib";
import { Button } from "shadcn/ui";
```

If a UI primitive you need does not exist in `components/ui/`, **create it there first**, wrapping the underlying library, before using it in a page. The `components/ui/` folder is the single source of truth for all UI primitives in this project.

The only allowed direct external imports in any file are:
- `react` / `react-dom`
- `next/*` (Link, Image, navigation, etc.)
- `@/lib/*` (utils, hooks, stores, constants)
- Type-only imports (`import type { ... }`)

---

## 1. Always Use `cn()` for className

Import from `@/lib/utils`. Never concatenate strings manually.

```tsx
import { cn } from "@/lib/utils";
<div className={cn("base-classes", conditional && "extra-class", className)} />
```

---

## 2. Color Palette — Two Layers, Both in Use

**Semantic CSS vars** (from `globals.css` / shadcn tokens) — prefer for structural/layout elements:

| Token | Use for |
|---|---|
| `bg-background` | page/screen background |
| `bg-card` | card surfaces |
| `text-foreground` | primary text |
| `text-muted-foreground` | secondary / helper text |
| `border-border` | default border color |
| `bg-accent/50` | hover backgrounds |
| `bg-muted` | subtle fill (tags, chips) |

**Tailwind `slate-*` scale** — use for fine-grained control within components:

| Range | Use for |
|---|---|
| `slate-900` | headings, strong labels |
| `slate-700` | body text, form labels |
| `slate-500` | secondary/supporting text |
| `slate-400` | placeholder, meta, quiet text |
| `slate-200` | borders, dividers |
| `slate-100` | subtle backgrounds |
| `slate-50` | near-white backgrounds |

**Never** introduce colors outside `slate-*` or the semantic tokens above unless explicitly asked.

---

## 3. Typography

Match these exact patterns — do not invent new ones:

```tsx
// Page headline
<h1 className="text-2xl font-bold tracking-tight text-foreground" />
// or for snippet pages:
<h1 className="text-5xl font-extrabold font-display text-foreground leading-tight tracking-tight" />

// Sub-header / card title
<h2 className="text-base font-semibold text-slate-900" />

// Section label (mono caps)
<p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground" />

// Body / description
<p className="text-sm text-muted-foreground" />
<p className="text-xs text-muted-foreground" />

// Form label
<label className="text-sm font-medium text-slate-700" />

// Meta / quiet
<span className="text-xs text-slate-400" />
```

---

## 4. Spacing & Layout

- **Page wrapper**: `min-h-screen bg-background` → `max-w-* mx-auto px-6 py-16`
- **Card/list item padding**: `px-4 py-3.5` (default row), `px-6` (card body)
- **Stacked list gap**: `space-y-2`
- **Form field gap**: `flex flex-col gap-2` (Field), `flex flex-col gap-4` (FieldGroup)
- **Section bottom margin**: `mb-8` between sections, `mb-14` for hero/header block

---

## 5. Border Radius

| Shape | Class |
|---|---|
| Cards, panels | `rounded-lg` or `rounded-xl` |
| Modals / drawers | `rounded-2xl` |
| Buttons (pill) | `rounded-full` |
| Tags / badges | `rounded` or `rounded-md` |
| Inputs | `rounded-lg` |

---

## 6. Borders & Dividers

```tsx
// Standard border
<div className="border border-border" />
// Subtle inner border  
<div className="border border-slate-200" />
// Hairline on white
<div className="border border-slate-900/10" />
// Vertical divider
<div className="w-px h-7 bg-slate-100" />
// Horizontal rule in list
<div className="divide-y divide-border" />
```

---

## 7. Shadows

- Use `shadow-sm` on cards and floating panels
- Avoid `shadow-md` or larger unless building a modal/popover
- Drawers and dialogs use the default shadcn elevation (no additional shadow needed)

---

## 8. Interactive / Hover States

```tsx
// Nav card / list row
className="hover:bg-accent/50 transition-colors"

// Icon or text link  
className="text-muted-foreground hover:text-foreground transition-colors"

// Button (use <Button> from components/ui/button — never hand-roll)
```

---

## 9. Base UI Components — Always Prefer Over Hand-Rolled

Check `components/ui/` before building anything new:

| Need | Use |
|---|---|
| Button | `components/ui/button.tsx` |
| Card surface | `components/ui/card.tsx` |
| Modal | `components/ui/dialog.tsx` |
| Bottom sheet | `components/ui/drawer.tsx` |
| Form field wrapper | `components/ui/field.tsx` |
| Text input | `components/ui/input.tsx` |
| OTP input | `components/ui/otp-input.tsx` |
| Tabs | `components/ui/tabs.tsx` |
| Toast | `components/ui/toast.tsx` |
| Radio | `components/ui/radio-group.tsx` |
| Side sheet | `components/ui/sheet.tsx` |

Compose these primitives; do not duplicate their structure inline.

---

## 10. Skeletons / Loading States

```tsx
<div className="animate-pulse space-y-4">
  <div className="h-4 w-2/5 rounded-md bg-slate-400" />
  <div className="h-3 w-full rounded-full bg-slate-300" />
  <div className="h-3 w-4/5 rounded-full bg-slate-300" />
</div>
```

Use `bg-slate-400` for darker skeleton elements, `bg-slate-300` for body lines.

---

## 11. Component File Structure

```tsx
// 1. Imports
import { cn } from "@/lib/utils";

// 2. Types / interfaces

// 3. Sub-components (if any) — named, not default
function SubThing({ ... }: Props) { ... }

// 4. Main export — always default
export default function MyComponent({ ... }: Props) { ... }
```

For base `components/ui/` primitives, use `React.forwardRef` + `cn()`.

---

## 12. What NOT to Do

- Do not use arbitrary colors (`text-red-500`, `bg-blue-100`) unless a semantic meaning demands it (errors = `text-destructive`, etc.)
- Do not use `style={{}}` inline styles — use Tailwind
- Do not add `shadow-lg`, `shadow-xl` casually
- Do not introduce new font families — only `font-sans` (Inter) and `font-display` (Inter Display) are configured
- Do not use `p-8` or larger padding on internal component elements without a strong reason
- Do not hardcode px/rem values — use the Tailwind scale
