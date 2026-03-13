/**
 * Hook que calcula insights a partir dos dados filtrados dos indicadores.
 *
 * Produz destaques como maior/menor valor, maior variação e correlações
 * notáveis pra exibição nos InsightCards do dashboard.
 */

import { useMemo } from "react";

import type { IndicatorKey, MonthlyDataPoint } from "@/types/indicator";
import type { FilteredData } from "@/hooks/useIndicators";
import { findExtreme, accumulatedChange } from "@/utils/calculations";
import { INDICATOR_CONFIG } from "@/utils/constants";

/** Insight individual calculado a partir dos dados. */
export type Insight = {
  /** Título do insight (ex: "Maior Selic"). */
  title: string;
  /** Valor numérico do insight. */
  value: number;
  /** Data do ponto (formato "YYYY-MM"). */
  date: string;
  /** Indicador de origem. */
  indicator: IndicatorKey;
  /** Tipo do insight. */
  type: "max" | "min" | "variation";
};

/**
 * Gera insights de extremos (maior e menor) pra um indicador.
 * @param key - Chave do indicador.
 * @param points - Série temporal.
 * @returns Array com até 2 insights (max, min).
 */
const extremeInsights = (
  key: IndicatorKey,
  points: MonthlyDataPoint[]
): Insight[] => {
  const config = INDICATOR_CONFIG[key];
  const results: Insight[] = [];

  const max = findExtreme(points, "max");
  if (max) {
    results.push({
      title: `Maior ${config.shortLabel}`,
      value: max.value,
      date: max.date,
      indicator: key,
      type: "max",
    });
  }

  const min = findExtreme(points, "min");
  if (min) {
    results.push({
      title: `Menor ${config.shortLabel}`,
      value: min.value,
      date: min.date,
      indicator: key,
      type: "min",
    });
  }

  return results;
};

/**
 * Gera insight de variação acumulada pra um indicador.
 * @param key - Chave do indicador.
 * @param points - Série temporal.
 * @returns Insight de variação ou null.
 */
const variationInsight = (
  key: IndicatorKey,
  points: MonthlyDataPoint[]
): Insight | null => {
  const change = accumulatedChange(points);
  if (change === null) return null;

  const config = INDICATOR_CONFIG[key];
  return {
    title: `Variação ${config.shortLabel}`,
    value: change,
    date: points[points.length - 1].date,
    indicator: key,
    type: "variation",
  };
};

/**
 * Hook que calcula insights dos dados filtrados.
 *
 * @param data - Dados filtrados do useIndicators.
 * @returns Array de Insights ordenados por valor absoluto (mais expressivos primeiro).
 */
export const useInsights = (data: FilteredData): Insight[] => {
  return useMemo(() => {
    const insights: Insight[] = [];

    for (const [key, points] of Object.entries(data)) {
      if (!points || points.length === 0) continue;

      const indicatorKey = key as IndicatorKey;

      insights.push(...extremeInsights(indicatorKey, points));

      const variation = variationInsight(indicatorKey, points);
      if (variation) {
        insights.push(variation);
      }
    }

    insights.sort((a, b) => Math.abs(b.value) - Math.abs(a.value));

    return insights;
  }, [data]);
};
