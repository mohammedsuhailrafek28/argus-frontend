import { Reveal, Section, SectionItem } from "@/components/motion";
import { SectionHeader, Tag } from "@/components/primitives";

type Entity = { id: string; x: number; y: number; label: string; kind: "company"|"market" };
const ENTITIES: Entity[] = [
  { id:"anthropic", x:400, y:80,  label:"Anthropic",    kind:"company" },
  { id:"openai",    x:620, y:170, label:"OpenAI",       kind:"company" },
  { id:"cohere",    x:180, y:170, label:"Cohere",       kind:"company" },
  { id:"fin",       x:400, y:250, label:"Fin. Services",kind:"market"  },
  { id:"proc",      x:250, y:330, label:"Procurement",  kind:"market"  },
  { id:"dev",       x:560, y:330, label:"Developers",   kind:"market"  },
  { id:"sov",       x:400, y:390, label:"Sovereign LLM",kind:"market"  },
];
type RelType = "competes"|"serves"|"consolidates"|"retreats";
const RELS: {from:string;to:string;type:RelType}[] = [
  {from:"anthropic",to:"openai",   type:"competes"},
  {from:"anthropic",to:"cohere",   type:"competes"},
  {from:"anthropic",to:"fin",      type:"serves"},
  {from:"openai",   to:"dev",      type:"serves"},
  {from:"cohere",   to:"dev",      type:"retreats"},
  {from:"fin",      to:"proc",     type:"consolidates"},
  {from:"proc",     to:"sov",      type:"consolidates"},
  {from:"fin",      to:"sov",      type:"consolidates"},
];
const EDGE_COLOR: Record<RelType,string> = { competes:"#0B1220", serves:"#3730A3", consolidates:"#475569", retreats:"#D97706" };
const byId = (id:string) => ENTITIES.find(e => e.id===id)!;

export function RelationshipGraph() {
  return (
    <Section className="border-y border-ink-900/[0.06] bg-white/[0.4]">
      <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
        <SectionHeader index="05" eyebrow="Relationship Graph" title="Entities in motion, and how they bear on one another"
          description="A living map of companies and markets — with the directional forces ARGUS has inferred between them."
          meta={<div className="flex flex-wrap justify-end gap-2"><Tag tone="accent">Company</Tag><Tag tone="muted">Market</Tag></div>} />
        <SectionItem>
          <div className="surface overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr]">
              <div>
                <svg viewBox="0 0 800 440" className="w-full" style={{ background:"linear-gradient(180deg,#FBFDFF,#F2F8FC)" }}>
                  <defs>
                    {Object.entries(EDGE_COLOR).map(([k,c]) => (
                      <marker key={k} id={`arrow-${k}`} markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                        <path d="M0,0 L6,3 L0,6" fill="none" stroke={c} strokeWidth="1" />
                      </marker>
                    ))}
                  </defs>
                  {RELS.map((r,i) => {
                    const a=byId(r.from), b=byId(r.to), c=EDGE_COLOR[r.type];
                    const mx=(a.x+b.x)/2, my=(a.y+b.y)/2+(r.type==="competes"?-24:14);
                    return <path key={i} d={`M${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                      fill="none" stroke={c} strokeOpacity={0.45} strokeWidth={1.2}
                      markerEnd={`url(#arrow-${r.type})`} />;
                  })}
                  {ENTITIES.map(e => {
                    const isCompany = e.kind==="company";
                    const r = isCompany ? 16 : 9;
                    return (
                      <g key={e.id}>
                        {isCompany && <circle cx={e.x} cy={e.y} r={r+6} fill="#3730A3" opacity={0.07} />}
                        <circle cx={e.x} cy={e.y} r={r}
                          fill={isCompany?"#3730A3":"#FBFDFF"} stroke={isCompany?"#3730A3":"#94A3B8"}
                          strokeWidth={isCompany?0:1.5} />
                        {isCompany && <text x={e.x} y={e.y+4} textAnchor="middle" fontSize="10" fill="#FBFDFF">
                          {e.label.slice(0,2).toUpperCase()}</text>}
                        <text x={e.x} y={e.y-r-8} textAnchor="middle" fontSize="11" fill="#334155">{e.label}</text>
                      </g>
                    );
                  })}
                </svg>
              </div>
              <aside className="border-t border-ink-900/[0.06] p-6 lg:border-l lg:border-t-0">
                <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400 mb-4">Inferred forces</div>
                <div className="space-y-3">
                  {RELS.slice(0,6).map((r,i) => (
                    <Reveal key={i} delay={i*0.04}>
                      <div className="flex items-center gap-3 text-[13px]">
                        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: EDGE_COLOR[r.type] }} />
                        <span className="text-ink-700">{byId(r.from).label}</span>
                        <span className="text-ink-400">→</span>
                        <span className="text-ink-700">{byId(r.to).label}</span>
                        <span className="ml-auto text-[11px] uppercase tracking-wide text-ink-400">{r.type}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </SectionItem>
      </div>
    </Section>
  );
}
