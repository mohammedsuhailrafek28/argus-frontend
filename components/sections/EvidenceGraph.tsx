"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionItem } from "@/components/motion";
import { SectionHeader, Tag, Confidence } from "@/components/primitives";

type NodeKind = "thesis"|"investigation"|"source"|"challenge";
type Node = { id: string; x: number; y: number; r: number; label: string; kind: NodeKind; weight: number };

const NODES: Node[] = [
  { id: "t",  x: 400, y: 55,  r: 20, label: "T1 Enterprise governance", kind: "thesis",        weight: 0.86 },
  { id: "i1", x: 180, y: 200, r: 12, label: "Procurement language",       kind: "investigation", weight: 0.81 },
  { id: "i2", x: 420, y: 230, r: 12, label: "FedRAMP pacing",              kind: "investigation", weight: 0.74 },
  { id: "i3", x: 640, y: 200, r: 12, label: "Challenger retreat",          kind: "investigation", weight: 0.69 },
  { id: "s1", x: 70,  y: 340, r: 6,  label: "RFP corpus",                  kind: "source",        weight: 0.9  },
  { id: "s2", x: 200, y: 360, r: 6,  label: "Search demand",               kind: "source",        weight: 0.83 },
  { id: "s3", x: 360, y: 380, r: 6,  label: "FedRAMP registry",            kind: "source",        weight: 0.95 },
  { id: "s4", x: 480, y: 380, r: 6,  label: "Filing alerts",               kind: "source",        weight: 0.7  },
  { id: "s5", x: 620, y: 360, r: 6,  label: "Funding DB",                  kind: "source",        weight: 0.88 },
  { id: "s6", x: 730, y: 340, r: 6,  label: "Press scan",                  kind: "source",        weight: 0.6  },
  { id: "c1", x: 300, y: 130, r: 9,  label: "Alt. interpret.",             kind: "challenge",     weight: 0.4  },
  { id: "c2", x: 540, y: 150, r: 9,  label: "Noise risk",                  kind: "challenge",     weight: 0.31 },
];

const EDGES: [string,string,number][] = [
  ["t","i1",0.9],["t","i2",0.82],["t","i3",0.7],
  ["i1","s1",0.9],["i1","s2",0.85],["i2","s3",0.95],["i2","s4",0.75],
  ["i3","s5",0.88],["i3","s6",0.6],["t","c1",0.5],["t","c2",0.45],
];

const KIND_COLOR: Record<NodeKind, string> = {
  thesis: "#3730A3", investigation: "#0B1220", source: "#94A3B8", challenge: "#D97706",
};

const KIND_DESC: Record<NodeKind, string> = {
  thesis: "Central claim synthesized from three investigations. Two of three recorded challenges resolved in favor.",
  investigation: "Independent investigation stream. Triangulates across primary sources; no single-source dependency.",
  source: "Primary source captured by an adapter. Provenance hash recorded; freshness within SLA.",
  challenge: "Adversarial challenge logged against the thesis. Weighted below threshold; retained for review.",
};

export function EvidenceGraph() {
  const [hover, setHover] = useState<string|null>(null);
  const byId = (id: string) => NODES.find(n => n.id === id)!;
  const isDim = (id: string) => hover !== null && hover !== id &&
    !EDGES.some(([a,b]) => (a===hover&&b===id)||(b===hover&&a===id));

  return (
    <Section className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10">
      <SectionHeader index="04" eyebrow="Evidence Graph" title="How every claim is triangulated"
        description="The thesis is supported by independent investigations, each grounded in primary sources and pressure-tested against recorded challenges."
        meta={<div className="flex flex-wrap justify-end gap-2"><Tag tone="accent">Thesis</Tag><Tag>Investigation</Tag><Tag tone="muted">Source</Tag><Tag tone="muted">Challenge</Tag></div>} />
      <SectionItem>
        <div className="surface overflow-hidden rounded-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr]">
            <div className="relative min-h-[260px]">
              <svg viewBox="0 0 800 420" className="w-full" style={{ background: "linear-gradient(180deg,#FBFDFF,#F2F8FC)" }}>
                {EDGES.map(([a,b,w],i) => {
                  const na = byId(a), nb = byId(b);
                  const dim = hover!==null && hover!==a && hover!==b;
                  return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
                    stroke="#0B1220" strokeOpacity={dim ? 0.04 : 0.08+w*0.18} strokeWidth={0.5+w*1.1} />;
                })}
                {NODES.map(n => {
                  const color = KIND_COLOR[n.kind];
                  const dim = isDim(n.id);
                  return (
                    <g key={n.id} onMouseEnter={() => setHover(n.id)} onMouseLeave={() => setHover(null)}
                      style={{ cursor:"pointer", opacity: dim ? 0.3 : 1, transition:"opacity 0.2s" }}>
                      {n.kind==="thesis" && <circle cx={n.x} cy={n.y} r={n.r+8} fill={color} opacity={0.08} />}
                      <circle cx={n.x} cy={n.y} r={n.r} fill={n.kind==="source"?"#FBFDFF":color}
                        stroke={color} strokeWidth={hover===n.id ? 2.5 : 1.5} />
                      {n.kind!=="source" && <circle cx={n.x} cy={n.y} r={n.r*0.4} fill="#FBFDFF" />}
                      {(n.kind==="thesis"||n.kind==="investigation") && (
                        <text x={n.x} y={n.y-n.r-7} textAnchor="middle" fontSize="11" fill="#334155">{n.label}</text>
                      )}
                    </g>
                  );
                })}
              </svg>
            </div>
            <aside className="border-t border-ink-900/[0.06] p-6 lg:border-l lg:border-t-0">
              <AnimatePresence mode="wait">
                <motion.div key={hover ?? "empty"} initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, y:-6 }} transition={{ duration:0.2 }}>
                  {hover ? (() => {
                    const n = byId(hover);
                    return (
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="inline-block h-2 w-2 rounded-full" style={{ background: KIND_COLOR[n.kind] }} />
                          <span className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                            {n.kind.charAt(0).toUpperCase()+n.kind.slice(1)}
                          </span>
                        </div>
                        <h4 className="mt-3 font-display text-[17px] font-medium tracking-tight text-ink-900">{n.label}</h4>
                        <p className="mt-3 text-[13px] leading-relaxed text-ink-600">{KIND_DESC[n.kind]}</p>
                        <div className="mt-5 flex items-center justify-between border-t border-ink-900/[0.06] pt-4">
                          <span className="text-[11px] uppercase tracking-[0.14em] text-ink-400">Contribution</span>
                          <Confidence value={n.weight} />
                        </div>
                      </div>
                    );
                  })() : (
                    <div>
                      <div className="text-[11px] uppercase tracking-[0.16em] text-ink-400">Inspector</div>
                      <p className="mt-3 text-[14px] leading-relaxed text-ink-600">Hover a node to inspect its provenance, supporting sources, and contribution to the thesis.</p>
                      <div className="mt-6 grid grid-cols-2 gap-4 text-[13px]">
                        {[["Nodes","118"],["Edges","204"],["Streams","3"],["Challenges","6"]].map(([l,v]) => (
                          <div key={l}><div className="font-mono text-[18px] text-ink-900">{v}</div>
                          <div className="text-[11px] uppercase tracking-[0.14em] text-ink-400">{l}</div></div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </aside>
          </div>
        </div>
      </SectionItem>
    </Section>
  );
}
