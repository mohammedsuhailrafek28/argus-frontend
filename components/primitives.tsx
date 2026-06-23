import type { ReactNode } from "react";

export function Keyline({ className = "" }: { className?: string }) {
  return <div className={`h-px w-full bg-ink-900/[0.08] ${className}`} aria-hidden />;
}

export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-ink-500">
      <span className="font-mono text-ink-400">{index}</span>
      <span className="h-px w-6 bg-ink-900/15" />
      <span>{children}</span>
    </div>
  );
}

export function SectionHeader({ index, eyebrow, title, description, meta }: {
  index: string; eyebrow: string; title: string; description?: string; meta?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-10 pb-10">
      <div className="max-w-2xl">
        <Eyebrow index={index}>{eyebrow}</Eyebrow>
        <h2 className="mt-4 font-display text-[clamp(22px,3vw,28px)] font-medium leading-[1.1] tracking-tighter text-ink-900">
          {title}
        </h2>
        {description && <p className="mt-3 text-[15px] leading-relaxed text-ink-600">{description}</p>}
      </div>
      {meta && <div className="shrink-0 text-right text-sm">{meta}</div>}
    </div>
  );
}

export function StatusDot({ tone = "neutral", pulse = false }: { tone?: "neutral"|"live"|"warn"|"done"; pulse?: boolean }) {
  const color = tone === "live" ? "bg-indigo-500" : tone === "warn" ? "bg-amber-500" : tone === "done" ? "bg-emerald-500" : "bg-ink-300";
  return (
    <span className="relative inline-flex h-1.5 w-1.5">
      {pulse && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-indigo-400 opacity-40" />}
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${color}`} />
    </span>
  );
}

export function Confidence({ value }: { value: number }) {
  const tone = value >= 0.8 ? "text-emerald-600" : value >= 0.6 ? "text-ink-700" : "text-amber-600";
  return <span className={`tnum font-mono text-xs ${tone}`}>{Math.round(value * 100)}%</span>;
}

export function Tag({ children, tone = "default" }: { children: ReactNode; tone?: "default"|"accent"|"muted" }) {
  const styles = tone === "accent" ? "text-indigo-700 bg-indigo-50 border-indigo-100"
    : tone === "muted" ? "text-ink-500 bg-ink-100/60 border-ink-200"
    : "text-ink-700 bg-white border-ink-200";
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] tracking-wide ${styles}`}>
      {children}
    </span>
  );
}
