/**
 * Testes unitários das funções de cálculo (src/utils/calculations.ts).
 *
 * Cenários cobertos:
 * - T080: Calcular variação percentual entre dois valores — fórmula correta
 * - T081: Calcular variação acumulada de uma série — acumulado correto
 * - T082: Calcular mínimo de uma série — valor correto
 * - T083: Calcular máximo de uma série — valor correto
 * - T084: Calcular média de uma série — valor correto
 * - T085: Filtrar série por período de governo — pontos dentro do range
 * - T086: Filtrar série por range de datas — pontos dentro do range
 * - T087: Calcular correlação entre duas séries — coeficiente correto
 * - T088: Tratar séries vazias em todos os cálculos — sem erros
 */

import { describe, it, expect } from "vitest";

import {
  percentChange,
  accumulatedChange,
  findExtreme,
  calculateAverage,
  filterByGovernment,
  filterByDateRange,
  calculateCorrelation,
} from "@/utils/calculations";
import type { MonthlyDataPoint } from "@/types/indicator";
import type { GovernmentPeriod } from "@/types/government";

import indicatorsFixture from "../fixtures/indicators-fixture.json";
import governmentsFixture from "../fixtures/governments-fixture.json";

const selic = indicatorsFixture.indicators.selic as MonthlyDataPoint[];
const ipca = indicatorsFixture.indicators.ipca as MonthlyDataPoint[];
const dolar = indicatorsFixture.indicators.dolar as MonthlyDataPoint[];
const gasolina = indicatorsFixture.indicators.gasolina as MonthlyDataPoint[];
const lula1 = governmentsFixture.governments[0] as GovernmentPeriod;
const bolsonaro = governmentsFixture.governments[5] as GovernmentPeriod;
const lula3 = governmentsFixture.governments[6] as GovernmentPeriod;

describe("percentChange", () => {
  it("T080: deve calcular variação percentual positiva", () => {
    expect(percentChange(100, 150)).toBe(50);
  });

  it("T080: deve calcular variação percentual negativa", () => {
    expect(percentChange(200, 100)).toBe(-50);
  });

  it("T080: deve retornar 0 quando valores são iguais", () => {
    expect(percentChange(100, 100)).toBe(0);
  });

  it("T080: deve retornar null quando inicial é zero (divisão por zero)", () => {
    expect(percentChange(0, 100)).toBeNull();
  });

  it("T080: deve calcular variação com decimais", () => {
    const result = percentChange(10, 15);
    expect(result).toBeCloseTo(50, 10);
  });
});

describe("accumulatedChange", () => {
  it("T081: deve calcular variação acumulada de série crescente", () => {
    const points: MonthlyDataPoint[] = [
      { date: "2024-01", value: 100 },
      { date: "2024-02", value: 120 },
      { date: "2024-03", value: 150 },
    ];
    expect(accumulatedChange(points)).toBe(50);
  });

  it("T081: deve calcular variação acumulada de série com oscilação", () => {
    const points: MonthlyDataPoint[] = [
      { date: "2024-01", value: 100 },
      { date: "2024-02", value: 150 },
      { date: "2024-03", value: 80 },
    ];
    expect(accumulatedChange(points)).toBe(-20);
  });

  it("T081: deve retornar null pra série com um único ponto", () => {
    expect(accumulatedChange([{ date: "2024-01", value: 100 }])).toBeNull();
  });

  it("T081: deve funcionar com dados reais do fixture", () => {
    const result = accumulatedChange(selic);
    expect(result).not.toBeNull();
    expect(typeof result).toBe("number");
  });
});

describe("findExtreme (min)", () => {
  it("T082: deve retornar o menor valor da série", () => {
    const result = findExtreme(selic, "min");
    expect(result).not.toBeNull();
    expect(result!.value).toBe(2.25);
    expect(result!.date).toBe("2020-06");
  });

  it("T082: deve retornar o ponto completo (date + value)", () => {
    const result = findExtreme(selic, "min");
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("value");
  });
});

describe("findExtreme (max)", () => {
  it("T083: deve retornar o maior valor da série", () => {
    const result = findExtreme(selic, "max");
    expect(result).not.toBeNull();
    expect(result!.value).toBe(19.75);
    expect(result!.date).toBe("2005-06");
  });

  it("T083: deve retornar o ponto completo (date + value)", () => {
    const result = findExtreme(selic, "max");
    expect(result).toHaveProperty("date");
    expect(result).toHaveProperty("value");
  });
});

describe("calculateAverage", () => {
  it("T084: deve calcular média aritmética da série", () => {
    const points: MonthlyDataPoint[] = [
      { date: "2024-01", value: 10 },
      { date: "2024-02", value: 20 },
      { date: "2024-03", value: 30 },
    ];
    expect(calculateAverage(points)).toBe(20);
  });

  it("T084: deve retornar valor com precisão adequada", () => {
    const points: MonthlyDataPoint[] = [
      { date: "2024-01", value: 10 },
      { date: "2024-02", value: 20 },
      { date: "2024-03", value: 33 },
    ];
    expect(calculateAverage(points)).toBeCloseTo(21, 0);
  });

  it("T084: deve funcionar com dados reais", () => {
    const avg = calculateAverage(selic);
    expect(avg).not.toBeNull();
    expect(typeof avg).toBe("number");
    expect(avg!).toBeGreaterThan(0);
  });
});

