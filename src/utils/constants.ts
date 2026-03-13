import type { IndicatorKey } from "../types/indicator";

/** Configuração de metadados de um indicador econômico. */
type IndicatorConfig = {
  label: string;
  shortLabel: string;
  unit: string;
  color: string;
  source: string;
  description: string;
  frequency: string;
};

/** Configuração de exibição e metadados dos 8 indicadores do dashboard. */
export const INDICATOR_CONFIG: Record<IndicatorKey, IndicatorConfig> = {
  selic: {
    label: "Taxa Selic",
    shortLabel: "Selic",
    unit: "% a.a.",
    color: "#2563EB",
    source: "bcb",
    description: "Taxa básica de juros da economia brasileira",
    frequency: "mensal",
  },
  ipca: {
    label: "IPCA acumulado 12 meses",
    shortLabel: "IPCA",
    unit: "%",
    color: "#DC2626",
    source: "bcb",
    description:
      "Índice Nacional de Preços ao Consumidor Amplo acumulado em 12 meses",
    frequency: "mensal",
  },
  dolar: {
    label: "Dólar comercial",
    shortLabel: "Dólar",
    unit: "R$/USD",
    color: "#16A34A",
    source: "bcb",
    description: "Cotação média mensal do dólar comercial (compra)",
    frequency: "mensal",
  },
  salarioMinimo: {
    label: "Salário mínimo",
    shortLabel: "Sal. Mínimo",
    unit: "R$",
    color: "#9333EA",
    source: "bcb",
    description: "Valor do salário mínimo nacional vigente",
    frequency: "mensal",
  },
  cestaBasica: {
    label: "Cesta básica (São Paulo)",
    shortLabel: "Cesta Básica",
    unit: "R$",
    color: "#EA580C",
    source: "dieese",
    description: "Custo da cesta básica de alimentos em São Paulo",
    frequency: "mensal",
  },
  gasolina: {
    label: "Gasolina comum",
    shortLabel: "Gasolina",
    unit: "R$/litro",
    color: "#0891B2",
    source: "anp",
    description: "Preço médio nacional da gasolina comum",
    frequency: "mensal",
  },
  endividamento: {
    label: "Endividamento das famílias",
    shortLabel: "Endividamento",
    unit: "% da renda",
    color: "#534AB7",
    source: "bcb",
    description:
      "Percentual da renda familiar comprometida com dívidas no Sistema Financeiro Nacional",
    frequency: "mensal",
  },
  inadimplencia: {
    label: "Inadimplência",
    shortLabel: "Inadimplência",
    unit: "%",
    color: "#D85A30",
    source: "bcb",
    description:
      "Percentual da carteira de crédito com atraso superior a 90 dias",
    frequency: "mensal",
  },
};

/** Cores dos indicadores indexadas por chave, pra uso direto nos gráficos. */
export const INDICATOR_COLORS: Record<IndicatorKey, string> = Object.fromEntries(
  Object.entries(INDICATOR_CONFIG).map(([key, config]) => [key, config.color])
) as Record<IndicatorKey, string>;

/** Meses em português pra formatação de datas. */
export const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
] as const;

/** Meses abreviados em português. */
export const MONTHS_SHORT_PT = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
] as const;

/** Cores das faixas de governo nos gráficos, indexadas por ID. */
export const GOVERNMENT_COLORS: Record<string, string> = {
  lula1: "#E3342F",
  lula2: "#E3342F",
  dilma1: "#CC1F1A",
  dilma2: "#CC1F1A",
  temer: "#3490DC",
  bolsonaro: "#FFED4A",
  lula3: "#E3342F",
};
