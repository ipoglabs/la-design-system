**PhoneNumberInput (snippet)**

>A compact phone number input with a country dial selector and sanitized digits-only value. Use this snippet for OTP flows, contact forms, and anywhere a concise phone field is preferred.

**Demo**: See the interactive snippet at [app/snippets/phone-number-input/page.tsx](app/snippets/phone-number-input/page.tsx#L1).

---

## Quick usage

Basic controlled example:

```tsx
import PhoneNumberInput from "@/components/phone-number-input";
import * as React from "react";

function Example() {
  const [digits, setDigits] = React.useState("");
  const [country, setCountry] = React.useState();

  return (
    <PhoneNumberInput
      value={digits}
      onChange={setDigits}
      country={country}
      onCountryChange={setCountry}
      placeholder="Mobile number"
    />
  );
}
```

Uncontrolled example (uses `defaultValue`):

```tsx
<PhoneNumberInput defaultValue="" defaultCountry="US" />
```

---

## Props

- `value?: string` — controlled digits-only value (no `+`, only digits).
- `defaultValue?: string` — uncontrolled initial digits.
- `onChange?: (digits: string) => void` — called with sanitized digits when value changes.
- `country?: Country` — controlled country object.
- `defaultCountry?: Country | string` — initial country; accepts ISO2 string or `Country` object.
- `onCountryChange?: (c: Country) => void` — called when user selects a country.
- `placeholder?: string` — input placeholder (default: `Phone number`).
- `disabled?: boolean` — disables the input.
- `className?: string` — wrapper class name.
- `inputRef?: React.Ref<HTMLInputElement>` — alternative ref for the underlying `<input>`.
- `id?: string` — id for the input (useful for labels).
- `label?: string` — visible label text (rendered as screen-reader-only if provided).
- `inputClassName?: string` — class applied directly to the `<input>`.
- `maxLength?: number` — maximum digits (default internal cap: 24 if not provided).
- `showFlag?: boolean` — whether to render flag in the country button (default: true).
- `countries?: Country[]` — override full country list.
- `onlyCountries?: string[]` — restrict picker to specific ISO2 codes.

`Country` shape (from `components/phone-number-input/countries.tsx`) is `{ code, name, dial, Flag }`.

---

## Component states & UX

The component exposes and/or displays the following states (and how to use them):

- Idle / Default
  - Input shows placeholder or current digits.
  - Country button shows selected dial (`+{dial}`) and an optional flag.

- Focused
  - When the `<input>` is focused it will show the configured focus styles (via `inputClassName` or the built-in classes).
  - Keyboard users can type digits; `inputMode="numeric"` hints mobile keyboards.

- Disabled
  - Pass `disabled` to render a disabled input (visual `opacity` + `cursor` styles apply).

- Country Picker Open
  - Clicking the country button opens the `CountryPicker`.
  - On desktop this is a modal/dialog; on mobile it renders as a bottom drawer.
  - Selecting a country updates the selected dial and calls `onCountryChange`.

- Paste sanitization
  - Pasted content is sanitized to digits-only and truncated to `maxLength`.

- Controlled vs Uncontrolled
  - Controlled: manage `value` externally and update via `onChange`.
  - Uncontrolled: provide `defaultValue` and let the component manage internal state.

Notes about errors & validation
- The component itself does not render a validation/error UI. For form validation:
  - Render an error message below the input controlled by parent state, and optionally apply an `inputClassName` to show an error border.

Formatting & E.164
- `onChange` returns digits-only (local part). If you need E.164 (`+{dial}{digits}`), compose it in the parent: `const e164 = `+${selected.dial}${digits}``.

Accessibility
- The country selector button uses `aria-haspopup="dialog"` and a clear `aria-label`.
- The input uses `inputMode="numeric"` and `pattern="[0-9]*"` to hint mobile keyboards.
- Pass `id` + `label` (or render an external `<label htmlFor={id}>`) to improve form semantics.

Keyboard interactions
- Type digits into the input.
- Use `Tab` to focus the country button and press `Enter`/`Space` to open the picker.
- Use arrow keys inside the picker (native focus) or type to search (if modifying the picker).

Styling & customization
- The component accepts `className` (wrapper) and `inputClassName` (input). Provide Tailwind utility classes to match your design system.
- If you want the input to match other shadcn inputs, pass the same classes via `inputClassName`.

Testing suggestions
- Add unit/interaction tests for:
  - Controlled/uncontrolled flows
  - Paste sanitization
  - Country selection updates and `onCountryChange` callback

---

If you'd like, I can also:
- Export a small helper `formatE164(country, digits)` and add an `onChangeE164` optional prop.
- Replace the fixed `pl-28` spacing with a measured / CSS-variable layout for robust responsiveness.
