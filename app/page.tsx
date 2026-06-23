import { TopBar } from "@/components/TopBar";
import { CommandDesk } from "@/components/CommandDesk";
import { ExecutiveIntelligence } from "@/components/sections/ExecutiveIntelligence";
import { MarketIntelligence } from "@/components/sections/MarketIntelligence";
import { EvidenceGraph } from "@/components/sections/EvidenceGraph";
import { RelationshipGraph } from "@/components/sections/RelationshipGraph";
import { CompetitiveIntelligence } from "@/components/sections/CompetitiveIntelligence";
import { ReviewAndChallenges } from "@/components/sections/ReviewAndChallenges";
import { Health } from "@/components/sections/Health";

export default function Page() {
  return (
    <main className="min-h-screen">
      <TopBar />
      <section className="relative px-6 pb-28 pt-24 lg:px-10 lg:pt-36">
        <CommandDesk />
      </section>
      <ExecutiveIntelligence />
      <MarketIntelligence />
      <EvidenceGraph />
      <RelationshipGraph />
      <CompetitiveIntelligence />
      <ReviewAndChallenges />
      <Health />
      <footer className="border-t border-ink-900/[0.06] bg-marble">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-8 px-6 py-14 lg:flex-row lg:items-center lg:px-10">
          <div>
            <div className="font-display text-[15px] font-medium tracking-tight text-ink-900">ARGUS</div>
            <p className="mt-1 text-[12px] text-ink-500">Autonomous Business Intelligence Analyst · synthesized with challenged evidence</p>
          </div>
          <div className="flex items-center gap-6 text-[12px] text-ink-500">
            <span>Provenance ledger</span>
            <span className="h-3 w-px bg-ink-200" />
            <span>Adapter API</span>
            <span className="h-3 w-px bg-ink-200" />
            <span>Security posture</span>
          </div>
          <div className="font-mono text-[11px] text-ink-400">desk_a7c3 · rev 4.2</div>
        </div>
      </footer>
    </main>
  );
}
