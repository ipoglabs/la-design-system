# poc-next — Project Context & Memory

## What This Is
A UI/UX playground and showcase app built with Next.js. Each experiment is a self-contained POC accessible via the home page.

## Stack
- Next.js 16.2.3 (app router — note: breaking changes from older versions)
- React 19.2.4
- TypeScript
- Tailwind CSS v4
- Radix UI (slot), CVA, clsx, tailwind-merge, lucide-react

## Project Structure
```
app/
  page.tsx                      → Home — sectioned nav (POCs + Snippets), CountryBadge top-right
  phone-otp/page.tsx            → single card flow
  country-context-poc/page.tsx  → country detection demo + reset button
  country-select/page.tsx       → standalone manual country picker (deep-link safe)
  snippets/
    typography/page.tsx              → type scale, weight scale, Inter vs Display, italic, guidelines
    button-variants/page.tsx         → placeholder (WIP)
    responsive-dialog/page.tsx       → TermsResponsiveDialog demo
    rich-text-editor/page.tsx        → side-by-side composer + live preview
    toggle-group/page.tsx            → compound toggle: single/multi, mandatory, disabled, icons
    chat/page.tsx                    → mobile-first classifieds chat; block/delete; sanitised input
    delete-account/page.tsx          → Danger Zone CTA → eligibility check → confirm route
    delete-account/confirm/page.tsx  → 3-stage flow: feedback → review → goodbye
    landing-category/page.tsx        → 9 gradient category tiles + CollapsiblePanel colour ref
    login/page.tsx                   → email/phone toggle login; validation; password show/hide; toast
    icons/page.tsx                   → icon gallery of all project SVGs
    phone-number-input/page.tsx      → PhoneNumberInput demo (controlled + filtered countries)
    public-profile/page.tsx          → full public profile: listings/reviews/contact tabs
    private-profile/page.tsx         → authenticated settings: info, contact, location, account, danger zone
components/
  country/
    CountryDetector.tsx         → client: IP fetch via ipinfo.io → cookie write → refresh; renders OverlayCountrySelect on failure
    CountryProvider.tsx         → React context — wraps children, exposes useCountry()
    CountryBadge.tsx            → passive flag+name display, reads useCountry()
    ResetButton.tsx             → dev utility — clears cookies, re-triggers detection
  # phone-otp/ (v1) removed → __trash__/
  phone-otp/
    PhoneOtpCard.tsx              → entire v2 flow in one component
  email-otp/
    EmailOtpCard.tsx              → single card, 3 stages, maskMode prop
  collapsible/
    CollapsiblePanel.tsx          → animated expand/collapse panel
  toggle-group/
    CompoundToggleGroup.tsx       → ToggleButtonGroup + ToggleGroupButton (compound context)
  phone-number-input/
    PhoneNumberInput.tsx          → full-feature phone input with country picker
    CountryPicker.tsx             → flag + dial code picker overlay
    flags.tsx                     → SVG flag components
    countries.tsx                 → country list for phone input
  responsive-dialog/
    TermsDrawer.tsx               → bottom sheet / dialog; skeleton load; scroll-to-accept
    MessageDrawer.tsx             → message/contact drawer (used in public-profile)
  rich-text-editor/
    RichTextEditor.tsx            → contentEditable composer
    RichTextViewer.tsx            → read-only HTML renderer
  ui/
    button.tsx / input.tsx / card.tsx / label.tsx / badge.tsx
    otp-input.tsx                 → 6-digit OTP, auto-submit, error shake
    country-select.tsx            → CountrySelect (canonical)
    dialog.tsx / drawer.tsx       → shadcn primitives
    field.tsx                     → Field, FieldLabel, FieldDescription
    radio-group.tsx               → Radix RadioGroup wrapper
    tabs.tsx                      → Radix Tabs wrapper
    toast.tsx                     → Toast notification
lib/
  utils.ts                      → cn(), formatPhone(), maskEmail(), EmailMaskMode type
  validation.ts                 → isValidEmail(), isValidPhone()
  constants.ts                  → VALID_OTP
  country-context.ts            → COUNTRY_COOKIE, PENDING_COOKIE, SUPPORTED_CODES, isSupportedCountry()
  country-cookie.ts             → commitCountry(), clearCountryCookies()
  data/
    countries.ts                → COUNTRIES array + Country type (canonical, 6 countries)
  hooks/
    useResendTimer.ts           → 30s countdown hook
  stores/
    deleteAccountStore.ts       → Zustand store for delete account journey
middleware.ts                   → edge route guard (cookie check + countryPending flag)
md/
  context.md                    → project memory (this file)
  about-me.md                   → user profile + design philosophy
  country-context-poc.md        → architecture plan (Option A + C, sequence diagram)
  features/
    country-detection-ipinfo.md → full feature doc (principle, tech flow, UX, future scope)
public/
```

