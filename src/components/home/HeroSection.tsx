"use client";

import { Nav } from "@/components/layout/Nav";
import { FirstTimeBanner } from "./FirstTimeBanner";
import { HeroInput } from "./HeroInput";

/** Seção hero com headline, input e banner */
export const HeroSection = () => {
  return (
    <section className="bg-dark-bg min-h-[90vh] flex flex-col">
      <Nav />

      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-16 pt-8">
        <FirstTimeBanner />

        {/* Headline */}
        <h1 className="font-serif text-[32px] sm:text-[40px] text-white text-center leading-tight max-w-2xl mb-4">
          Veja tudo que seus concorrentes fazem online.{" "}
          <em className="italic text-accent">Domine</em> seu nicho.
        </h1>

        {/* Subtitle */}
        <p className="text-[15px] text-[#888] text-center max-w-lg mb-10 leading-relaxed">
          Descreva seu nicho e receba análise competitiva, conteúdos virais e
          recomendações estratégicas — em minutos.
        </p>

        <HeroInput />
      </div>
    </section>
  );
};
