/**
 * Timeline vertical de marcos econômicos dos últimos 20 anos.
 *
 * 12 eventos com tipo (crescimento/crise), título, texto narrativo
 * e badges com dados-chave. Conteúdo editorial fixo.
 */

type TimelineEvent = {
  date: string;
  type: "growth" | "crisis";
  title: string;
  body: string;
  badges: string[];
};

const EVENTS: TimelineEvent[] = [
  {
    date: "2005–2007",
    type: "growth",
    title: "O milagrinho brasileiro",
    body: "A China comprava tudo que o Brasil plantava e extraía. Soja, minério, petróleo — tudo voando. A Selic caiu de 19% pra 11%, o dólar recuou, o emprego cresceu. O país surfava uma onda que parecia não ter fim. Parecia.",
    badges: ["Selic: 19% → 11%", "Dólar: R$ 2,70 → R$ 1,77"],
  },
  {
    date: "Abril 2008",
    type: "growth",
    title: "Brasil vira investment grade",
    body: "As agências de risco olharam pro Brasil e disseram: 'confiamos'. O país ganhou grau de investimento pela primeira vez. Dólar bateu R$ 1,56 — o menor valor da série. Euforia total. Durou cinco meses.",
    badges: ["Dólar mínimo: R$ 1,56", "Rating: BBB-"],
  },
  {
    date: "Setembro 2008",
    type: "crisis",
    title: "O mundo quebra",
    body: "Lehman Brothers faliu e levou o planeta junto. O dólar saltou de R$ 1,60 pra R$ 2,50 em três meses. O Banco Central reagiu rápido — derrubou a Selic de 13,75% pra 8,75% em sete meses. O Brasil se safou melhor que a maioria, mas o susto foi real.",
    badges: ["Dólar: R$ 1,60 → R$ 2,50", "Selic: 13,75% → 8,75%"],
  },
  {
    date: "2010",
    type: "growth",
    title: "O ano dourado",
    body: "PIB cresceu 7,5% — o melhor resultado desde 1986. Lula saiu do governo com 87% de aprovação. Mais de 40 milhões de brasileiros tinham deixado a pobreza na década anterior. O país se sentia invencível. Spoiler: não era.",
    badges: ["PIB: +7,5%", "Aprovação: 87%"],
  },
  {
    date: "2011–2013",
    type: "crisis",
    title: "A aposta que deu errado",
    body: "O governo Dilma forçou a barra. Derrubou a Selic pra 7,25% — menor da história até então — e deu isenção fiscal pra tudo que era setor. A ideia era turbinar o crescimento. O resultado? Inflação escapou do controle, indústria afundou e os investidores começaram a desconfiar. A conta chegou depois.",
    badges: ["Selic mínima: 7,25%", "Indústria: -2,2% em 2012"],
  },
  {
    date: "2014",
    type: "crisis",
    title: "O chão some",
    body: "Três bombas no mesmo ano. A Lava Jato paralisou a Petrobras — que sozinha respondia por quase 9% do investimento do país. As commodities despencaram: minério de ferro saiu de US$ 187 pra US$ 37 a tonelada. E o ano eleitoral mais polarizado da história recente rachou o país ao meio.",
    badges: ["Minério: US$ 187 → US$ 37", "Petrobras: -9% investimento"],
  },
  {
    date: "2015–2016",
    type: "crisis",
    title: "A tempestade perfeita",
    body: "Não tem como amenizar: foi o pior biênio da economia brasileira em décadas. O IPCA bateu 10,67%. A Selic subiu pra 14,25%. O PIB encolheu 3,5% por dois anos seguidos. Veio o impeachment, a incerteza política, o câmbio descontrolado. Quem vivia de salário sentiu no supermercado. Quem tinha dívida sentiu no banco.",
    badges: ["IPCA: 10,67%", "PIB: -3,5% a.a.", "Selic: 14,25%"],
  },
  {
    date: "2017–2019",
    type: "growth",
    title: "Respirando por aparelhos",
    body: "A economia parou de cair, mas não dá pra chamar de recuperação. Crescimento de 1% ao ano — aquele tipo de melhora que você não sente no bolso. Temer aprovou o teto de gastos. Bolsonaro chegou, a Selic caiu pra 4,5% e a reforma da previdência passou. Os números melhoravam devagar, como quem tá se levantando depois de um nocaute.",
    badges: ["PIB: ~1% a.a.", "Selic: 13% → 4,5%"],
  },
  {
    date: "Março 2020",
    type: "crisis",
    title: "O mundo para",
    body: "COVID-19. O Banco Central jogou a Selic pra 2% — o menor nível da história. O dólar explodiu pra quase R$ 6. A gasolina caiu 20% porque ninguém andava de carro. Mas os preços dos alimentos? Esses subiram — e como subiram. O arroz virou meme, mas a fome não tinha graça nenhuma.",
    badges: ["Selic: 2,00%", "Dólar: R$ 5,90", "Gasolina: -20%"],
  },
  {
    date: "2021–2022",
    type: "crisis",
    title: "A ressaca da pandemia",
    body: "O mundo reabriu e os preços explodiram. Inflação global, guerra na Ucrânia, cadeias de suprimento quebradas. No Brasil, o IPCA voltou a dois dígitos. O Banco Central não teve escolha: subiu a Selic 12 vezes seguidas até 13,75%. Gasolina bateu recorde. A conta do 'fique em casa' chegou — com juros.",
    badges: ["IPCA: 10,06% (2021)", "Selic: 2% → 13,75%"],
  },
  {
    date: "2023–2024",
    type: "growth",
    title: "Calmaria com ressalvas",
    body: "A inflação cedeu. O IPCA voltou pra perto de 4,5% e o PIB surpreendeu — cresceu 3,4% em 2024, o melhor em três anos. O salário mínimo subiu acima da inflação. Parece boa notícia, e é. Mas o endividamento das famílias bateu recorde. Quase metade da renda do brasileiro vai pra pagar dívida. A calmaria é real, mas o mar ainda tá agitado embaixo.",
    badges: ["IPCA: ~4,5%", "PIB: +3,4% (2024)", "Endividamento: recorde"],
  },
  {
    date: "2025",
    type: "crisis",
    title: "De volta aos juros altos",
    body: "A Selic chegou a 15% — o maior patamar em quase duas décadas. O dólar abriu o ano acima de R$ 6, assustou todo mundo, mas recuou pra perto de R$ 5,50. A economia desacelerou. O mercado debate se estamos entrando num novo ciclo recessivo ou se é só o freio do Banco Central fazendo efeito. Enquanto isso, o brasileiro faz as contas no mercado e suspira.",
    badges: ["Selic: 15%", "Dólar: R$ 6+ → ~R$ 5,50"],
  },
];

