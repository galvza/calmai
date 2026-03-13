/** Período de governo pra renderizar faixas no gráfico. */
export type GovernmentPeriod = {
  /** Identificador único (ex: "lula1") */
  id: string;
  /** Nome de exibição (ex: "Lula 1") */
  name: string;
  /** Nome do presidente */
  president: string;
  /** Início do mandato em "YYYY-MM" (ex: "2003-01") */
  start: string;
  /** Fim do mandato em "YYYY-MM" (ex: "2006-12") */
  end: string;
  /** Cor hex pra faixa (ex: "#E3342F") */
  color: string;
};

/** Estrutura completa do governments.json. */
export type GovernmentsData = {
  governments: GovernmentPeriod[];
};
