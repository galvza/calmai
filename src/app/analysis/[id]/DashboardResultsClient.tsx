"use client";

import { Download, RefreshCw } from "lucide-react";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { CompetitorCard } from "@/components/dashboard/CompetitorCard";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { Recommendations } from "@/components/dashboard/Recommendations";
import { Footer } from "@/components/layout/Footer";
import { MOCK_ANALYSIS_RESULT } from "@/utils/mock-analysis";

/** Dashboard de resultados da análise */
export const DashboardResultsClient = ({ id }: { id: string }) => {
  const data = MOCK_ANALYSIS_RESULT;

  return (
    <div className="min-h-screen bg-dark-bg">
      {/* Header */}
      <header className="px-6 py-8 border-b border-dark-border">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-[22px] sm:text-[26px] text-white">
              {data.nicheKeyword}{" "}
              <em className="italic text-accent">{data.nicheAccent}</em>
            </h1>
            <p className="text-[12px] text-[#666] mt-1">
              {data.region} · {data.timestamp}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 bg-dark-card border border-dark-border text-[#888] text-[11px] px-3 py-2 rounded-lg hover:border-[#444] transition-colors">
              <Download size={12} strokeWidth={1.5} />
              Exportar PDF
            </button>
            <button className="inline-flex items-center gap-2 bg-dark-card border border-dark-border text-[#888] text-[11px] px-3 py-2 rounded-lg hover:border-[#444] transition-colors">
              <RefreshCw size={12} strokeWidth={1.5} />
              Atualizar
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Market Overview */}
        <MarketOverview overview={data.marketOverview} />

        {/* Competitors */}
        <div className="mb-6">
          <p className="text-[11px] text-[#555] uppercase tracking-wider mb-4">
            CONCORRENTES
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.competitors.map((comp) => (
              <CompetitorCard key={comp.id} competitor={comp} analysisId={id} />
            ))}
          </div>
        </div>

        {/* Gaps + Virals + Scripts */}
        <SummaryCards
          gaps={data.gaps}
          virals={data.virals}
          scripts={data.scripts}
        />

        {/* Recommendations */}
        <Recommendations
          recommendations={data.recommendations}
          total={data.totalRecommendations}
        />
      </div>

      <Footer />
    </div>
  );
};
