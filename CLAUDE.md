# CLAUDE.md

## Sobre este projeto

Dashboard interativo "Custo de Vida do Brasileiro" que consome APIs públicas (BCB, DIEESE, ANP), faz ETL dos dados com Python e apresenta a evolução de 6 indicadores econômicos nos últimos 20 anos, com filtro por período de governo. Projeto de portfólio open source.

---

## Stack

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Pipeline — Linguagem | Python | 3.11+ |
| Pipeline — HTTP | Requests | 2.31+ |
| Pipeline — Scraping | BeautifulSoup4 | 4.12+ |
| Pipeline — Dados | Pandas | 2.2+ |
| Pipeline — Testes | Pytest | 8.x |
| Dashboard — Linguagem | TypeScript | 5.3+ |
| Dashboard — Runtime | Node.js | 20 LTS |
| Dashboard — Framework | Next.js | 14.x (App Router) |
| Dashboard — Estilização | Tailwind CSS | 3.4+ |
| Dashboard — Gráficos | Recharts | 2.12+ |
| Dashboard — Testes | Vitest | 1.x |
| Dashboard — Gerenciador | npm | 10+ |
| Infra — CI/CD | GitHub Actions | — |
| Infra — Hospedagem | Cloudflare Pages | — |

---

## Comandos essenciais

```bash
# ===== PIPELINE PYTHON =====
# Instalar dependências do pipeline
cd pipeline && pip install -r requirements.txt

# Rodar pipeline completo (coleta + transforma + exporta)
cd pipeline && python main.py

# Rodar pipeline de um indicador específico
cd pipeline && python main.py --indicador selic

# Rodar testes do pipeline
cd pipeline && pytest

# Rodar testes com cobertura
cd pipeline && pytest --cov=src --cov-report=term-missing

# ===== DASHBOARD NEXT.JS =====
# Instalar dependências do dashboard
npm install

# Rodar em desenvolvimento
npm run dev

# Rodar testes do dashboard
npm test

# Rodar testes em modo watch
npm run test:watch

# Build de produção
npm run build

# Lint
npm run lint

# Verificação de tipos
npm run typecheck
```

---

## Estrutura de pastas

```
custo-de-vida-brasil/
├── pipeline/                    # Pipeline ETL em Python
│   ├── src/
│   │   ├── extractors/          # Módulos de extração (1 por fonte)
│   │   │   ├── __init__.py
│   │   │   ├── bcb.py           # Extrator da API do Banco Central
│   │   │   ├── dieese.py        # Extrator/scraper do DIEESE
│   │   │   └── anp.py           # Extrator dos CSVs da ANP
│   │   ├── transformers/        # Módulos de transformação
│   │   │   ├── __init__.py
│   │   │   └── normalize.py     # Normalização e padronização dos dados
│   │   ├── loaders/             # Módulos de carga (exportação)
│   │   │   ├── __init__.py
│   │   │   └── json_exporter.py # Gera JSONs estáticos pro dashboard
│   │   ├── models/              # Tipos e schemas dos dados
│   │   │   ├── __init__.py
│   │   │   └── indicators.py    # Dataclasses dos indicadores
│   │   └── utils/               # Utilitários compartilhados
│   │       ├── __init__.py
│   │       ├── http_client.py   # Cliente HTTP com retry e backoff
│   │       └── date_utils.py    # Helpers de manipulação de datas
│   ├── tests/
│   │   ├── unit/                # Testes unitários do pipeline
│   │   ├── integration/         # Testes de integração (com mocks de API)
│   │   └── fixtures/            # Dados de teste (respostas mockadas)
│   ├── main.py                  # Entrypoint do pipeline
│   ├── requirements.txt         # Dependências Python
│   └── pytest.ini               # Configuração do Pytest
│
├── src/                         # Dashboard Next.js (App Router)
│   ├── app/
│   │   ├── layout.tsx           # Layout raiz
│   │   ├── page.tsx             # Página principal (dashboard)
│   │   └── globals.css          # Estilos globais + Tailwind
│   ├── components/
│   │   ├── charts/              # Componentes de gráficos
│   │   │   ├── TimeSeriesChart.tsx    # Gráfico de linha temporal principal
│   │   │   ├── CorrelationChart.tsx   # Gráfico de correlação entre indicadores
│   │   │   ├── GovernmentBands.tsx    # Faixas de período de governo
│   │   │   └── ChartTooltip.tsx       # Tooltip customizado dos gráficos
│   │   ├── cards/               # Cards de insight e resumo
│   │   │   ├── InsightCard.tsx        # Card com destaque de dado
│   │   │   └── IndicatorSummary.tsx   # Resumo de um indicador
│   │   ├── filters/             # Componentes de filtro
│   │   │   ├── GovernmentFilter.tsx   # Filtro por período de governo
│   │   │   ├── DateRangeFilter.tsx    # Filtro por período de datas
│   │   │   └── IndicatorToggle.tsx    # Toggle de indicadores no gráfico
│   │   ├── layout/              # Componentes estruturais
│   │   │   ├── Header.tsx             # Cabeçalho
│   │   │   ├── Footer.tsx             # Rodapé com link pro GitHub
│   │   │   └── Section.tsx            # Wrapper de seção
│   │   └── ui/                  # Componentes base reutilizáveis
│   │       ├── Loading.tsx            # Estado de carregamento
│   │       └── ErrorBoundary.tsx      # Tratamento de erros
│   ├── data/                    # Dados estáticos gerados pelo pipeline
│   │   ├── indicators.json      # Dados de todos os indicadores
│   │   ├── governments.json     # Períodos de governo
│   │   └── metadata.json        # Metadados (última atualização, fontes)
│   ├── hooks/                   # React hooks customizados
│   │   ├── useIndicators.ts     # Hook pra carregar e filtrar indicadores
│   │   └── useInsights.ts       # Hook pra calcular insights dos dados
│   ├── types/                   # Tipos TypeScript
│   │   ├── indicator.ts         # Tipos dos indicadores econômicos
│   │   ├── government.ts        # Tipos dos períodos de governo
│   │   └── chart.ts             # Tipos dos gráficos
│   ├── utils/                   # Funções utilitárias
│   │   ├── formatters.ts        # Formatação de moeda, %, datas
│   │   ├── calculations.ts      # Cálculos (variação, correlação, etc.)
│   │   └── constants.ts         # Constantes (cores, labels, config)
│   └── config/                  # Configurações
│       └── chart-config.ts      # Configuração padrão dos gráficos
│
├── tests/                       # Testes do dashboard
│   ├── unit/                    # Testes unitários (utils, hooks)
│   └── integration/             # Testes de integração (componentes)
│
├── .github/
│   └── workflows/
│       ├── update-data.yml      # Cron semanal: roda pipeline e faz deploy
│       └── ci.yml               # CI: lint + testes em PRs
│
├── public/                      # Arquivos estáticos públicos
│   └── og-image.png             # Imagem de preview pro LinkedIn
│
├── .env.example                 # Modelo de variáveis de ambiente
├── .gitignore                   # Arquivos ignorados
├── next.config.js               # Configuração do Next.js
├── tailwind.config.ts           # Configuração do Tailwind
├── tsconfig.json                # Configuração do TypeScript
├── vitest.config.ts             # Configuração do Vitest
├── package.json                 # Dependências e scripts do dashboard
├── CLAUDE.md                    # Este arquivo
├── ARCHITECTURE.md              # Documentação de arquitetura
└── README.md                    # Documentação pública do projeto
```

