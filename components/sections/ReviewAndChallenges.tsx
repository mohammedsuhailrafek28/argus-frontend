import { Reveal, Section, SectionItem, HoverLift } from "@/components/motion";
import { SectionHeader, Tag, Confidence, Keyline } from "@/components/primitives";

const QUEUE = [
  { id:"REV-0142", title:"Ambiguous sourcing on sovereign-LLM demand signal", body:"Two procurement documents reference 'sovereign' without consistent definition. ARGUS flagged semantic drift.", severity:"high",   age:"12m",      confidence:0.41 },
  { id:"REV-0139", title:"Cohere retreat — single-source funding DB",          body:"Inferring retreat from one dataset; confidence below synthesis threshold until a second source corroborates.", severity:"medium", age:"38m",      confidence:0.52 },
  { id:"REV-0136", title:"OpenAI margin compression — interpretive challenge", body:"Alternative read: pricing convergence reflects expansion, not margin erosion. Retained for human judgment.",   severity:"medium", age:"1h 04m",   confidence:0.48 },
  { id:"REV-0131", title:"FedRAMP pacing inferred from registry lag",          body:"Pacing inferred from absence of registry update; absence is weak evidence by ARGUS convention.",               severity:"low",    age:"2h 11m",   confidence:0.57 },
];
const sevTone: Record<string,string> = {
  high:   "text-amber-700 bg-amber-50 border-amber-100",
  medium: "text-ink-700 bg-ink-100/60 border-ink-200",
  low:    "text-ink-500 bg-white border-ink-200",
};

const CHALLENGES = [
  { claim:"Enterprise governance is the decisive battleground", challenge:"Capability may re-diverge before Q3",         status:"resolved", outcome:"Retained"                },
  { claim:"OpenAI margin compression is structural",            challenge:"Convergence may reflect expansion",           status:"open",     outcome:"Under review"             },
  { claim:"Cohere vertical-retreat signals consolidation",      challenge:"Single-source funding DB",                    status:"open",     outcome:"Awaiting corroboration"   },
  { claim:"Procurement language is shifting to provenance",     challenge:"Semantic drift on 'sovereign'",               status:"resolved", outcome:"Retained with qualifier"  },
  { claim:"Developer churn to alternatives is falling",         challenge:"Cohort attrition lagging indicator",          status:"resolved", outcome:"Retained"                },
];

export function ReviewAndChallenges() {
  return (
    <Section className="border-y border-ink-900/[0.06] bg-white/[0.4]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHeader index="07" eyebrow="Human Review Queue" title="Where ARGUS deferred to judgment"
              description="Items held below the synthesis threshold — ambiguous sourcing, single-source inference, or interpretive challenges flagged for a human reader."
              meta={<Tag tone="muted">4 awaiting</Tag>} />
            <div className="space-y-3">
              {QUEUE.map(item => (
                <SectionItem key={item.id}>
                  <HoverLift className="surface rounded-xl p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="font-mono text-[11px] text-ink-400">{item.id}</span>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wide ${sevTone[item.severity]}`}>{item.severity}</span>
                          <span className="text-[11px] text-ink-400">{item.age}</span>
                        </div>
                        <h4 className="mt-2 text-[14px] font-medium leading-snug text-ink-900">{item.title}</h4>
                        <p className="mt-1.5 text-[13px] leading-relaxed text-ink-600">{item.body}</p>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="text-[10px] uppercase tracking-[0.14em] text-ink-400">Conf.</div>
                        <div className="mt-1"><Confidence value={item.confidence} /></div>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center gap-2 border-t border-ink-900/[0.05] pt-3">
                      <button className="rounded-lg bg-ink-900 px-3 py-1.5 text-[12px] text-white transition-colors hover:bg-indigo-500">Resolve &amp; synthesize</button>
                      <button className="rounded-lg border border-ink-200 px-3 py-1.5 text-[12px] text-ink-600 transition-colors hover:bg-white">Dismiss</button>
                    </div>
                  </HoverLift>
                </SectionItem>
              ))}
            </div>
          </div>

          <div>
            <SectionHeader index="08" eyebrow="Challenge Coverage" title="Adversarial tests against every claim"
              description="Each thesis was challenged; ARGUS records what was tested, whether it held, and how it was resolved." />
            <Reveal>
              <div className="surface overflow-hidden rounded-2xl">
                <div className="flex items-center justify-between px-6 py-4">
                  <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400">Coverage</span>
                  <span className="font-mono text-[13px] text-ink-700">3 / 5 resolved</span>
                </div>
                <Keyline />
                {CHALLENGES.map(c => (
                  <Reveal key={c.claim}>
                    <div className="border-b border-ink-900/[0.05] px-6 py-4 last:border-b-0">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-[13px] font-medium text-ink-900">{c.claim}</div>
                          <div className="mt-1 flex items-start gap-1.5 text-[12px] text-ink-500">
                            <span className="font-mono text-ink-400">↳</span>{c.challenge}
                          </div>
                        </div>
                        <span className={`shrink-0 inline-flex items-center gap-1 text-[11px] capitalize ${c.status==="resolved"?"text-emerald-600":"text-amber-600"}`}>
                          <span className="h-1.5 w-1.5 rounded-full bg-current" />{c.status}
                        </span>
                      </div>
                      <div className="mt-2 text-[11px] text-ink-400">{c.outcome}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
