/**
 * Card de gancho editorial com cálculo de poder de compra.
 *
 * Mostra quanto R$ 100 de 2005 valem hoje, corrigidos pela
 * inflação acumulada (IPCA composto). Primeiro elemento de impacto.
 */

"use client";

import { useIndicators } from "@/hooks/useIndicators";
import { compoundAnnualRates } from "@/utils/calculations";
import { formatDecimal } from "@/utils/formatters";

/** Card de impacto: R$ 100 → R$ X corrigido pela inflação. */
const HookCard = () => {
  const { data } = useIndicators(["ipca"]);
  const ipcaPoints = data.ipca ?? [];

  const ipcaAcumulado = compoundAnnualRates(ipcaPoints);
  const valorCorrigido = Math.round(100 / (1 + ipcaAcumulado / 100));

  return (
    <div
      className="mb-8"
      style={{
        background: "var(--bg-surface)",
        borderRadius: "12px",
        borderLeft: "3px solid var(--accent-red)",
        padding: "24px 28px",
      }}
    >
      <p
        className="font-ui"
        style={{
          fontSize: "36px",
          fontWeight: 600,
          lineHeight: 1.2,
          marginBottom: "12px",
        }}
      >
        R$ 100 → R$ {valorCorrigido}
      </p>
      <p
        style={{
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--text-secondary)",
        }}
      >
        Pega uma nota de cem de 2005. Guarda na gaveta. Esquece lá. Agora abre
        a gaveta — essa nota compra hoje o que R$ {valorCorrigido} compravam
        naquela época. A inflação acumulada no período?{" "}
        {formatDecimal(ipcaAcumulado, 0)}%. O salário subiu? O dólar explodiu?
        A gasolina... bom, a gasolina é uma história à parte. Desce a página.
      </p>
    </div>
  );
};

export default HookCard;
