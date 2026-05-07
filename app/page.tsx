import Link from "next/link";
import { CountryBadge } from "@/components/country/CountryBadge";

const pocs = [
  {
    href: "/phone-otp",
    label: "OTP Verification",
    description: "Single card, progressive inline reveal",
    tag: "v1",
  },
  {
    href: "/phone-otp-v2",
    label: "OTP Verification",
    description: "Same flow with SVG flag picker — PhoneNumberInput integration",
    tag: "v2",
  },
  {
    href: "/country-context-poc",
    label: "Country Context",
    description: "IP-based auto-detection with manual fallback — global route guard",
    tag: undefined,
  },
  {
    href: "/email-otp",
    label: "Email OTP Verification",
    description: "Single card — enter email, verify code, done",
    tag: undefined,
  },
  {
    href: "/donation",
    label: "Donation Flow",
    description: "Cause messaging, donation tiers, and payment step",
    tag: undefined,
  },
];

const snippets = [
  {
    href: "/snippets/toggle-group",
    label: "Toggle Group",
    description: "Single/multi-select, mandatory, disabled, icons — all in one group",
  },
  {
    href: "/snippets/typography",
    label: "Typography",
    description: "Type scale, weights, Inter vs Inter Display reference",
  },
  {
    href: "/snippets/button-variants",
    label: "Button Variants",
    description: "Variants, sizes, states and icon usage",
  },
  {
    href: "/snippets/responsive-dialog",
    label: "Responsive Dialog",
    description: "Bottom drawer — skeleton load, dynamic HTML, scroll-to-accept",
  },
  {
    href: "/snippets/rich-text-editor",
    label: "Rich Text Editor",
    description: "Teams-style composer — bold, italic, lists, quote, live preview",
  },
  {
    href: "/snippets/delete-account",
    label: "Delete Account Journey",
    description: "4-stage flow — danger zone, reasons, review, confirmation",
  },
  {
    href: "/snippets/landing-category",
    label: "Landing Category",
    description: "Landing page category snippet — placeholder for new concepts.",
  },
  {
    href: "/snippets/login",
    label: "Login",
    description: "Email / phone login snippet with validation and skeleton state",
  },
  {
    href: "/snippets/public-profile",
    label: "Public Profile",
    description: "Minimal public profile template",
  },
  {
    href: "/snippets/private-profile",
    label: "Private Profile",
    description: "Authenticated profile settings — info, contact, location, account",
  },
  {
    href: "/snippets/timeline",
    label: "Timeline",
    description: "Product history — releases, features & milestones in a lazy-loading right sheet",
  },
  {
    href: "/snippets/chat",
    label: "Chat",
    description: "Mobile-first messaging — conversation list, ad context header, live send",
  },
  {
    href: "/snippets/location-picker",
    label: "Location Picker",
    description: "GPS + search + radius picker — split pill trigger, responsive drawer/dialog",
  },
  {
    href: "/snippets/phone-number-input",
    label: "Phone Number Input",
    description: "Country picker with flag + dial code, formatted phone number field",
  },
  {
    href: "/snippets/switch-country",
    label: "Switch Country",
    description: "Country switcher overlay — list, search, select, persist",
  },
  {
    href: "/snippets/date-input",
    label: "Date Input",
    description: "Masked single-field date input — always emits ISO YYYY-MM-DD",
  },
  {
    href: "/snippets/icons",
    label: "Icon Collection",
    description: "Inline SVG icon set — outline/filled states, visual reference",
  },
];

function NavCard({
  href,
  label,
  description,
  tag,
}: {
  href: string;
  label: string;
  description: string;
  tag?: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3.5 hover:bg-accent/50 transition-colors group"
    >
      <div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">{label}</span>
          {tag && (
            <span className="text-xs font-mono text-muted-foreground/60 bg-muted px-1.5 py-0.5 rounded">
              {tag}
            </span>
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <span className="text-muted-foreground/30 group-hover:text-muted-foreground transition-colors text-sm">
        →
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <div className="flex flex-1 items-start justify-center">
      <div className="w-full max-w-lg px-6 py-20">

        <div className="mb-14 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">poc-next</h1>
            <p className="text-sm text-muted-foreground mt-1">
              UI/UX playground — components and experiments
            </p>
          </div>
          <CountryBadge />
        </div>

        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">POCs</p>
          <div className="space-y-2">
            {pocs.map((item) => (
              <NavCard key={item.href} {...item} />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-3">Snippets</p>
          <div className="space-y-2">
            {snippets.map((item) => (
              <NavCard key={item.href} {...item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
