"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Download,
  Loader2,
  Plus,
  Send,
  Settings,
  Trash2,
  Bell,
  Heart,
  Share2,
} from "lucide-react";

// ── Shared section wrapper ────────────────────────────────────────────────────
function Section({ title, hint, children }: { title: string; hint?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <p className="text-sm font-medium text-slate-700">{title}</p>
        {hint && <p className="text-xs text-slate-400 mt-0.5">{hint}</p>}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white px-5 py-4">
        {children}
      </div>
    </div>
  );
}

// ── Loading button demo ────────────────────────────────────────────────────────
function LoadingCase() {
  const [loading, setLoading] = useState(false);
  function trigger() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2200);
  }
  return (
    <div className="flex flex-wrap gap-3">
      <Button onClick={trigger} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Saving...
          </>
        ) : (
          "Save changes"
        )}
      </Button>
      <Button variant="outline" onClick={trigger} disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Loading...
          </>
        ) : (
          "Sync data"
        )}
      </Button>
    </div>
  );
}

// ── Destructive confirm demo ───────────────────────────────────────────────────
function DestructiveCase() {
  const [confirming, setConfirming] = useState(false);
  function arm() {
    setConfirming(true);
    setTimeout(() => setConfirming(false), 3000);
  }
  return (
    <div className="flex flex-wrap gap-3">
      {confirming ? (
        <>
          <Button variant="destructive" onClick={() => setConfirming(false)}>
            <Trash2 />
            Yes, delete it
          </Button>
          <Button variant="outline" onClick={() => setConfirming(false)}>
            Cancel
          </Button>
        </>
      ) : (
        <Button variant="outline" onClick={arm}>
          Delete account
        </Button>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ButtonVariantsPage() {
  return (
    <div className="p-6 max-w-2xl">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <h1 className="text-xl font-bold mb-1 text-stone-900">Button Variants</h1>
      <p className="text-sm text-slate-500 mb-10">
        All variants, sizes, states, and icon patterns — reference for consistent button usage across every layout.
      </p>

      {/* ── Size Variants ──────────────────────────────────────────────────── */}
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Size Variants</h2>
      <div className="mb-12 rounded-xl border border-slate-200 bg-white px-6 py-5 grid grid-cols-2 gap-x-6 gap-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Small <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size="sm"</code>
          </p>
          <Button size="sm">Continue</Button>
          <p className="text-[10px] text-slate-400 font-mono">h-9 · px-3 · text-sm</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Default <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size="default"</code>
          </p>
          <Button>Continue</Button>
          <p className="text-[10px] text-slate-400 font-mono">h-10 · px-4 · text-sm</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Large <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size="lg"</code>
          </p>
          <Button size="lg">Continue</Button>
          <p className="text-[10px] text-slate-400 font-mono">h-11 · px-8 · text-sm</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Icon <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size="icon"</code>
          </p>
          <Button size="icon" aria-label="Settings"><Settings /></Button>
          <p className="text-[10px] text-slate-400 font-mono">h-10 · w-10 · square</p>
        </div>
      </div>

      {/* ── Use Cases ──────────────────────────────────────────────────────── */}
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Use Cases</h2>
      <div className="flex flex-col gap-5 mb-12">

        {/* 1. All variants */}
        <Section
          title="1 — All Variants"
          hint="Six semantic variants. One primary CTA max per view — everything else steps down."
        >
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </Section>

        {/* 2. Disabled */}
        <Section
          title="2 — Disabled state"
          hint="Applies pointer-events-none + opacity-50. Works on all variants."
        >
          <div className="flex flex-wrap gap-3">
            <Button disabled>Default</Button>
            <Button variant="destructive" disabled>Destructive</Button>
            <Button variant="outline" disabled>Outline</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="ghost" disabled>Ghost</Button>
          </div>
        </Section>

        {/* 3. Loading */}
        <Section
          title="3 — Loading state"
          hint="Replace button content with a Loader2 spinner + label. Disable the button while pending."
        >
          <LoadingCase />
        </Section>

        {/* 4. Leading icon */}
        <Section
          title="4 — Leading icon"
          hint="Icon before label — clarifies the action type. Most common pattern."
        >
          <div className="flex flex-wrap gap-3">
            <Button><Plus /> New project</Button>
            <Button variant="outline"><Download /> Export</Button>
            <Button variant="secondary"><Bell /> Subscribe</Button>
            <Button variant="destructive"><Trash2 /> Delete</Button>
          </div>
        </Section>

        {/* 5. Trailing icon */}
        <Section
          title="5 — Trailing icon"
          hint="Icon after label — signals direction or flow. Best for navigation and send actions."
        >
          <div className="flex flex-wrap gap-3">
            <Button>Continue <ArrowRight /></Button>
            <Button variant="outline">Share <Share2 /></Button>
            <Button variant="secondary">Send <Send /></Button>
          </div>
        </Section>

        {/* 6. Icon only */}
        <Section
          title="6 — Icon only (size=icon)"
          hint="Square button for toolbar actions. Always add aria-label for accessibility."
        >
          <div className="flex flex-wrap gap-3">
            <Button size="icon" aria-label="Settings"><Settings /></Button>
            <Button size="icon" variant="outline" aria-label="Download"><Download /></Button>
            <Button size="icon" variant="ghost" aria-label="Like"><Heart /></Button>
            <Button size="icon" variant="secondary" aria-label="Share"><Share2 /></Button>
            <Button size="icon" variant="destructive" aria-label="Delete"><Trash2 /></Button>
          </div>
        </Section>

        {/* 7. Destructive confirm */}
        <Section
          title="7 — Destructive confirm pattern"
          hint="Two-step: neutral trigger arms the destructive state. Auto-disarms after 3 s. Click to try."
        >
          <DestructiveCase />
        </Section>

      </div>

      {/* ── Developer Guide ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col gap-6">
        <h2 className="text-base font-semibold text-slate-800">Developer Guide</h2>

        {/* Import */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Import</p>
          <pre className="rounded-xl bg-slate-900 px-4 py-3 text-xs text-slate-100 overflow-x-auto">{`import { Button } from "@/components/ui/button";`}</pre>
        </div>

        {/* Quick usage */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quick Usage</p>
          <pre className="rounded-xl bg-slate-900 px-4 py-3 text-xs text-slate-100 overflow-x-auto">{`// Default primary CTA
<Button>Save changes</Button>

// Variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Learn more</Button>
<Button variant="ghost">View</Button>
<Button variant="link">Read more</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Settings"><Settings /></Button>

// With icon
<Button><Plus /> New project</Button>
<Button>Continue <ArrowRight /></Button>

// Loading
<Button disabled={loading}>
  {loading ? <><Loader2 className="animate-spin" /> Saving...</> : "Save"}
</Button>

// Render as link (asChild)
<Button asChild>
  <a href="/dashboard">Go to dashboard</a>
</Button>`}</pre>
        </div>

        {/* Props table */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Props</p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="pb-2 pr-4 font-semibold">Prop</th>
                  <th className="pb-2 pr-4 font-semibold">Type</th>
                  <th className="pb-2 pr-4 font-semibold">Default</th>
                  <th className="pb-2 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {[
                  ["variant", '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"', '"default"', "Visual weight and semantic meaning"],
                  ["size", '"default" | "sm" | "lg" | "icon"', '"default"', "Height, padding, and shape of the button"],
                  ["asChild", "boolean", "false", "Merges button props onto its child element via Radix Slot"],
                  ["disabled", "boolean", "false", "Blocks interaction and reduces opacity"],
                  ["className", "string", "—", "Merged via cn() — safe to extend or override"],
                ].map(([prop, type, def, desc]) => (
                  <tr key={prop} className="border-b border-slate-100">
                    <td className="py-2 pr-4 font-mono text-slate-800">{prop}</td>
                    <td className="py-2 pr-4 font-mono text-violet-600">{type}</td>
                    <td className="py-2 pr-4 font-mono text-slate-400">{def}</td>
                    <td className="py-2 text-slate-600">{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Behaviour notes */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Behaviour Notes</p>
          <ul className="flex flex-col gap-2 text-xs text-slate-600">
            {[
              ["One primary per view", "Never place two default buttons side by side. Use outline or ghost for secondary actions."],
              ["icon size auto-handled", "The base class applies [&_svg]:size-4 — never set width/height on the icon manually."],
              ["asChild for links", "Wrap an <a> or Next.js <Link> with asChild to get full button styling on a real anchor element."],
              ["Loading pattern", "Set disabled={loading} while async work is pending — prevents double-submit without extra state."],
              ["Destructive confirm", "Always make destructive actions two-step. Never trigger delete on a single click."],
            ].map(([term, desc]) => (
              <li key={term} className="flex gap-2">
                <code className="font-mono text-violet-600 flex-none shrink-0">{term}</code>
                <span>— {desc}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
