/**
 * Funções de formatação de valores pra exibição no dashboard.
 *
 * Todas as funções retornam "—" quando recebem undefined, NaN ou valores
 * não-numéricos, evitando erros de renderização.
 */

/** Meses abreviados em português (índice 0 = janeiro). */
const MONTHS_SHORT = [
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
];

/** Meses por extenso em português (índice 0 = janeiro). */
const MONTHS_LONG = [
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
];

const FALLBACK = "—";

/**
 * Verifica se o valor é um número finito válido.
 * @param value - Valor a verificar.
 * @returns true se for um número finito.
 */
const isValid = (value: number | undefined | null): value is number =>
  value !== undefined && value !== null && Number.isFinite(value);

/**
 * Formata número com separadores brasileiros (ponto milhar, vírgula decimal).
 * @param value - Valor numérico.
 * @param decimals - Casas decimais.
 * @returns String formatada.
 */
const toBrazilian = (value: number, decimals: number): string => {
  const parts = Math.abs(value).toFixed(decimals).split(".");
  const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  const sign = value < 0 ? "-" : "";
  if (decimals === 0) return `${sign}${intPart}`;
  return `${sign}${intPart},${parts[1]}`;
};

/**
 * Formata valor em reais brasileiros.
 * @param value - Valor numérico.
 * @returns "R$ 1.412,00" ou "—" se inválido.
 */
export const formatCurrency = (value: number | undefined): string => {
  if (!isValid(value)) return FALLBACK;
  return `R$ ${toBrazilian(value, 2)}`;
};

/**
 * Formata valor como porcentagem.
 * @param value - Valor numérico.
 * @param decimals - Casas decimais (default: 2).
 * @returns "13,75%" ou "—" se inválido.
 */
export const formatPercent = (
  value: number | undefined,
  decimals: number = 2
): string => {
  if (!isValid(value)) return FALLBACK;
  return `${toBrazilian(value, decimals)}%`;
};

/**
 * Formata preço por litro com 3 casas decimais.
 * @param value - Valor numérico.
 * @returns "R$ 5,879" ou "—" se inválido.
 */
export const formatPricePerLiter = (value: number | undefined): string => {
  if (!isValid(value)) return FALLBACK;
  return `R$ ${toBrazilian(value, 3)}`;
};

/**
 * Formata valor de câmbio (dólar).
 * @param value - Valor numérico.
 * @param decimals - Casas decimais (default: 2).
 * @returns "R$ 4,85" ou "—" se inválido.
 */
export const formatDollar = (
  value: number | undefined,
  decimals: number = 2
): string => {
  if (!isValid(value)) return FALLBACK;
  return `R$ ${toBrazilian(value, decimals)}`;
};

/**
 * Formata número decimal genérico com vírgula brasileira.
 * @param value - Valor numérico.
 * @param decimals - Casas decimais (default: 2).
 * @returns "1.234,56" ou "—" se inválido.
 */
export const formatDecimal = (
  value: number | undefined,
  decimals: number = 2
): string => {
  if (!isValid(value)) return FALLBACK;
  return toBrazilian(value, decimals);
};

/**
 * Parseia mês de uma string "YYYY-MM".
 * @param date - Data no formato "YYYY-MM".
 * @returns Tupla [year, monthIndex] ou null se inválido.
 */
const parseYearMonth = (date: string): [string, number] | null => {
  if (!date || typeof date !== "string") return null;
  const match = date.match(/^(\d{4})-(\d{2})$/);
  if (!match) return null;
  const monthIndex = parseInt(match[2], 10) - 1;
  if (monthIndex < 0 || monthIndex > 11) return null;
  return [match[1], monthIndex];
};

/**
 * Formata data curta: "2024-03" → "Mar/2024".
 * @param date - Data no formato "YYYY-MM".
 * @returns "Mar/2024" ou "—" se inválido.
 */
export const formatDateShort = (date: string): string => {
  const parsed = parseYearMonth(date);
  if (!parsed) return FALLBACK;
  const [year, monthIndex] = parsed;
  return `${MONTHS_SHORT[monthIndex]}/${year}`;
};

/**
 * Formata data longa: "2024-03" → "Março de 2024".
 * @param date - Data no formato "YYYY-MM".
 * @returns "Março de 2024" ou "—" se inválido.
 */
export const formatDateLong = (date: string): string => {
  const parsed = parseYearMonth(date);
  if (!parsed) return FALLBACK;
  const [year, monthIndex] = parsed;
  return `${MONTHS_LONG[monthIndex]} de ${year}`;
};
