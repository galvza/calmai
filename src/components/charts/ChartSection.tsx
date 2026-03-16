/**
 * Seção do gráfico principal com estado compartilhado.
 *
 * Wrapper client que instancia useIndicators com indicadores iniciais
 * (selic, ipca, dolar) e compõe GovernmentBar, IndicatorToggle e
 * TimeSeriesChart com estado sincronizado.
 */

"use client";

import { useIndicators } from "@/hooks/useIndicators";
import GovernmentBar from "@/components/charts/GovernmentBar";
import IndicatorToggle from "@/components/filters/IndicatorToggle";
import TimeSeriesChart from "@/components/charts/TimeSeriesChart";

/** Seção completa do gráfico com toggles e faixas de governo. */
const ChartSection = () => {
  const { data, activeIndicators, toggleIndicator, governments } =
    useIndicators(["selic", "ipca", "dolar"]);

  return (
    <div>
      <p
        className="mb-4 font-ui"
        style={{
          fontSize: "13px",
          lineHeight: 1.6,
          color: "var(--text-tertiary)",
        }}
      >
        Passe o mouse pra ver os valores. Ligue e desligue os indicadores
        abaixo.
      </p>
      <div className="mb-4">
        <GovernmentBar />
      </div>
      <div className="mb-4">
        <IndicatorToggle
          activeIndicators={activeIndicators}
          onToggle={toggleIndicator}
        />
      </div>
      <TimeSeriesChart
        data={data}
        activeIndicators={activeIndicators}
        governments={governments}
      />
      <p
        className="font-ui"
        style={{
          fontSize: "10px",
          color: "var(--text-tertiary)",
          marginTop: "8px",
          lineHeight: 1.5,
        }}
      >
        Todas as linhas partem do mesmo ponto pra facilitar a comparação.
        O PIB mostra o crescimento acumulado desde 2005. Aluguel e energia mostram quanto o preço subiu mês a mês, somado ao longo do tempo.
      </p>
    </div>
  );
};

export default ChartSection;