---

## Convenções de código

### Nomenclatura

| Elemento | Padrão | Exemplo |
|----------|--------|---------|
| Componentes React (arquivo) | PascalCase | `TimeSeriesChart.tsx` |
| Hooks (arquivo) | camelCase com prefixo use | `useIndicators.ts` |
| Utilitários (arquivo) | camelCase | `formatters.ts` |
| Variáveis e funções (TS) | camelCase | `getIndicatorData()` |
| Constantes (TS) | UPPER_SNAKE_CASE | `GOVERNMENT_PERIODS` |
| Tipos/Interfaces (TS) | PascalCase sem prefixo | `Indicator`, `GovernmentPeriod` |
| Módulos Python (arquivo) | snake_case | `bcb.py`, `json_exporter.py` |
| Funções Python | snake_case | `extract_selic_data()` |
| Classes Python | PascalCase | `BCBExtractor` |
| Constantes Python | UPPER_SNAKE_CASE | `BCB_BASE_URL` |

### Estilo — TypeScript/React

- Usar arrow functions pra componentes: `const Component = () => {}`
- Preferir `const` sobre `let`. Nunca usar `var`.
- Funções com mais de 30 linhas devem ser divididas.
- Imports organizados: libs externas primeiro, depois internos, depois tipos.
- Toda função exportada deve ter JSDoc com descrição e parâmetros.
- Componentes: um componente por arquivo, nome do arquivo = nome do componente.
- Props: definir type inline se < 3 props, type separado se >= 3.

### Estilo — Python

- Seguir PEP 8.
- Docstrings em todas as funções públicas (formato Google).
- Type hints em todas as funções.
- Funções com mais de 25 linhas devem ser divididas.
- Imports organizados: stdlib primeiro, depois libs externas, depois internos.
- Usar f-strings pra interpolação.
- Mensagens de log e erro em português.

### Git

```
tipo(escopo): descrição curta

Tipos: feat, fix, refactor, test, docs, chore, data
Escopo: pipeline, dashboard, charts, filters, ci, docs

Exemplos:
feat(pipeline): adicionar extrator do BCB pra Selic e IPCA
feat(dashboard): implementar gráfico de séries temporais
feat(charts): adicionar faixas de governo no gráfico
fix(pipeline): corrigir parsing de datas do DIEESE
test(pipeline): adicionar testes pro extrator do BCB
data(pipeline): atualizar dados de março/2026
docs: atualizar README com instruções de setup
chore(ci): configurar GitHub Action de atualização semanal
```