## Conventions
- New POC = new folder under `app/` with a `page.tsx`, and components under `components/<poc-name>/`
- Home page (`app/page.tsx`) is updated manually to add links to new POCs
- Tailwind utility-first, minimal component abstraction
- Shared UI primitives go in `components/ui/`

## Dev Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — lint

---

## Completed POCs



### 2. Phone OTP Card — `/phone-otp` (single card flow)
Progressive inline card — no page transitions, full flow in one component:
- Phone entry → OTP verify → Summary — all in one `PhoneOtpCard.tsx`
- Supports 1 Primary + 2 Secondary numbers (up to 3 verified entries)
- Verified numbers stack as locked rows above the active card while adding more
- Summary screen shows all verified numbers + dashed "Add another" button (hidden when max reached)
- OTP auto-submits on 6th digit → 700ms "Verifying…" state → success or error shake
- Component: `components/phone-otp/PhoneOtpCard.tsx`

---

## Snippets

### Typography — `/snippets/typography`
Self-hosted Inter font reference page. Sections:
1. Type scale — Display · H1–H6 · Body LG/MD/SM · Caption (with family, weight, use annotations)
2. Weight scale — Inter Variable 100–900
3. Inter vs Inter Display — optical comparison at large size
4. Italic variants — 6 key weights
5. Usage guidelines — 6 rules for hierarchy consistency

### Button Variants — `/snippets/button-variants`
Placeholder — scaffolded, ready to build out.

### 3. Country Context — `/country-context-poc`
IP-based country detection with manual fallback. Global route guard — no route accessible until country is resolved.
- **Detection cascade:** ipinfo.io (free, HTTPS) → manual overlay → cookie (30 days)
- **Middleware** (`middleware.ts`) — reads cookie; sets `countryPending=1` if missing; Option A header path built in
- **Layout gate** — `await cookies()` in async RSC; children only render inside `<CountryProvider>`
- **`CountryDetector`** — client component; 5s timeout on IP fetch; `router.refresh()` on success; renders `<OverlayCountrySelect>` on failure
- **`OverlayCountrySelect`** (`components/overlay-country-select/`) — blocking fullscreen picker; no dismiss without selection
- **`CountryBadge`** — top-right of home page; reads `useCountry()` context
- **Option A upgrade** — set `COUNTRY_HEADER` env var; middleware sets cookie server-side; zero client detection
- Architecture doc: `md/country-context-poc.md`
- Full feature doc: `md/features/country-detection-ipinfo.md`

---

## Session Log

### 2026-04-10 — Session 1
- Project explored and memory system initialized
- Memory stored in `md/context.md` for project-level persistence
- Repo memory pointer set up at `/memories/repo/poc-next.md`
- Workflow established: say "update memory" at end of session

