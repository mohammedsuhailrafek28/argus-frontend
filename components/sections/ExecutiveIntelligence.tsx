import { Reveal, Section, SectionItem } from "@/components/motion";
import { SectionHeader, Confidence, Keyline, Tag } from "@/components/primitives";
import { Sparkline } from "@/components/Sparkline";

const THESES = [
  { rank: "01", title: "Enterprise governance is the decisive battleground — not raw capability.", body: "Procurement in regulated sectors now indexes model provenance, auditability, and data residency above benchmark scores. Anthropic's posture is advantaged here through Q2.", confidence: 0.86, streams: 3, trend: [0.42,0.48,0.55,0.59,0.64,0.71,0.78,0.86] },
  { rank: "02", title: "OpenAI retains developer gravity, but margin compression is structural.", body: "API price elasticity is being absorbed into revenue rather than retention. Cohort data suggests usage growth outpacing net revenue per account.", confidence: 0.71, streams: 2, trend: [0.38,0.44,0.5,0.53,0.55,0.6,0.66,0.71] },
  { rank: "03", title: "Cohere's vertical-retreat signals consolidation pressure on mid-tier providers.", body: "Two challenger retreats in adjacent verticals corroborate a narrowing path for model-only vendors without distribution.", confidence: 0.64, streams: 2, trend: [0.5,0.52,0.51,0.49,0.6,0.62,0.63,0.64] },
];

export function ExecutiveIntelligence() {
  return (
    <Section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
      <SectionHeader index="02" eyebrow="Executive Intelligence" title="The three theses ARGUS is prepared to defend"
        description="Each thesis is the synthesis of multiple independent investigations, stress-tested against recorded challenges."
        meta={<div className="flex items-center gap-2"><Tag tone="accent">Synthesized</Tag><Tag tone="muted">3m ago</Tag></div>} />
      <Reveal><Keyline /></Reveal>
      <div className="divide-y divide-ink-900/[0.06]">
        {THESES.map(t => (
          <SectionItem key={t.rank}>
            <article className="group grid grid-cols-12 gap-6 py-8 transition-colors hover:bg-white/[0.4]">
              <div className="col-span-1"><span className="font-mono text-[12px] text-ink-400">{t.rank}</span></div>
              <div className="col-span-12 sm:col-span-7">
                <h3 className="font-display text-[18px] font-medium leading-snug tracking-tight text-ink-900">{t.title}</h3>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ink-600">{t.body}</p>
                <div className="mt-4 flex items-center gap-2"><Tag tone="muted">{t.streams} streams</Tag><Tag tone="muted">Challenged</Tag></div>
              </div>
              <div className="hidden sm:col-span-3 sm:flex sm:flex-col sm:justify-center">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400">Confidence</span>
                  <Confidence value={t.confidence} />
                </div>
                <div className="mt-3"><Sparkline data={t.trend} width={180} height={36} /></div>
              </div>
              <div className="hidden sm:col-span-1 sm:flex sm:items-start sm:justify-end">
                <span className="text-ink-300 transition-colors group-hover:text-indigo-500">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </article>
          </SectionItem>
        ))}
      </div>
    </Section>
  );
}
