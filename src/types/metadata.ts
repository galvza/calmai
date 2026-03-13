/** Fonte de dados externa usada pelo pipeline. */
export type Source = {
  /** "bcb" | "dieese" | "anp" */
  id: string;
  /** Nome da fonte */
  name: string;
  /** URL da fonte */
  url: string;
  /** Quando foi a última coleta (ISO 8601) */
  lastFetch: string;
  /** Status da última coleta */
  status: "success" | "error";
};

/** Metadados de um indicador econômico. */
export type IndicatorMeta = {
  /** Nome de exibição (ex: "Taxa Selic") */
  label: string;
  /** Rótulo curto (ex: "Selic") */
  shortLabel: string;
  /** Unidade (ex: "% a.a.", "R$", "R$/litro") */
  unit: string;
  /** ID da fonte ("bcb", "dieese", "anp") */
  source: string;
  /** Descrição curta do indicador */
  description: string;
  /** Cor hex no gráfico */
  color: string;
  /** Frequência dos dados (ex: "mensal") */
  frequency: string;
  /** Quantidade de pontos de dados */
  totalPoints: number;
  /** Último valor disponível */
  latestValue: number;
  /** Data do último valor em "YYYY-MM" */
  latestDate: string;
};

/** Estrutura completa do metadata.json. */
export type MetadataData = {
  /** ISO 8601 da última atualização */
  lastUpdated: string;
  /** Lista de fontes de dados */
  sources: Source[];
  /** Metadados por indicador */
  indicatorsMeta: Record<string, IndicatorMeta>;
};
