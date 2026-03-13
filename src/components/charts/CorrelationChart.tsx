/**
 * Gráfico de correlação Selic × IPCA ao longo do tempo.
 *
 * Mostra as duas séries em linhas sobrepostas com Y-axis compartilhado
 * (ambas em %) pra visualizar o cabo de guerra entre juros e inflação.
 * Título e subtítulo hardcoded dentro do componente.
 */

"use client";

import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useIndicators } from "@/hooks/useIndicators";
import { INDICATOR_CONFIG } from "@/utils/constants";
import { formatPercent, formatDateShort } from "@/utils/formatters";

const YEAR_TICKS = ["2005-01", "2010-01", "2015-01", "2020-01", "2025-01"];

type TooltipProps = {
  active?: boolean;
  payload?: { dataKey: string; value: number; color: string }[];
  label?: string;
};

/** Tooltip customizado do gráfico de correlação. */
const CorrelationTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload || !label) return null;
  return (
    <div
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: "6px",
        padding: "10px 12px",
        fontSize: "12px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <p style={{ fontWeight: 500, marginBottom: "4px" }}>
        {formatDateShort(label)}
      </p>
      {payload.map((item) => (
        <div
          key={item.dataKey}
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          <span style={{ color: item.color }}>
            {item.dataKey === "selic" ? "Selic" : "IPCA"}
          </span>
          <span style={{ fontWeight: 500 }}>
            {formatPercent(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

/** Gráfico Selic × IPCA com título e legenda embutidos. */
const CorrelationChart = () => {
  const { data } = useIndicators(["selic", "ipca"]);

  const chartData = useMemo(() => {
    const selic = data.selic ?? [];
    const ipca = data.ipca ?? [];
    const allDates = new Set<string>();
    const selicMap: Record<string, number> = {};
    const ipcaMap: Record<string, number> = {};

    for (const p of selic) {
      selicMap[p.date] = p.value;
      allDates.add(p.date);
    }
    for (const p of ipca) {
      ipcaMap[p.date] = p.value;
      allDates.add(p.date);
    }
    for (const t of YEAR_TICKS) allDates.add(t);

    return Array.from(allDates)
      .sort()
      .map((date) => ({
        date,
        selic: selicMap[date] as number | undefined,
        ipca: ipcaMap[date] as number | undefined,
      }));
  }, [data]);

  return (
    <div>
      <h3
        className="text-[15px] sm:text-base"
        style={{ fontWeight: 500, marginBottom: "4px" }}
      >
        Selic × Inflação — o cabo de guerra que define sua vida financeira
      </h3>
      <p
        className="text-[12px] sm:text-[13px]"
        style={{
          lineHeight: 1.6,
          color: "var(--text-tertiary)",
          marginBottom: "16px",
        }}
      >
        Quando o Banco Central sobe o juro, a inflação tende a ceder. Mas
        demora. E o custo é alto — crédito caro, economia travada, emprego
        sumindo.
      </p>
      <div
        role="img"
        aria-label="Gráfico comparando Selic e IPCA de 2005 a 2025"
      >
      <ResponsiveContainer width="100%" height={200}>
        <LineChart
          data={chartData}
          margin={{ top: 8, right: 8, bottom: 0, left: 8 }}
        >
          <XAxis
            dataKey="date"
            ticks={YEAR_TICKS}
            tickFormatter={(d: string) => d.split("-")[0]}
            tick={{ fontSize: 11, fill: "#9b9b9b" }}
            axisLine={{ stroke: "#e5e5e5" }}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#9b9b9b" }}
            tickFormatter={(v: number) => `${v}%`}
            axisLine={false}
            tickLine={false}
            width={40}
          />
          <Tooltip content={<CorrelationTooltip />} />
          <Line
            type="monotone"
            dataKey="selic"
            stroke={INDICATOR_CONFIG.selic.color}
            strokeWidth={1.5}
            dot={false}
            connectNulls
          />
          <Line
            type="monotone"
            dataKey="ipca"
            stroke={INDICATOR_CONFIG.ipca.color}
            strokeWidth={1.5}
            dot={false}
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
      </div>
      {/* Custom legend below chart */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "16px",
          marginTop: "8px",
          fontSize: "12px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "12px",
              height: "2px",
              background: INDICATOR_CONFIG.selic.color,
            }}
          />
          <span style={{ color: "var(--text-tertiary)" }}>
            {INDICATOR_CONFIG.selic.shortLabel}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div
            style={{
              width: "12px",
              height: "2px",
              background: INDICATOR_CONFIG.ipca.color,
            }}
          />
          <span style={{ color: "var(--text-tertiary)" }}>
            {INDICATOR_CONFIG.ipca.shortLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CorrelationChart;
