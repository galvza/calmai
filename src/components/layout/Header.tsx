/**
 * Cabeçalho editorial do dashboard.
 *
 * Exibe título principal com borda inferior, lead em fonte serif
 * e linha de meta com fontes e data de atualização.
 */

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

/** Cabeçalho do dashboard com título, lead e linha de meta. */
const Header = () => {
  return (
    <header className="pt-10 pb-8 md:pt-14 md:pb-10">
      <h1
        className="pb-3 mb-4 text-xl sm:text-2xl"
        style={{
          fontWeight: 500,
          lineHeight: 1.3,
          borderBottom: "2px solid #1a1a1a",
        }}
      >
        Em 20 anos, seu dinheiro perdeu metade do valor. Os números mostram
        quando — e por quê.
      </h1>

      <p
        className="mb-4"
        style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "16px",
          lineHeight: 1.6,
          color: "var(--text-secondary)",
        }}
      >
        Oito indicadores econômicos. Duas décadas. Dados do Banco Central, do
        DIEESE e da ANP, cruzados e atualizados toda semana. Aqui não tem
        opinião — tem número. Você tira suas conclusões.
      </p>

      <p
        style={{
          fontSize: "12px",
          color: "var(--text-tertiary)",
        }}
      >
        Fontes: Banco Central (API SGS) &middot; DIEESE &middot; ANP —
        Atualizado em{" "}
        {formatDate(lastUpdated)}
      </p>
    </header>
  );
};

export default Header;
