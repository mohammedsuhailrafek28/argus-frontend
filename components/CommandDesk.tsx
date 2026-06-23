"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fade, HoverLift } from "@/components/motion";
import { StatusDot, Confidence, Tag, Keyline } from "@/components/primitives";

const MODES = [
  { id: "strategic", label: "Strategic", hint: "Board-level synthesis" },
  { id: "market", label: "Market", hint: "Sector & demand signals" },
  { id: "competitive", label: "Competitive", hint: "Adversarial positioning" },
  { id: "rapid", label: "Rapid", hint: "Compressed sweep" },
] as const;
type ModeId = (typeof MODES)[number]["id"];

const STAGES = ["Planning investigations","Ingesting sources","Triangulating evidence","Challenging hypotheses","Synthesizing brief"];

export function CommandDesk() {
  const [query, setQuery] = useState("Assess Anthropic's enterprise trajectory and defensibility vs. OpenAI");
  const [mode, setMode] = useState<ModeId>("strategic");
  const [running, setRunning] = useState(true);
  const [progress, setProgress] = useState(64);
  const [stage, setStage] = useState(STAGES[2]);

  function run() {
    setRunning(true); setProgress(12); setStage(STAGES[0]); step(12);
  }
  function step(p: number) {
    if (p >= 100) { setRunning(false); setProgress(100); setStage(STAGES[4]); return; }
    const next = Math.min(100, p + 6);
    setTimeout(() => {
      setProgress(next);
      setStage(STAGES[Math.min(STAGES.length-1, Math.floor((next/100)*STAGES.length))]);
      step(next);
    }, 420);
  }

  return (
    <div className="relative">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[460px] w-[820px] -translate-x-1/2 rounded-full opacity-50 blur-[120px]"
        style={{ background: "radial-gradient(closest-side, rgba(55,48,163,0.10), transparent)" }} aria-hidden />

      <Fade>
        <div className="flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.32em] text-ink-400">
          <span className="font-mono">v4.2</span>
          <span className="h-px w-8 bg-ink-900/15" />
          <span>Autonomous Intelligence Desk</span>
        </div>
      </Fade>

      <Fade delay={0.05}>
        <h1 className="mt-8 text-center font-display text-[clamp(56px,9vw,116px)] font-medium leading-none tracking-tightest text-ink-900">
          ARGUS
        </h1>
      </Fade>

      <Fade delay={0.1}>
        <p className="mt-5 text-center text-[15px] font-light tracking-[0.04em] text-ink-600">
          Autonomous Business Intelligence Analyst
        </p>
      </Fade>

      <Fade delay={0.16}>
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="surface group flex items-center gap-3 rounded-2xl px-5 py-3.5 transition-shadow focus-within:shadow-lift">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" className="text-ink-400 shrink-0">
              <circle cx="7.5" cy="7.5" r="5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M11.5 11.5l3 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key === "Enter" && run()}
              placeholder="Ask ARGUS to investigate anything…"
              className="w-full bg-transparent text-[15px] text-ink-900 placeholder:text-ink-400 focus:outline-none" />
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="kbd">⌘</span><span className="kbd">K</span>
            </div>
          </div>
        </div>
      </Fade>

      <Fade delay={0.22}>
        <div className="mx-auto mt-5 flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-1 rounded-xl border border-ink-200 bg-white/60 p-1">
            {MODES.map(m => {
              const active = m.id === mode;
              return (
                <button key={m.id} onClick={() => setMode(m.id)}
                  className={`relative rounded-lg px-3.5 py-1.5 text-[13px] transition-colors ${active ? "text-white" : "text-ink-600 hover:text-ink-900"}`}>
                  {active && <motion.span layoutId="mode-pill" className="absolute inset-0 rounded-lg bg-indigo-500"
                    transition={{ duration: 0.3, ease: [0.22,0.61,0.36,1] }} />}
                  <span className="relative">{m.label}</span>
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[12px] text-ink-500">{MODES.find(m => m.id === mode)?.hint}</span>
            <button onClick={run} disabled={running}
              className="group inline-flex items-center gap-2 rounded-xl bg-ink-900 px-4 py-2 text-[13px] font-medium text-white transition-all hover:bg-indigo-500 disabled:opacity-60">
              {running ? "Running" : "Run Research"}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </Fade>

      <Fade delay={0.28}>
        <div className="mx-auto mt-10 max-w-3xl">
          <HoverLift className="surface rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <StatusDot tone={running ? "live" : "done"} pulse={running} />
                <span className="text-[12px] uppercase tracking-[0.14em] text-ink-500">
                  {running ? "Research in progress" : "Brief synthesized"}
                </span>
              </div>
              <span className="font-mono text-[12px] text-ink-500">job_a7c3-91f2</span>
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <span className="text-[15px] text-ink-800">{stage}</span>
              <span className="tnum font-mono text-[13px] text-ink-700">{progress}%</span>
            </div>
            <div className="mt-2.5 h-[3px] w-full overflow-hidden rounded-full bg-ink-100">
              <motion.div className="h-full rounded-full bg-indigo-500"
                animate={{ width: `${progress}%` }} transition={{ duration: 0.45, ease: [0.22,0.61,0.36,1] }} />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-1 text-[11px] text-ink-500">
              <span>4 investigations</span>
              <span className="h-3 w-px bg-ink-200" />
              <span>312 sources</span>
              <span className="h-3 w-px bg-ink-200" />
              <span>118 evidence nodes</span>
              <span className="h-3 w-px bg-ink-200" />
              <span className="text-ink-400">est. 2m 10s remaining</span>
            </div>
          </HoverLift>
        </div>
      </Fade>

      <Fade delay={0.34}>
        <div className="mx-auto mt-8 max-w-3xl">
          <HoverLift className="surface overflow-hidden rounded-2xl">
            <div className="flex items-center justify-between border-b border-ink-900/[0.06] px-6 py-4">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[11px] text-ink-400">01</span>
                <span className="text-[11px] uppercase tracking-[0.18em] text-ink-500">Top Recommendation</span>
              </div>
              <Confidence value={0.86} />
            </div>
            <div className="px-6 py-5">
              <p className="font-display text-[18px] font-medium leading-snug tracking-tight text-ink-900">
                Prioritize a Claude for Enterprise landing zone in financial services — defensibility is highest where procurement favours model provenance and governance.
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-600">
                Evidence triangulates across three streams: rising enterprise search demand on &quot;sovereign LLM&quot;, Anthropic&apos;s FedRAMP pacing vs. OpenAI, and challenger signals from Cohere&apos;s vertical retreat. Two of three challenges resolved in favor.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                <Tag tone="accent">Strategic</Tag>
                <Tag>Enterprise SaaS</Tag>
                <Tag>Financial Services</Tag>
                <Tag tone="muted">3 streams</Tag>
              </div>
            </div>
            <Keyline />
            <div className="flex items-center justify-between px-6 py-3.5 text-[12px] text-ink-500">
              <span>3 supporting investigations · 118 evidence nodes</span>
              <span className="inline-flex items-center gap-1 text-indigo-700">
                Read the brief
                <svg width="11" height="11" viewBox="0 0 13 13" fill="none">
                  <path d="M2 6.5h9M7 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </HoverLift>
        </div>
      </Fade>
    </div>
  );
}
