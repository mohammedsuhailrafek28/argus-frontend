import { StatusDot } from "@/components/primitives";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/[0.06] bg-marble/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-6 lg:px-10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="8.5" stroke="#0B1220" strokeWidth="1" opacity="0.25" />
              <circle cx="10" cy="10" r="3" fill="#3730A3" />
              <circle cx="10" cy="10" r="1" fill="#FBFDFF" />
            </svg>
            <span className="font-display text-[15px] font-medium tracking-tight text-ink-900">ARGUS</span>
          </div>
          <nav className="hidden items-center gap-6 text-[13px] text-ink-600 md:flex">
            {["Desk","Briefs","Evidence","Review","Sources"].map(l => (
              <a key={l} className="cursor-pointer transition-colors hover:text-ink-900">{l}</a>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 text-[12px] text-ink-500 sm:flex">
            <StatusDot tone="live" pulse />
            <span>All adapters nominal</span>
          </div>
          <div className="h-5 w-px bg-ink-200" />
          <span className="hidden text-[12px] text-ink-500 sm:inline">June 23</span>
          <div className="h-7 w-7 rounded-full bg-ink-200 ring-1 ring-white" />
        </div>
      </div>
    </header>
  );
}
