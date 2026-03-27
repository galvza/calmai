"use client";

import Link from "next/link";

/** Seção CTA final */
export const CtaSection = () => {
  return (
    <section id="cta" className="bg-dark-bg py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-serif text-[26px] sm:text-[32px] text-white leading-tight mb-4">
          De horas de pesquisa manual pra{" "}
          <em className="italic text-accent">minutos</em> de inteligência
          real.
        </h2>
        <p className="text-[14px] text-[#666] mb-8">
          Sem login. Sem cartão. Sem setup. Descreve e vai.
        </p>
        <Link
          href="/#hero"
          className="inline-block bg-accent text-dark-bg text-[15px] font-semibold px-8 py-3 rounded-lg hover:brightness-110 transition-all"
        >
          Analisar meu mercado agora
        </Link>
      </div>
    </section>
  );
};
