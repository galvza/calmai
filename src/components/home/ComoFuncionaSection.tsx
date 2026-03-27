const STEPS = [
  {
    number: "1",
    title: "Descreva",
    description:
      "Seu nicho, sua URL, ou só o nome do seu mercado. A IA entende qualquer formato.",
  },
  {
    number: "2",
    title: "Espere 5 minutos",
    description:
      "Enquanto você toma um café, o LupAI vasculha sites, redes sociais, anúncios e vídeos virais de 3-4 concorrentes.",
  },
  {
    number: "3",
    title: "Receba o mapa",
    description:
      "Diagnóstico competitivo, padrões virais e roteiros prontos. Tudo que uma agência cobraria milhares pra fazer.",
  },
];

/** Seção "Como funciona" com 3 passos */
export const ComoFuncionaSection = () => {
  return (
    <section id="como-funciona" className="bg-light-bg py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-[24px] sm:text-[28px] text-[#1A1A1A] mb-2">
          Quantas horas você ainda perde pesquisando{" "}
          <em className="italic">concorrente</em>?
        </h2>
        <p className="text-[13px] text-[#999] mb-14">
          Três passos. Cinco minutos. Nenhum trabalho manual.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full border-2 border-accent flex items-center justify-center mb-4">
                <span className="text-accent font-semibold text-lg">
                  {step.number}
                </span>
              </div>
              <h3 className="text-[14px] font-semibold text-[#1A1A1A] mb-2">
                {step.title}
              </h3>
              <p className="text-[12px] text-[#999] leading-relaxed max-w-[260px]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
