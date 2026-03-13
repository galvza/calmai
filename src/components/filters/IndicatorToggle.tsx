/**
 * Toggles de indicadores em formato de pills clicáveis.
 *
 * Cada pill representa um indicador, com cor e label do INDICATOR_CONFIG.
 * Pill ativa: borda colorida e fundo sutil. Inativa: cinza.
 */

import type { IndicatorKey } from "@/types/indicator";
import { INDICATOR_CONFIG } from "@/utils/constants";

const ALL_KEYS: IndicatorKey[] = [
  "selic",
  "ipca",
  "dolar",
  "salarioMinimo",
  "cestaBasica",
  "gasolina",
  "endividamento",
  "inadimplencia",
];

type IndicatorToggleProps = {
  /** Set de indicadores ativos. */
  activeIndicators: Set<IndicatorKey>;
  /** Callback pra ligar/desligar indicador. */
  onToggle: (key: IndicatorKey) => void;
};

/** Linha de pills clicáveis pra alternar indicadores no gráfico. */
const IndicatorToggle = ({
  activeIndicators,
  onToggle,
}: IndicatorToggleProps) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {ALL_KEYS.map((key) => {
        const config = INDICATOR_CONFIG[key];
        const active = activeIndicators.has(key);
        return (
          <button
            key={key}
            onClick={() => onToggle(key)}
            aria-pressed={active}
            aria-label={`${active ? "Desativar" : "Ativar"} indicador ${config.shortLabel}`}
            style={{
              padding: "4px 12px",
              borderRadius: "16px",
              border: `1.5px solid ${active ? config.color : "var(--border)"}`,
              background: active ? `${config.color}15` : "transparent",
              color: active ? config.color : "var(--text-tertiary)",
              fontSize: "12px",
              fontWeight: active ? 500 : 400,
              cursor: "pointer",
              transition: "all 0.15s ease",
              lineHeight: 1.5,
            }}
          >
            {config.shortLabel}
          </button>
        );
      })}
    </div>
  );
};

export default IndicatorToggle;
