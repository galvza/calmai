/**
 * Parágrafo narrativo sobre a evolução do salário mínimo.
 *
 * Calcula variação nominal, inflação acumulada (IPCA composto) e
 * ganho real, interpolando os valores no texto editorial.
 */

"use client";

import { useIndicators } from "@/hooks/useIndicators";
import { percentChange, compoundAnnualRates } from "@/utils/calculations";
import { formatDecimal } from "@/utils/formatters";
import NarrativeText from "./NarrativeText";

/** Narrativa com dados dinâmicos sobre salário mínimo vs inflação. */
const SalaryNarrative = () => {
  const { data } = useIndicators(["salarioMinimo", "ipca"]);
  const salario = data.salarioMinimo ?? [];
  const ipca = data.ipca ?? [];

  if (salario.length < 2) return null;

  const primeiro = salario[0].value;
  const ultimo = salario[salario.length - 1].value;
  const variacao = percentChange(primeiro, ultimo);
  const ipcaAcumulado = compoundAnnualRates(ipca);
  const realGain =
    variacao !== null && ipcaAcumulado > 0
      ? ((1 + variacao / 100) / (1 + ipcaAcumulado / 100) - 1) * 100
      : null;

  return (
    <NarrativeText>
      <p>
        À primeira vista, o número impressiona. O salário mínimo saiu de R${" "}
        <strong>{formatDecimal(primeiro, 0)}</strong> pra R${" "}
        <strong>{formatDecimal(ultimo, 0)}</strong> — uma alta de{" "}
        <strong>{formatDecimal(variacao ?? 0, 0)}%</strong>. Só que a inflação
        comeu <strong>{formatDecimal(ipcaAcumulado, 0)}%</strong> nesse mesmo
        período. Na prática, o ganho real ficou em torno de{" "}
        <strong>{formatDecimal(realGain ?? 0, 0)}%</strong>. O mínimo mais que
        dobrou de poder de compra. Mas — e esse {'"'}mas{'"'} é grande — essa
        melhora não aconteceu de forma uniforme. Teve governo que empurrou pra
        cima, teve governo que viu o trem passar. E tem coisa que o salário
        mínimo não conta: aluguel disparou, plano de saúde triplicou, educação
        virou artigo de luxo. O mínimo subiu, sim. A pergunta é se o resto da
        vida acompanhou.
      </p>
    </NarrativeText>
  );
};

export default SalaryNarrative;
