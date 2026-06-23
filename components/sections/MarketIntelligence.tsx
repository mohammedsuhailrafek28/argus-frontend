import { Reveal, Section, SectionItem, HoverLift } from "@/components/motion";
import { SectionHeader, Tag, StatusDot, Keyline } from "@/components/primitives";
import { Sparkline } from "@/components/Sparkline";

const SIGNALS = [
  { label: "Sovereign LLM queries", delta: "+38%", window: "12-week", tone: "rising" as const, data: [12,14,13,16,19,22,26,31,34,38,41,44], note: "Financial services procurement language shifting toward provenance." },
  { label: "Developer churn to alternatives", delta: "−6%", window: "8-week", tone: "falling" as const, data: [22,21,20,19,18,18,17,16], note: "Stickiness improved post pricing convergence; retention stabilized." },
  { label: "Enterprise deal velocity", delta: "+11%", window: "6-week", tone: "rising" as const, data: [30,31,33,34,36,38,40,42], note: "Median days-to-close compressed; governance review is the new gate." },
  { label: "Challenger funding cadence", delta: "−14%", window: "12-week", tone: "falling" as const, data: [18,17,17,16,15,16,14,13,13,12,11,10], note: "Mid-tier provider rounds elongating; consolidation pressure." },
];

const DEMAND = [
  { term: "sovereign LLM", share: 0.34 },
  { term: "enterprise governance", share: 0.28 },
  { term: "model provenance", share: 0.22 },
  { term: "audit-ready inference", share: 0.16 },
  { term: "vertical retreat", share: 0.12 },
];

export function MarketIntelligence() {
  return (
    <Section className="border-y border-ink-900/[0.06] bg-white/[0.4]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
        <SectionHeader index="03" eyebrow="Market Intelligence" title="Demand and adversarial signals, triangulated"
          description="ARGUS continuously weighs search demand, procurement language, and competitive motion into a single directional read."
          meta={<div className="text-right text-[12px] text-ink-500"><div>412 sources scanned</div><div className="text-ink-400">refreshed 4m ago</div></div>} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {SIGNALS.map(s => (
            <SectionItem key={s.label}>
              <HoverLift className="surface h-full rounded-2xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">{s.window}</div>
                    <div className="mt-1.5 text-[15px] font-medium text-ink-900">{s.label}</div>
                  </div>
                  <div className={`flex items-center gap-1.5 font-mono text-[13px] ${s.tone === "rising" ? "text-emerald-600" : "text-amber-600"}`}>
                    <StatusDot tone={s.tone === "rising" ? "done" : "warn"} />
                    {s.delta}
                  </div>
                </div>
                <div className="mt-6 w-full">
                  <Sparkline data={s.data} width={400} height={56} stroke={s.tone === "rising" ? "#059669" : "#3730A3"} />
                </div>
                <p className="mt-5 text-[13px] leading-relaxed text-ink-600">{s.note}</p>
              </HoverLift>
            </SectionItem>
          ))}
        </div>
        <Reveal className="mt-10"><Keyline /></Reveal>
        <Reveal className="mt-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-4">Demand Surface</div>
              <h3 className="font-display text-[22px] font-medium tracking-tight text-ink-900">The language buyers are converging on</h3>
            </div>
            <div className="surface rounded-2xl p-6">
              <div className="space-y-5">
                {DEMAND.map(d => (
                  <div key={d.term} className="flex items-center gap-5">
                    <span className="w-44 shrink-0 text-[14px] text-ink-700">{d.term}</span>
                    <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-ink-100">
                      <div className="absolute inset-y-0 left-0 rounded-full bg-indigo-500" style={{ width: `${d.share*100}%` }} />
                    </div>
                    <span className="tnum w-10 text-right font-mono text-[12px] text-ink-500">{Math.round(d.share*100)}%</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center gap-2">
                <Tag tone="muted">5 dominant terms</Tag><Tag tone="muted">from 312 documents</Tag>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
