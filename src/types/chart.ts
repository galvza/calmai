import type { IndicatorKey } from "./indicator";

/** Configuração de exibição de um indicador no gráfico. */
export type ChartConfig = {
  /** Chave do indicador */
  key: IndicatorKey;
  /** Cor da linha no gráfico (hex) */
  color: string;
  /** Rótulo de exibição */
  label: string;
  /** Unidade pra formatação no tooltip */
  unit: string;
  /** Se o indicador está visível no gráfico */
  visible: boolean;
};

/** Dados exibidos no tooltip ao passar o mouse no gráfico. */
export type TooltipData = {
  /** Data formatada pra exibição (ex: "jan/2024") */
  date: string;
  /** Valores de cada indicador visível naquele ponto. */
  values: {
    key: IndicatorKey;
    label: string;
    value: number;
    unit: string;
    color: string;
  }[];
};
