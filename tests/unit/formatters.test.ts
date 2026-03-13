/**
 * Testes unitários das funções de formatação (src/utils/formatters.ts).
 *
 * Cenários cobertos:
 * - T070: Formatar valor em reais (R$) — deve exibir "R$ 1.412,00"
 * - T071: Formatar porcentagem — deve exibir "10,50%"
 * - T072: Formatar dólar — deve exibir "R$ 4,85"
 * - T073: Formatar data YYYY-MM pra exibição — deve exibir "Mar/2024"
 * - T074: Formatar valor com casas decimais variáveis — precisão correta
 * - T075: Formatar valores zero e negativos — tratamento correto
 * - T076: Formatar data inválida — deve retornar fallback
 */

import { describe, it, expect } from "vitest";

import {
  formatCurrency,
  formatPercent,
  formatPricePerLiter,
  formatDollar,
  formatDecimal,
  formatDateShort,
  formatDateLong,
} from "@/utils/formatters";

describe("formatCurrency", () => {
  it("T070: deve formatar valor em reais como R$ 1.412,00", () => {
    expect(formatCurrency(1412)).toBe("R$ 1.412,00");
  });

  it("T070: deve formatar valor com centavos corretamente", () => {
    expect(formatCurrency(708.53)).toBe("R$ 708,53");
  });

  it("T070: deve formatar valores grandes com separador de milhar", () => {
    expect(formatCurrency(1234567.89)).toBe("R$ 1.234.567,89");
  });

  it("T070: deve retornar fallback pra undefined", () => {
    expect(formatCurrency(undefined)).toBe("—");
  });

  it("T070: deve retornar fallback pra NaN", () => {
    expect(formatCurrency(NaN)).toBe("—");
  });

  it("T070: deve retornar fallback pra Infinity", () => {
    expect(formatCurrency(Infinity)).toBe("—");
  });
});

describe("formatPercent", () => {
  it("T071: deve formatar porcentagem como 13,75%", () => {
    expect(formatPercent(13.75)).toBe("13,75%");
  });

  it("T071: deve formatar porcentagem com 2 casas decimais por padrão", () => {
    expect(formatPercent(10.5)).toBe("10,50%");
  });

  it("T071: deve aceitar número de casas decimais customizado", () => {
    expect(formatPercent(10.5678, 1)).toBe("10,6%");
    expect(formatPercent(10.5678, 3)).toBe("10,568%");
    expect(formatPercent(10.5678, 0)).toBe("11%");
  });

  it("T071: deve retornar fallback pra undefined", () => {
    expect(formatPercent(undefined)).toBe("—");
  });

  it("T071: deve retornar fallback pra NaN", () => {
    expect(formatPercent(NaN)).toBe("—");
  });
});

describe("formatPricePerLiter", () => {
  it("T072: deve formatar preço por litro com 3 casas decimais", () => {
    expect(formatPricePerLiter(5.879)).toBe("R$ 5,879");
  });

  it("T072: deve completar com zeros se necessário", () => {
    expect(formatPricePerLiter(5.8)).toBe("R$ 5,800");
  });

  it("T072: deve retornar fallback pra undefined", () => {
    expect(formatPricePerLiter(undefined)).toBe("—");
  });
});

describe("formatDollar", () => {
  it("T072: deve formatar valor de câmbio com 2 casas decimais", () => {
    expect(formatDollar(4.8521, 2)).toBe("R$ 4,85");
  });

  it("T072: deve formatar valor de câmbio com 4 casas decimais", () => {
    expect(formatDollar(4.8521, 4)).toBe("R$ 4,8521");
  });

  it("T072: deve usar 2 casas decimais por padrão", () => {
    expect(formatDollar(5.34)).toBe("R$ 5,34");
  });

  it("T072: deve retornar fallback pra undefined", () => {
    expect(formatDollar(undefined)).toBe("—");
  });
});

describe("formatDateShort", () => {
  it("T073: deve converter 2024-01 pra Jan/2024", () => {
    expect(formatDateShort("2024-01")).toBe("Jan/2024");
  });

  it("T073: deve converter 2024-12 pra Dez/2024", () => {
    expect(formatDateShort("2024-12")).toBe("Dez/2024");
  });

  it("T073: deve usar meses em português", () => {
    expect(formatDateShort("2024-03")).toBe("Mar/2024");
    expect(formatDateShort("2024-06")).toBe("Jun/2024");
    expect(formatDateShort("2024-09")).toBe("Set/2024");
  });
});

describe("formatDateLong", () => {
  it("T073: deve converter 2024-03 pra Março de 2024", () => {
    expect(formatDateLong("2024-03")).toBe("Março de 2024");
  });

  it("T073: deve converter 2024-01 pra Janeiro de 2024", () => {
    expect(formatDateLong("2024-01")).toBe("Janeiro de 2024");
  });

  it("T073: deve converter 2024-12 pra Dezembro de 2024", () => {
    expect(formatDateLong("2024-12")).toBe("Dezembro de 2024");
  });
});

describe("formatDecimal", () => {
  it("T074: deve formatar com 2 casas decimais por padrão", () => {
    expect(formatDecimal(1234.5)).toBe("1.234,50");
  });

  it("T074: deve aceitar número de casas decimais customizado", () => {
    expect(formatDecimal(1234.5678, 3)).toBe("1.234,568");
    expect(formatDecimal(1234.5678, 0)).toBe("1.235");
  });

  it("T074: deve usar vírgula como separador decimal", () => {
    expect(formatDecimal(3.14)).toBe("3,14");
  });

  it("T074: deve retornar fallback pra undefined", () => {
    expect(formatDecimal(undefined)).toBe("—");
  });
});

describe("formatEdgeCases", () => {
  it("T075: deve formatar valor zero como R$ 0,00", () => {
    expect(formatCurrency(0)).toBe("R$ 0,00");
  });

  it("T075: deve formatar valor negativo com sinal", () => {
    expect(formatCurrency(-1234.56)).toBe("R$ -1.234,56");
  });

  it("T075: deve formatar porcentagem zero", () => {
    expect(formatPercent(0)).toBe("0,00%");
  });

  it("T075: deve formatar porcentagem negativa", () => {
    expect(formatPercent(-3.5)).toBe("-3,50%");
  });

  it("T076: deve retornar fallback pra data inválida", () => {
    expect(formatDateShort("invalid")).toBe("—");
    expect(formatDateLong("invalid")).toBe("—");
  });

  it("T076: deve retornar fallback pra string vazia", () => {
    expect(formatDateShort("")).toBe("—");
    expect(formatDateLong("")).toBe("—");
  });

  it("T076: deve retornar fallback pra mês inválido", () => {
    expect(formatDateShort("2024-13")).toBe("—");
    expect(formatDateShort("2024-00")).toBe("—");
  });
});
