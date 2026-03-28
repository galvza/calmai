"use client";

import { motion } from "framer-motion";

/** Mini preview card do dashboard */
const PreviewCard = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={`bg-[#141414] border border-[#222] rounded-lg p-3 ${className}`}>
    {children}
  </div>
);

/** Seção CTA com layout split Krida-style */
export const CtaSection = () => {
  return (
    <section id="cta" className="bg-light-bg py-16 md:py-20 px-8 lg:px-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto flex flex-col md:flex-row rounded-[24px] overflow-hidden"
      >
        {/* Left — headline + CTA */}
        <div
          className="md:w-[60%] p-10 md:p-12 lg:p-16 flex flex-col justify-center"
          style={{
            background: "linear-gradient(135deg, #D4D0C8 0%, #B8B4AA 50%, #A09C94 100%)",
          }}
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white leading-tight">
            De horas de pesquisa manual pra{" "}
            <em className="italic text-accent">minutos</em> de inteligência
            real.
          </h2>
          <p className="text-[14px] text-[#E0E0E0] mt-4">
            Sem login. Sem cartão. Sem setup. Descreve e vai.
          </p>
          <div className="mt-8">
            <button
              onClick={() =>
                document
                  .getElementById("hero-input")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-accent text-dark-bg text-[15px] font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all"
            >
              Analisar meu mercado agora
            </button>
          </div>
        </div>

        {/* Right — mini dashboard preview */}
        <div className="md:w-[40%] bg-dark-bg p-6 md:p-8 flex flex-col gap-3">
          {/* Competitor card */}
          <PreviewCard>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-medium text-white">
                Growth Supplements
              </span>
              <span className="text-[11px] font-semibold text-accent">87</span>
            </div>
            <div className="flex gap-1.5">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-positive-bg text-positive-text">
                SEO forte
              </span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-negative-bg text-negative-text">
                Sem TikTok
              </span>
            </div>
          </PreviewCard>

          {/* Patterns card */}
          <PreviewCard>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              <span className="text-[11px] text-[#CCC]">
                3 padrões de hook identificados
              </span>
            </div>
          </PreviewCard>

          {/* Opportunities card */}
          <PreviewCard>
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-accent">5</span>
              <span className="text-[11px] text-[#CCC]">
                oportunidades encontradas
              </span>
            </div>
          </PreviewCard>

          {/* Extra metric */}
          <PreviewCard>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-[#666]">Ads ativos</span>
              <span className="text-[11px] font-semibold text-white">12</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] text-[#666]">Posts/sem</span>
              <span className="text-[11px] font-semibold text-white">5</span>
            </div>
          </PreviewCard>
        </div>
      </motion.div>
    </section>
  );
};
