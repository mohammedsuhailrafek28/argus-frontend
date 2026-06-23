import { Reveal, Section, SectionItem } from "@/components/motion";
import { SectionHeader, Tag, Confidence } from "@/components/primitives";

const PLAYERS = [
  { name:"Anthropic", position:"Governance-anchored", vectors:{capability:0.82,distribution:0.61,governance:0.91,price:0.68}, confidence:0.86, trend:"advancing" },
  { name:"OpenAI",    position:"Gravity holder",       vectors:{capability:0.88,distribution:0.93,governance:0.64,price:0.55}, confidence:0.71, trend:"holding"   },
  { name:"Cohere",    position:"Vertical-retreating",  vectors:{capability:0.74,distribution:0.49,governance:0.70,price:0.72}, confidence:0.64, trend:"retreating" },
  { name:"Mistral",   position:"Open-weight challenger",vectors:{capability:0.69,distribution:0.44,governance:0.58,price:0.81},confidence:0.58, trend:"contested"  },
];
const VECTORS = [{key:"capability",label:"Capability"},{key:"distribution",label:"Distribution"},{key:"governance",label:"Governance"},{key:"price",label:"Price posture"}] as const;

export function CompetitiveIntelligence() {
  return (
    <Section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
      <SectionHeader index="06" eyebrow="Competitive Intelligence" title="Positioning across the vectors that decide enterprise share"
        description="ARGUS scores each player on four orthogonal vectors and reads the composite against the central thesis."
        meta={<div className="flex justify-end gap-2"><Tag tone="muted">4 players</Tag><Tag tone="muted">4 vectors</Tag></div>} />
      <SectionItem>
        <div className="surface overflow-hidden rounded-2xl">
          <div className="hidden grid-cols-12 gap-4 border-b border-ink-900/[0.06] px-6 py-4 text-[11px] uppercase tracking-[0.14em] text-ink-400 sm:grid">
            <div className="col-span-3">Player</div>
            {VECTORS.map(v => <div key={v.key} className="col-span-2">{v.label}</div>)}
            <div className="col-span-1 text-right">Conf.</div>
          </div>
          {PLAYERS.map((p,i) => (
            <Reveal key={p.name} delay={i*0.05}>
              <div className="grid grid-cols-12 items-center gap-4 border-b border-ink-900/[0.05] px-6 py-5 transition-colors last:border-b-0 hover:bg-white/[0.5]">
                <div className="col-span-3">
                  <div className="font-display text-[16px] font-medium tracking-tight text-ink-900">{p.name}</div>
                  <div className="mt-0.5 text-[12px] text-ink-500">
                    {p.position} · <span className={p.trend==="advancing"?"text-emerald-600":p.trend==="retreating"?"text-amber-600":"text-ink-500"}>{p.trend}</span>
                  </div>
                </div>
                {VECTORS.map(v => {
                  const val = p.vectors[v.key as keyof typeof p.vectors];
                  return (
                    <div key={v.key} className="col-span-2">
                      <div className="flex items-center gap-2">
                        <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink-100">
                          <div className="absolute inset-y-0 left-0 rounded-full bg-indigo-500" style={{ width:`${val*100}%` }} />
                        </div>
                        <span className="tnum font-mono text-[11px] text-ink-500 w-6 text-right">{Math.round(val*100)}</span>
                      </div>
                    </div>
                  );
                })}
                <div className="col-span-1 flex justify-end"><Confidence value={p.confidence} /></div>
              </div>
            </Reveal>
          ))}
        </div>
      </SectionItem>
      <Reveal className="mt-8">
        <p className="max-w-2xl text-[14px] leading-relaxed text-ink-600">
          The composite reads that <span className="text-ink-900">governance, not capability, is the decoupling vector</span>. Capability has converged near parity for the top two; defensibility now lives in the procurement surface.
        </p>
      </Reveal>
    </Section>
  );
}
