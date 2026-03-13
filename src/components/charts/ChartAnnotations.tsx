/**
 * Configuração de eventos históricos marcantes pra annotations no gráfico.
 *
 * Cada evento tem uma data e um label curto, renderizados como
 * ReferenceLine com label no TimeSeriesChart.
 */

/** Evento histórico anotado no gráfico. */
export type ChartEvent = {
  /** Data do evento em "YYYY-MM". */
  date: string;
  /** Label curto pra exibição. */
  label: string;
};

/** Eventos marcantes posicionados sobre o gráfico principal. */
export const CHART_EVENTS: ChartEvent[] = [
  { date: "2008-09", label: "Crise 2008" },
  { date: "2016-08", label: "Impeachment" },
  { date: "2020-03", label: "Pandemia" },
];
