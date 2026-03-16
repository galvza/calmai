/**
 * Cabeçalho editorial do dashboard.
 *
 * Exibe título principal com borda inferior, lead em fonte serif
 * e linha de meta com fontes e data de atualização.
 */

"use client";

import { useIndicators } from "@/hooks/useIndicators";
import { compoundAnnualRates } from "@/utils/calculations";
import indicatorsRaw from "@/data/indicators.json";

const meta = indicatorsRaw as Record<string, unknown>;
const lastUpdated = (meta.lastUpdated as string) ?? "";

/** Formata ISO date pra "dd/mm/aaaa". */
const formatDate = (iso: string): string => {
  if (!iso) return "—";
  const d = new Date(iso);
  const day = String(d.getUTCDate()).padStart(2, "0");
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const year = d.getUTCFullYear();
  return `${day}/${month}/${year}`;
};

/** Cabeçalho do dashboard com título dinâmico, lead e linha de meta. */
const Header = () => {
  const { data } = useIndicators(["ipca"]);
  const ipcaPoints = data.ipca ?? [];
  const ipcaAcumulado = compoundAnnualRates(ipcaPoints);
  const perda = ipcaAcumulado > 0 ? Math.round((ipcaAcumulado / (100 + ipcaAcumulado)) * 100) : 0;

  return (
    <header className="pt-10 pb-8 md:pt-14 md:pb-10">
      <h1
        className="pb-3 mb-4"
        style={{
          borderBottom: "2px solid #1a1a1a",
        }}
      >
        Em 20 anos, seu dinheiro perdeu {perda > 0 ? `${perda}%` : "mais da metade"} do valor. Os números mostram quando — e por quê.
      </h1>

      <p
        className="mb-4"
        style={{
          fontSize: "16px",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
        }}
      >
        Doze indicadores econômicos. Duas décadas. Dados do Banco Central, do
        DIEESE, da ANP, do IBGE e da FIPE, cruzados e atualizados toda semana.
        Aqui não tem opinião — tem número. Você tira suas conclusões.
      </p>

      <p
        className="font-ui"
        style={{
          fontSize: "12px",
          color: "var(--text-tertiary)",
        }}
      >
        Fontes: BCB (API SGS) &middot; DIEESE &middot; ANP &middot; IBGE
        (SIDRA) &middot; FipeZAP — Atualizado em{" "}
        {formatDate(lastUpdated)}
      </p>
    </header>
  );
};

export default Header;
