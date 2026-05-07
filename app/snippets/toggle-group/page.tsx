"use client";
import { useState, ReactNode } from "react";
import {
  ToggleButtonGroup,
  ToggleGroupButton,
} from "@/components/toggle-group/CompoundToggleGroup";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal, LayoutGrid, List } from "lucide-react";

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

// ── Output display ────────────────────────────────────────────────────────────
function Output({ value }: { value: string[] }) {
  return (
    <p className="mt-3 text-xs text-slate-400">
      Output:{" "}
      <span className="font-mono text-slate-600">
        {value.length === 0 ? "[]" : `["${value.join('", "')}"]`}
      </span>
    </p>
  );
}

// ── Self-contained use-case components ────────────────────────────────────────
function Case1() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <ToggleButtonGroup title="Topics" onChange={setSelected}>
        {["React", "TypeScript", "CSS", "Testing", "DevOps"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case2() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <ToggleButtonGroup title="Sort by" singleSelect onChange={setSelected}>
        {["Newest", "Oldest", "Popular"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case3() {
  const [selected, setSelected] = useState<string[]>(["Grid"]);
  return (
    <>
      <ToggleButtonGroup title="View" singleSelect requireSelection value={selected} onChange={setSelected}>
        {["Grid", "List", "Compact"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case4() {
  const [showError, setShowError] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);
  function handleChange(values: string[]) {
    setSelected(values);
    if (values.length > 0) setShowError(false);
  }
  return (
    <>
      <ToggleButtonGroup
        title="Reason for contact"
        isMandatory
        errorMessage="Please select at least one reason."
        showError={showError}
        onChange={handleChange}
      >
        {["Support", "Billing", "Sales", "Other"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Button className="mt-4" variant="outline" onClick={() => setShowError(selected.length === 0)}>
        Validate
      </Button>
      <Output value={selected} />
    </>
  );
}

function Case5() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <ToggleButtonGroup title="Filters" disabledItems={["Archived", "Deleted"]} onChange={setSelected}>
        {["Active", "Archived", "Draft", "Deleted"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case6() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <ToggleButtonGroup title="Notifications" onChange={setSelected}>
        <ToggleGroupButton value="email">Email</ToggleGroupButton>
        <ToggleGroupButton value="sms" disabled>SMS (unavailable)</ToggleGroupButton>
        <ToggleGroupButton value="push">Push</ToggleGroupButton>
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case7() {
  const [selected, setSelected] = useState<string[]>([]);
  return (
    <>
      <ToggleButtonGroup title="View options" onChange={setSelected}>
        <ToggleGroupButton value="grid" icon={LayoutGrid}>Grid</ToggleGroupButton>
        <ToggleGroupButton value="list" icon={List}>List</ToggleGroupButton>
        <ToggleGroupButton value="settings" icon={SlidersHorizontal}>Settings</ToggleGroupButton>
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case8() {
  const [selected, setSelected] = useState<string[]>(["React", "CSS"]);
  return (
    <>
      <ToggleButtonGroup title="Interests" value={selected} onChange={setSelected}>
        {["React", "TypeScript", "CSS", "Testing"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

function Case9() {
  const [selected, setSelected] = useState<string[]>(["Pro"]);
  return (
    <>
      <ToggleButtonGroup title="Plan" singleSelect value={selected} onChange={setSelected}>
        {["Basic", "Pro", "Enterprise"].map((v) => (
          <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <div className="mt-3 flex items-center gap-3">
        <Output value={selected} />
        <Button variant="outline" onClick={() => setSelected(["Basic"])}>
          Reset to Basic
        </Button>
      </div>
    </>
  );
}

function Case10() {
  const [selected, setSelected] = useState<string[]>(["2"]);
  return (
    <>
      <ToggleButtonGroup title="Radius" singleSelect requireSelection value={selected} onChange={setSelected}>
        {["0.5", "1", "1.5", "2", "2.5", "3", "5"].map((v) => (
          <ToggleGroupButton key={v} value={v} size="mini">{v} km</ToggleGroupButton>
        ))}
      </ToggleButtonGroup>
      <Output value={selected} />
    </>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ToggleGroupPage() {
  return (
    <div className="p-6 max-w-2xl">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <h1 className="text-xl font-bold mb-1 text-stone-900">Toggle Group</h1>
      <p className="text-sm text-slate-500 mb-10">
        Compound toggle — single or multi-select, validation, icons, controlled/uncontrolled modes.
      </p>

      {/* ── Size Variants ──────────────────────────────────────────────────── */}
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Size Variants</h2>
      <div className="mb-12 rounded-xl border border-slate-200 bg-white px-6 py-5 grid grid-cols-2 gap-x-6 gap-y-5">
        {/* Mini */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Mini <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size=&quot;mini&quot;</code>
          </p>
          <ToggleButtonGroup singleSelect defaultValue={["React"]}>
            {["React", "Vue", "Svelte"].map((v) => (
              <ToggleGroupButton key={v} value={v} size="mini">{v}</ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
          <p className="text-[10px] text-slate-400 font-mono">px-2 · py-px · text-[10px]</p>
        </div>
        {/* Compact */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Compact <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size=&quot;compact&quot;</code>
          </p>
          <ToggleButtonGroup singleSelect defaultValue={["React"]}>
            {["React", "Vue", "Svelte"].map((v) => (
              <ToggleGroupButton key={v} value={v} size="compact">{v}</ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
          <p className="text-[10px] text-slate-400 font-mono">px-2.5 · py-0.5 · text-xs</p>
        </div>
        {/* Normal */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Normal <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size=&quot;default&quot;</code>
          </p>
          <ToggleButtonGroup singleSelect defaultValue={["React"]}>
            {["React", "Vue", "Svelte"].map((v) => (
              <ToggleGroupButton key={v} value={v}>{v}</ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
          <p className="text-[10px] text-slate-400 font-mono">px-4 · py-1 · text-sm</p>
        </div>
        {/* Large */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-500">
            Large <code className="bg-slate-100 px-1 rounded text-[10px] font-mono">size=&quot;lg&quot;</code>
          </p>
          <ToggleButtonGroup singleSelect defaultValue={["React"]}>
            {["React", "Vue", "Svelte"].map((v) => (
              <ToggleGroupButton key={v} value={v} size="lg">{v}</ToggleGroupButton>
            ))}
          </ToggleButtonGroup>
          <p className="text-[10px] text-slate-400 font-mono">px-5 · py-2 · text-base</p>
        </div>
      </div>

      {/* ── Use Cases ──────────────────────────────────────────────────────── */}
      <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Use Cases</h2>
      <div className="flex flex-col gap-5 mb-12">

        {/* 1. Multi-select */}
        <Section
          title="1 — Multi-select (default)"
          hint="Multiple items toggleable simultaneously. No selection limit."
        >
          <Case1 />
        </Section>

        {/* 2. Single-select */}
        <Section
          title="2 — Single-select"
          hint="Only one item active at a time. Clicking the active item deselects it."
        >
          <Case2 />
        </Section>

        {/* 3. Single-select + requireSelection */}
        <Section
          title="3 — Single-select, mandatory"
          hint="Cannot deselect the last active item — always one is selected."
        >
          <Case3 />
        </Section>

        {/* 4. Validation */}
        <Section
          title="4 — Mandatory with validation"
          hint="Error appears on submit with nothing selected. Auto-clears on first pick."
        >
          <Case4 />
        </Section>

        {/* 5. Disabled items from parent */}
        <Section
          title="5 — Disabled items (from parent)"
          hint="Parent passes disabledItems[] — no changes needed per button. Good for API-driven availability."
        >
          <Case5 />
        </Section>

        {/* 6. Per-button disabled */}
        <Section
          title="6 — Per-button disabled"
          hint="Each button owns its disabled state directly — for static or conditional cases."
        >
          <Case6 />
        </Section>

        {/* 7. With icons */}
        <Section
          title="7 — With icons"
          hint="Pass any component as icon — rendered right of the label."
        >
          <Case7 />
        </Section>

        {/* 8. Pre-selected (uncontrolled) */}
        <Section
          title="8 — Pre-selected (seeded via defaultValue)"
          hint="Seeded via defaultValue — component manages state after mount, no external wiring needed."
        >
          <Case8 />
        </Section>

        {/* 9. Controlled */}
        <Section
          title="9 — Controlled mode"
          hint="State lives outside — reset from API, sync with forms, or pre-populate."
        >
          <Case9 />
        </Section>

        {/* 10. Mini pills */}
        <Section
          title={`10 — Mini size (size="mini")`}
          hint="Compact pills for dense UIs — radius selectors, tag lists, inline filters."
        >
          <Case10 />
        </Section>

      </div>

      {/* ── Developer Guide ─────────────────────────────────────────────────── */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 flex flex-col gap-6">
        <h2 className="text-base font-semibold text-slate-800">Developer Guide</h2>

        {/* Import */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Import</p>
          <pre className="rounded-xl bg-slate-900 px-4 py-3 text-xs text-slate-100 overflow-x-auto">{`import {
  ToggleButtonGroup,
  ToggleGroupButton,
} from "@/components/toggle-group/CompoundToggleGroup";`}</pre>
        </div>

        {/* Quick usage */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Quick Usage</p>
          <pre className="rounded-xl bg-slate-900 px-4 py-3 text-xs text-slate-100 overflow-x-auto">{`// Multi-select
<ToggleButtonGroup onChange={(vals) => console.log(vals)}>
  <ToggleGroupButton value="react">React</ToggleGroupButton>
  <ToggleGroupButton value="ts">TypeScript</ToggleGroupButton>
</ToggleButtonGroup>

// Single-select, always one selected
<ToggleButtonGroup singleSelect requireSelection defaultValue={["grid"]}>
  <ToggleGroupButton value="grid">Grid</ToggleGroupButton>
  <ToggleGroupButton value="list">List</ToggleGroupButton>
</ToggleButtonGroup>

// Controlled
const [selected, setSelected] = useState<string[]>(["pro"]);
<ToggleButtonGroup singleSelect value={selected} onChange={setSelected}>
  <ToggleGroupButton value="basic">Basic</ToggleGroupButton>
  <ToggleGroupButton value="pro">Pro</ToggleGroupButton>
</ToggleButtonGroup>

// Mini pills
<ToggleGroupButton value="1" size="mini">1 km</ToggleGroupButton>

// Compact
<ToggleGroupButton value="opt" size="compact">Option</ToggleGroupButton>

// Large
<ToggleGroupButton value="opt" size="lg">Option</ToggleGroupButton>`}</pre>
        </div>

        {/* ToggleButtonGroup Props */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">ToggleButtonGroup Props</p>
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
                  ["title", "string", "—", "Label rendered above the buttons"],
                  ["singleSelect", "boolean", "false", "Limits selection to one item at a time"],
                  ["requireSelection", "boolean", "false", "Prevents deselecting the last selected item"],
                  ["defaultValue", "string[]", "[]", "Pre-selected values on mount (uncontrolled)"],
                  ["value", "string[]", "—", "Controlled selection — pair with onChange"],
                  ["onChange", "(v: string[]) => void", "—", "Fires on every selection change"],
                  ["isMandatory", "boolean", "—", "Shows * next to title"],
                  ["errorMessage", "string", "—", "Error text shown when showError is true"],
                  ["showError", "boolean", "false", "Whether the error message is visible"],
                  ["disabledItems", "string[]", "[]", "Values to disable from the parent level"],
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

        {/* ToggleGroupButton Props */}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">ToggleGroupButton Props</p>
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
                  ["value", "string", "—", "Unique identifier; tracked by the parent group"],
                  ["size", '"mini" | "compact" | "default" | "lg"', '"default"', "Controls pill height, padding, and text size"],
                  ["icon", "ElementType", "—", "Lucide or any icon component, rendered right of label"],
                  ["disabled", "boolean", "—", "Disables this specific button individually"],
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
              ["singleSelect + requireSelection", "Clicking the active item does nothing — value is never empty."],
              ["requireSelection in multi-select", "Once one item remains, clicking it is a no-op. All other items toggle freely."],
              ["disabledItems vs disabled", "disabledItems is driven from the parent — ideal for API-driven availability. Per-button disabled is for static cases."],
              ["Controlled vs Uncontrolled", "Pass value + onChange to go controlled. Use defaultValue to seed state without owning it. Never mix both."],
              ["showError ownership", "The component does not self-manage showError — the parent owns timing (on submit, on blur, etc)."],
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