### 2026-04-10 — Session 2
- **Refactored v1** (`/phone-otp`): split god component into view components + hook + SuccessIcon
- Replaced custom styles with shadcn CSS variable system
- Added shadcn UI primitives: `input`, `card`, `label`, `badge`
- Reset `button.tsx` to standard shadcn; updated `globals.css` with full zinc theme + dark mode
- **Built** (`/phone-otp`): single card flow (Option C design)
  - Progressive inline reveal — no page transitions, no animations
  - Supports 1 Primary + 2 Secondary verified numbers
  - `PhoneOtpCard.tsx` — entire flow in one component
- Updated home page to link both v1 and v2

### 2026-04-10 — Session 3
- **Best practice + reusability refactor (all 5 fixes, zero errors):**
  1. Moved `COUNTRIES` + `Country` type → `lib/data/countries.ts` (canonical)
  2. Moved `CountrySelect` component → `components/ui/country-select.tsx`
  3. Old `components/phone-otp/CountrySelect.tsx` → barrel re-export (backward compat)
  4. Extracted `formatPhone()` → `lib/utils.ts` (removed 3 inline duplicates)
  5. Extracted `VALID_OTP` → `lib/constants.ts` (removed 2 inline duplicates)
  6. Removed `"use client"` from `lib/hooks/useResendTimer.ts` (hooks don't need it)
  - Both v1 and v2 now import from canonical lib locations
- **v2 cleanup round 2 (4 fixes):**
  1. Moved `OtpInput` → `components/ui/otp-input.tsx` (canonical); `components/phone-otp/OtpInput.tsx` → barrel re-export
  2. `PhoneOtpCard.tsx` updated to import `OtpInput` from canonical `@/components/ui/otp-input`
  3. `formatPhone` now used in v2 (was missing)
  4. `VALID_OTP` constant used in OTP hint text in v2
- **Native select + compact display in v2:**
  - Replaced custom `CountrySelect` component in v2 with overlay pattern
  - Visible div shows compact `IN +91` format; transparent `<select>` sits on top for interaction
  - Full country names still available in dropdown options for discoverability
  - `aria-label="Country code"` added for accessibility

### 2026-04-10 — Session 4
- **OTP v2 UX improvement:**
  - `OtpInput` height matched to phone input (`h-10`, `text-lg`) — consistent row sizing
  - Added `disabled` prop to `OtpInput` — fades + blocks during verification
  - 700ms `verifying` state in `PhoneOtpCard` — shows "Verifying…" after 6th digit before resolving
- **Fonts — Inter self-hosted:**
  - Dropped Geist Sans; registered `InterVariable.woff2` + `InterVariable-Italic.woff2` via `next/font/local` as `--font-inter` (body)
  - Registered `InterDisplay` all 9 weights × 2 styles as `--font-inter-display` (display headings)
  - Kept Geist Mono for code contexts
  - `globals.css` updated: `--font-sans`, `--font-display`, `--font-mono`; `font-display` available as Tailwind utility
- **Home page redesign:** Sectioned layout with **POCs** and **Snippets** groups, card-style nav links
- **`/snippets/typography` created:** 5 sections — type scale (Display → Caption), weight scale (100–900), Inter vs Inter Display comparison, italic variants, usage guidelines
- **`/snippets/button-variants` scaffolded:** Placeholder with "coming soon" — ready to build out

### 2026-04-11 — Session 5
- **Country Context POC built** (`/country-context-poc`):
  - `lib/country-context.ts` — constants, types, `isSupportedCountry()` guard
  - `middleware.ts` — edge route guard; cookie check → pending flag → Option A header path
  - `components/country/CountryDetector.tsx` — ipinfo.io IP fetch, 5s timeout, cookie write, `router.refresh()`
  - `components/overlay-country-select/index.tsx` — blocking fullscreen manual picker (merged from CountrySelectOverlay)
  - `components/country/CountryProvider.tsx` — React context + `useCountry()` hook
  - `components/country/CountryBadge.tsx` — passive flag+name display top-right
  - `components/country/ResetButton.tsx` — dev utility, clears cookies
  - `app/layout.tsx` updated — async RSC, `await cookies()`, hard gate on `countryContext`
  - `app/country-context-poc/page.tsx` — demo page with detected country details + reset
  - Home page updated — `CountryBadge` top-right, Country Context in POCs list
- **Architecture documented** in `md/country-context-poc.md` (plan + mermaid sequence diagram)
- **Feature documented** in `md/features/country-detection-ipinfo.md` (6 sections, new-dev friendly)
- **About-me saved** in `md/about-me.md` — role, philosophy, guiding principle
- **User profile updated** in `/memories/user-profile.md` — role + design philosophy refined
- Key principle locked in: *"Less, but better."*

### 2026-04-12 — Session 6 (current)
- Memory updated (this entry)

### 2026-04-13 (Session 7)
- `PhoneOtpCard` documented in `md/component/phone-otp.md`
- Delete-with-confirm added to verified number rows
- JSDoc + `// TODO: [API]` markers added to PhoneOtpCard

### 2026-04-14 (Session 8)
- Email OTP POC built (`/email-otp`, `EmailOtpCard`) — `md/component/email-otp.md`
- Rich Text Editor snippet (`/snippets/rich-text-editor`) — `md/component/rich-text-editor.md`
- Responsive Dialog snippet (`/snippets/responsive-dialog`, `TermsDrawer`)
- Design System section added to home + `/design-system/typography`
- `components/ui/dialog.tsx` + `components/ui/drawer.tsx` added

### 2026-04-15 (Session 9)
- Delete Account Journey (`/snippets/delete-account` + `/confirm`):
  - `lib/stores/deleteAccountStore.ts` — Zustand store (stage, reasons, details, confirmed, isLoading, error)
  - 3-stage confirm flow: feedback (reason chips) → review (checkbox ack) → goodbye
  - `md/concept/delete-account-journey-analysis.md` added
- Rich Text Editor toolbar polish for mobile

### 2026-04-16 (Session 10)
- Phone OTP v1 removed → moved to `__trash__/`
- Toggle Group snippet (`/snippets/toggle-group`, `CompoundToggleGroup.tsx`)
  - Compound pattern: `ToggleButtonGroup` + `ToggleGroupButton`
  - single/multi-select, requireSelection, disabled items, icons

### 2026-04-23–24 (Sessions 11–12)
- Chat snippet (`/snippets/chat`):
  - Mobile-first: conversation list + chat view, two-panel on desktop
  - Block/delete with ConfirmDialog, time-tab filter (Recent/3mo/6mo/All)
  - Input sanitisation (`sanitizeMessage`) — blocks HTML, JS URIs, SQL patterns
  - `components/ui/tabs.tsx` added
- `md/features/chat.md` written

### 2026-05-01 (Session 13)
- Private Profile snippet (`/snippets/private-profile`):
  - Mobile-first iOS-settings layout: glass sticky header, compact avatar row, floating section labels
  - Stacked field style: xs semibold label → sm bold value
  - Danger Zone wired to `useDeleteAccountStore` → routes to delete-account confirm flow
- New snippets catalogued (built earlier, not previously logged):
  - `/snippets/landing-category` — gradient tiles + CollapsiblePanel
  - `/snippets/login` — email/phone toggle, validation, password reveal, toast
  - `/snippets/icons` — icon gallery
  - `/snippets/phone-number-input` — PhoneNumberInput demo
  - `/snippets/public-profile` — full public profile (listings, reviews, contact tabs)
  - `/snippets/security/blocked` — blocked account page with event metadata
- New components catalogued:
  - `components/collapsible/CollapsiblePanel.tsx`
  - `components/phone-number-input/` (PhoneNumberInput, CountryPicker, flags, countries)
  - `components/ui/field.tsx`, `radio-group.tsx`, `toast.tsx`
  - `lib/validation.ts` — isValidEmail(), isValidPhone()
- Memory fully updated (repo + context.md)
