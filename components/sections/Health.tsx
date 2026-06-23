import { Reveal, Section, SectionItem, HoverLift } from "@/components/motion";
import { SectionHeader, StatusDot, Tag } from "@/components/primitives";
import { Sparkline } from "@/components/Sparkline";

const SOURCES = [
  { name:"SEC EDGAR",       health:0.99, fresh:"2m",  vol:"412 docs",  trend:[9,10,9,11,10,12,11,12]  },
  { name:"FedRAMP Registry",health:0.97, fresh:"5m",  vol:"38 docs",   trend:[4,5,4,5,5,5,6,5]        },
  { name:"Crunchbase",      health:0.92, fresh:"11m", vol:"1.2k rows", trend:[14,16,15,13,12,11,10,10] },
  { name:"Hacker News",     health:0.88, fresh:"1m",  vol:"9.1k items",trend:[40,38,42,41,39,44,43,45] },
  { name:"GitHub Releases", health:0.95, fresh:"3m",  vol:"220 tags",  trend:[8,9,8,10,9,11,10,12]    },
  { name:"ArXiv CS.AI",     health:0.90, fresh:"8m",  vol:"340 papers",trend:[22,24,23,25,26,24,27,28] },
];

const ADAPTERS = [
  { name:"filings-ingest",  status:"operational", latency:"1.2s", queue:4  },
  { name:"search-demand",   status:"operational", latency:"0.8s", queue:0  },
  { name:"funding-db",      status:"degraded",    latency:"4.1s", queue:18 },
  { name:"press-scan",      status:"operational", latency:"2.0s", queue:2  },
  { name:"registry-watch",  status:"operational", latency:"0.9s", queue:0  },
  { name:"social-pulse",    status:"paused",      latency:"—",    queue:0  },
];

type StatusType = "operational"|"degraded"|"paused";
const statusTone: Record<StatusType,{dot:"done"|"warn"|"neutral";text:string}> = {
  operational:{ dot:"done",    text:"text-emerald-600" },
  degraded:   { dot:"warn",    text:"text-amber-600"   },
  paused:     { dot:"neutral", text:"text-ink-400"     },
};

export function Health() {
  return (
    <Section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        <div>
          <SectionHeader index="09" eyebrow="Source Health" title="Provenance and freshness across primary sources"
            description="Each source carries a health score derived from freshness, schema conformance, and provenance hash stability."
            meta={<Tag tone="muted">6 sources live</Tag>} />
          <div className="surface overflow-hidden rounded-2xl">
            <div className="hidden grid-cols-12 gap-3 border-b border-ink-900/[0.06] px-5 py-3 text-[11px] uppercase tracking-[0.14em] text-ink-400 sm:grid">
              <div className="col-span-4">Source</div>
              <div className="col-span-2">Health</div>
              <div className="col-span-2">Fresh</div>
              <div className="col-span-2">Volume</div>
              <div className="col-span-2 text-right">Trend</div>
            </div>
            {SOURCES.map((s,i) => (
              <Reveal key={s.name} delay={i*0.04}>
                <div className="grid grid-cols-12 items-center gap-3 border-b border-ink-900/[0.05] px-5 py-3.5 last:border-b-0 transition-colors hover:bg-white/[0.5]">
                  <div className="col-span-4 flex items-center gap-2">
                    <StatusDot tone={s.health>=0.95?"done":s.health>=0.9?"neutral":"warn"} />
                    <span className="text-[13px] text-ink-900 truncate">{s.name}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-1.5">
                      <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink-100">
                        <div className="absolute inset-y-0 left-0 rounded-full bg-indigo-500" style={{ width:`${s.health*100}%` }} />
                      </div>
                      <span className="tnum font-mono text-[10px] text-ink-500">{Math.round(s.health*100)}</span>
                    </div>
                  </div>
                  <div className="col-span-2 font-mono text-[12px] text-ink-600">{s.fresh}</div>
                  <div className="col-span-2 text-[12px] text-ink-600">{s.vol}</div>
                  <div className="col-span-2 flex justify-end">
                    <Sparkline data={s.trend} width={44} height={18} fill={false} />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div>
          <SectionHeader index="10" eyebrow="Adapter Health" title="The ingestion layer that keeps ARGUS honest"
            description="Adapters mirror external sources into the evidence graph. Their health is the floor under every claim."
            meta={<Tag tone="muted">5 of 6 nominal</Tag>} />
          <div className="space-y-3">
            {ADAPTERS.map(a => {
              const t = statusTone[a.status as StatusType];
              return (
                <SectionItem key={a.name}>
                  <HoverLift className="surface flex items-center justify-between rounded-xl px-5 py-4">
                    <div className="flex items-center gap-3">
                      <StatusDot tone={t.dot} pulse={a.status==="degraded"} />
                      <div>
                        <div className="font-mono text-[13px] text-ink-900">{a.name}</div>
                        <div className="text-[11px] text-ink-400">queue {a.queue} · p95 {a.latency}</div>
                      </div>
                    </div>
                    <span className={`text-[11px] uppercase tracking-[0.14em] ${t.text}`}>{a.status}</span>
                  </HoverLift>
                </SectionItem>
              );
            })}
          </div>
          <Reveal className="mt-6">
            <p className="text-[13px] leading-relaxed text-ink-500">
              Degradation on <span className="font-mono text-ink-700">funding-db</span> is throttling the Cohere-retreat investigation. ARGUS has marked that stream as single-source until the adapter recovers.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