---

## Variáveis de ambiente

```env
# Não há variáveis secretas neste projeto.
# Todas as APIs usadas são públicas e sem autenticação.

# Configuração do pipeline (opcionais — têm defaults)
BCB_BASE_URL=https://api.bcb.gov.br/dados/serie/bcdata.sgs
ANP_DATA_URL=https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/serie-historica-de-precos-de-combustiveis
DIEESE_URL=https://www.dieese.org.br/cesta/

# Período de coleta
DATA_START_YEAR=2005
DATA_END_YEAR=2025

# Aplicação
NODE_ENV=development
```

---

## Regras do Claude Code

### DEVE fazer
- Rodar testes após cada mudança significativa (`pytest` e `npm test`)
- Seguir a estrutura de pastas definida acima rigorosamente
- Usar os tipos definidos em `src/types/` e `pipeline/src/models/`
- Tratar erros com mensagens descritivas em português
- Manter funções pequenas e com responsabilidade única
- Commitar com mensagens no padrão definido
- Validar dados após extração (verificar se vieram, se o formato está correto)
- Usar retry com backoff exponencial em chamadas HTTP

### NÃO deve fazer
- Instalar dependências fora da lista aprovada sem pedir autorização
- Criar arquivos fora da estrutura definida
- Fazer chamadas a APIs em tempo real no frontend (dados são sempre estáticos)
- Interpolar ou inventar dados faltantes — se não existe, não mostra
- Pular testes pra "ganhar tempo"
- Usar `any` como tipo TypeScript sem justificativa documentada em comentário
- Hardcodar URLs de API dentro dos módulos (usar constantes)
- Commitar arquivos .json de dados com mais de 1MB sem compressão
- Adicionar opinião política nos textos do dashboard

### Quando travar
Se encontrar um problema que não consegue resolver em 3 tentativas:
1. Parar
2. Descrever o problema claramente
3. Listar o que já tentou
4. Pedir orientação

---

## Dependências aprovadas

### Pipeline Python — Produção
| Pacote | Versão | Pra quê |
|--------|--------|---------|
| requests | 2.31+ | Chamadas HTTP pra API do BCB e downloads |
| beautifulsoup4 | 4.12+ | Scraping do DIEESE |
| pandas | 2.2+ | Transformação e análise dos dados |
| lxml | 4.9+ | Parser HTML performático pro BeautifulSoup |

### Pipeline Python — Desenvolvimento
| Pacote | Versão | Pra quê |
|--------|--------|---------|
| pytest | 8.x | Framework de testes |
| pytest-cov | 5.x | Cobertura de testes |
| responses | 0.25+ | Mock de chamadas HTTP nos testes |

### Dashboard — Produção
| Pacote | Versão | Pra quê |
|--------|--------|---------|
| next | 14.x | Framework React com SSG |
| react | 18.x | Biblioteca de UI |
| react-dom | 18.x | Renderização DOM |
| recharts | 2.12+ | Biblioteca de gráficos |
| tailwindcss | 3.4+ | Estilização utilitária |
| date-fns | 3.x | Manipulação de datas no frontend |

### Dashboard — Desenvolvimento
| Pacote | Versão | Pra quê |
|--------|--------|---------|
| typescript | 5.3+ | Tipagem estática |
| vitest | 1.x | Framework de testes |
| @testing-library/react | 14.x | Testes de componentes |
| eslint | 8.x | Lint |
| eslint-config-next | 14.x | Regras de lint do Next.js |

---

## Séries do Banco Central (SGS) — Referência rápida

| Indicador | Código SGS | Periodicidade | Unidade |
|-----------|-----------|---------------|---------|
| Selic Meta | 432 | Diária (usar última do mês) | % a.a. |
| IPCA acumulado 12 meses | 13522 | Mensal | % |
| Dólar comercial (compra) | 3698 | Diária (usar média mensal) | R$/USD |
| Salário Mínimo | 1619 | Mensal (quando muda) | R$ |

**Endpoint padrão:** `https://api.bcb.gov.br/dados/serie/bcdata.sgs.{codigo}/dados?formato=json&dataInicial={dd/MM/aaaa}&dataFinal={dd/MM/aaaa}`

**Limitação:** Máximo de 10 anos por requisição. Fazer 2 chamadas pra cobrir 20 anos.

---

## Contexto adicional

- O projeto não tem backend rodando. O Next.js gera HTML estático via `output: 'export'` e os dados são arquivos JSON em `src/data/`.
- O pipeline Python roda FORA do Next.js — é um processo separado que gera os JSONs que o dashboard consome.
- A atualização semanal via GitHub Actions roda o pipeline Python, commita os JSONs atualizados e faz rebuild/deploy do site.
- Detalhes técnicos completos estão no ARCHITECTURE.md.
- PRD com requisitos de negócio está no PRD-custo-de-vida-brasil.md.