describe("filterByGovernment", () => {
  it("T085: deve retornar apenas pontos dentro do período de governo", () => {
    const result = filterByGovernment(selic, lula1);
    for (const point of result) {
      expect(point.date >= lula1.start).toBe(true);
      expect(point.date <= lula1.end).toBe(true);
    }
  });

  it("T085: deve retornar lista vazia se governo não tem dados no range", () => {
    const gov: GovernmentPeriod = {
      id: "test",
      name: "Test",
      president: "Test",
      start: "1990-01",
      end: "1994-12",
      color: "#000",
    };
    expect(filterByGovernment(selic, gov)).toEqual([]);
  });

  it("T085: deve incluir pontos nos limites do período (inclusive)", () => {
    const points: MonthlyDataPoint[] = [
      { date: "2002-12", value: 1 },
      { date: "2003-01", value: 2 },
      { date: "2005-06", value: 3 },
      { date: "2006-12", value: 4 },
      { date: "2007-01", value: 5 },
    ];
    const result = filterByGovernment(points, lula1);
    expect(result).toHaveLength(3);
    expect(result[0].date).toBe("2003-01");
    expect(result[2].date).toBe("2006-12");
  });

  it("T085: deve filtrar corretamente com dados reais do fixture", () => {
    const result = filterByGovernment(selic, bolsonaro);
    expect(result.length).toBeGreaterThan(0);
    for (const p of result) {
      expect(p.date >= "2019-01").toBe(true);
      expect(p.date <= "2022-12").toBe(true);
    }
  });
});

describe("filterByDateRange", () => {
  it("T086: deve retornar pontos dentro do range de datas", () => {
    const result = filterByDateRange(selic, "2020-01", "2024-06");
    expect(result.length).toBeGreaterThan(0);
    for (const p of result) {
      expect(p.date >= "2020-01").toBe(true);
      expect(p.date <= "2024-06").toBe(true);
    }
  });

  it("T086: deve incluir pontos nos limites do range (inclusive)", () => {
    const points: MonthlyDataPoint[] = [
      { date: "2024-01", value: 10 },
      { date: "2024-02", value: 20 },
      { date: "2024-03", value: 30 },
    ];
    const result = filterByDateRange(points, "2024-01", "2024-03");
    expect(result).toHaveLength(3);
  });

  it("T086: deve retornar lista vazia se range não tem dados", () => {
    const result = filterByDateRange(selic, "1990-01", "1995-12");
    expect(result).toEqual([]);
  });
});

describe("calculateCorrelation", () => {
  it("T087: deve calcular correlação positiva entre séries correlatas", () => {
    const result = calculateCorrelation(selic, ipca);
    expect(result).not.toBeNull();
    expect(typeof result).toBe("number");
  });

  it("T087: deve retornar valor entre -1 e 1", () => {
    const result = calculateCorrelation(selic, dolar);
    expect(result).not.toBeNull();
    expect(result!).toBeGreaterThanOrEqual(-1);
    expect(result!).toBeLessThanOrEqual(1);
  });

  it("T087: deve retornar correlação 1 pra série consigo mesma", () => {
    const result = calculateCorrelation(selic, selic);
    expect(result).toBeCloseTo(1, 10);
  });

  it("T087: deve tratar séries de tamanhos diferentes", () => {
    const short: MonthlyDataPoint[] = [
      { date: "2024-01", value: 10 },
      { date: "2024-06", value: 20 },
    ];
    const result = calculateCorrelation(short, selic);
    expect(result).not.toBeNull();
  });

  it("T087: deve retornar null se nenhuma data em comum", () => {
    const a: MonthlyDataPoint[] = [{ date: "1990-01", value: 10 }];
    const b: MonthlyDataPoint[] = [{ date: "2024-01", value: 20 }];
    expect(calculateCorrelation(a, b)).toBeNull();
  });
});

describe("emptySeriesHandling", () => {
  it("T088: accumulatedChange com série vazia deve retornar null", () => {
    expect(accumulatedChange([])).toBeNull();
  });

  it("T088: findExtreme min com série vazia deve retornar null", () => {
    expect(findExtreme([], "min")).toBeNull();
  });

  it("T088: findExtreme max com série vazia deve retornar null", () => {
    expect(findExtreme([], "max")).toBeNull();
  });

  it("T088: calculateAverage com série vazia deve retornar null", () => {
    expect(calculateAverage([])).toBeNull();
  });

  it("T088: filterByGovernment com série vazia deve retornar []", () => {
    expect(filterByGovernment([], lula1)).toEqual([]);
  });

  it("T088: calculateCorrelation com série vazia deve retornar null", () => {
    expect(calculateCorrelation([], selic)).toBeNull();
    expect(calculateCorrelation(selic, [])).toBeNull();
  });

  it("T088: filterByDateRange com série vazia deve retornar []", () => {
    expect(filterByDateRange([], "2020-01", "2025-12")).toEqual([]);
  });

  it("T088: percentChange com zero inicial deve retornar null", () => {
    expect(percentChange(0, 100)).toBeNull();
  });
});