/** Timeline vertical dos marcos econômicos brasileiros. */
const EconomicTimeline = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
      {EVENTS.map((event, i) => {
        const accentColor =
          event.type === "crisis" ? "var(--accent-red)" : "var(--accent-green)";
        return (
          <div
            key={i}
            style={{
              borderLeft: `3px solid ${accentColor}`,
              paddingLeft: "20px",
              paddingTop: "16px",
              paddingBottom: "16px",
            }}
          >
            <p
              className="font-ui"
              style={{
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: accentColor,
                marginBottom: "4px",
                fontWeight: 500,
              }}
            >
              {event.date}
            </p>
            <p
              style={{
                fontSize: "16px",
                fontWeight: 500,
                marginBottom: "6px",
                color: "var(--text-primary)",
              }}
            >
              {event.title}
            </p>
            <p
              style={{
                fontSize: "14px",
                lineHeight: 1.65,
                color: "var(--text-secondary)",
                marginBottom: "10px",
              }}
            >
              {event.body}
            </p>
            <div className="font-ui" style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {event.badges.map((badge) => (
                <span
                  key={badge}
                  style={{
                    fontSize: "11px",
                    padding: "2px 8px",
                    borderRadius: "10px",
                    border: `1px solid ${accentColor}30`,
                    background: `${accentColor}08`,
                    color: accentColor,
                    fontWeight: 500,
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EconomicTimeline;
