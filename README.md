# Verzel Store - Projeto de Testes

Projeto de documentação e validação da Verzel Store. Reúne cenários de teste de API, Front-End e automação da jornada de compra, com evidências organizadas por caso de teste.

## Índice

- [Escopo](#escopo)
- [Ferramentas utilizadas](#ferramentas-utilizadas)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Executar os testes automatizados](#executar-os-testes-automatizados)
- [Executar os testes de API no Bruno](#executar-os-testes-de-api-no-bruno)
- [Resultados registrados](#resultados-registrados)
- [Evidências](#evidências)

## Escopo

O projeto organiza três frentes de validação:

1. **API:** validação de consultas de produtos, cálculo do carrinho, cupons e criação de pedidos. Os cenários foram executados manualmente no Bruno e documentados em [`api.md`](./api.md).
2. **Front-End:** validação das regras de cupom, frete, quantidades, apresentação monetária e jornada de compra. Os cenários e resultados estão em [`frontend.md`](./frontend.md).
3. **Automação E2E:** testes Playwright da jornada de compra com cupom válido, inválido e expirado. Os cenários e as imagens por etapa estão em [`automacao.md`](./automacao.md).

Os testes automatizados acessam o ambiente publicado configurado em `playwright.config.js`; não é necessário iniciar uma aplicação local para executá-los.

## Ferramentas utilizadas

| Ferramenta | Utilização |
|------------|------------|
| [Node.js](https://nodejs.org/) e npm | Instalação das dependências e execução do Playwright |
| [Playwright Test](https://playwright.dev/) | Automação E2E com navegador Chromium |
| Chromium | Navegador configurado para os testes automatizados |
| [Bruno](https://www.usebruno.com/) | Execução manual das requisições de API |
| Markdown | Documentação dos cenários, resultados e evidências |

## Estrutura do projeto

```text
.
├── README.md
├── api.md
├── frontend.md
├── automacao.md
├── playwright.config.js
├── package.json
├── package-lock.json
├── tests/
│   └── store.spec.js
├── Verzel-API/
│   ├── opencollection.yml
│   └── Lista de Produto.yml
└── evidencias/
    ├── EvidenciaAPI/
    │   └── CT-API-13 ... CT-API-21/
    ├── EvidenciaFront/
    │   └── CT-FRONT-01 ... CT-FRONT-12/
    └── EvidenciaAutomation/
        ├── CT-PLAYW-01/
        ├── CT-PLAYW-02/
        └── CT-PLAYW-03/
```

Os diretórios `playwright-report/`, `test-results/` e `node_modules/` são gerados localmente e ignorados pelo Git.

## Pré-requisitos

- Node.js e npm instalados.
- Acesso à internet para instalar dependências e acessar o ambiente de teste da loja.
- Bruno instalado para repetir manualmente as requisições de API.

## Executar os testes automatizados

Na pasta raiz do projeto, instale as dependências:

```bash
npm ci
```

Instale o Chromium usado pelo Playwright:

```bash
npx playwright install chromium
```

Execute todos os testes E2E:

```bash
npx playwright test
```

Execute apenas um dos casos automatizados:

```bash
npx playwright test --grep "CT01"
npx playwright test --grep "CT02"
npx playwright test --grep "CT03"
```

Os testes estão em [`tests/store.spec.js`](./tests/store.spec.js). O navegador está configurado para abrir em modo visível. Após cada etapa bem-sucedida, o teste salva uma captura PNG (`fullPage`) na pasta do respectivo caso:

- CT01: `evidencias/EvidenciaAutomation/CT-PLAYW-01/`
- CT02: `evidencias/EvidenciaAutomation/CT-PLAYW-02/`
- CT03: `evidencias/EvidenciaAutomation/CT-PLAYW-03/`

Os nomes das imagens identificam o caso, a ordem e a etapa, por exemplo `CT01-05-aplicar-cupom-valido.png`. As capturas são geradas durante uma nova execução; não são produzidas pelo comando de abrir o relatório.

Para abrir o relatório HTML gerado pela execução:

```bash
npx playwright show-report
```

## Executar os testes de API no Bruno

Os testes de API descritos em [`api.md`](./api.md) foram executados manualmente pelo Bruno. Eles **não** são executados pelo comando `npx playwright test`.

1. Abra o Bruno.
2. Abra ou importe a coleção localizada na pasta `Verzel-API/`.
3. Selecione e envie as requisições da coleção, conferindo status HTTP, corpo da resposta e regras esperadas no cenário correspondente de [`api.md`](./api.md).
4. Consulte o resultado e as capturas em `evidencias/EvidenciaAPI/CT-API-<número>/`.

A pasta versionada contém os arquivos `opencollection.yml` e `Lista de Produto.yml`. O arquivo de requisição incluído contém uma chamada `POST /api/pedidos` com quantidade zero, correspondente ao cenário de validação de quantidade inválida. Para repetir os demais casos CT13–CT20, consulte os cenários, dados e resultados documentados em `api.md`; não há um comando de execução automática de API configurado neste projeto.

## Resultados registrados

Os resultados abaixo refletem os documentos de teste existentes neste repositório:

| Frente | Casos documentados | Resultado registrado |
|--------|--------------------|----------------------|
| API | CT13 a CT21 (9 casos) | 9 aprovados |
| Front-End | CT01 a CT12 (12 casos) | 11 aprovados e 1 reprovado |
| Automação E2E | CT01 a CT03 (3 casos) | Aprovados na execução registrada |

### Ponto de atenção: Front-End CT06

O caso CT06 está registrado como reprovado em [`frontend.md`](./frontend.md). O critério documentado prevê frete grátis para subtotal igual ou superior a R$ 200,00, mas a execução com subtotal exatamente igual a R$ 200,00 cobrou R$ 19,90. O caso com subtotal acima de R$ 200,00 concedeu frete grátis. Consulte o relatório para os detalhes e evidências.

### Limite de verificação da automação CT01

O cenário do CT01 documenta o desconto de 10% do cupom `BEMVINDO10`. Na implementação atual, a automação valida a mensagem de aplicação do cupom e a confirmação do pedido, mas não faz uma asserção numérica independente do cálculo do desconto. Essa regra também está descrita nos testes de API e Front-End.

## Evidências

As capturas estão organizadas por ferramenta e caso, dentro de [`evidencias/`](./evidencias/). Os documentos de teste contêm as imagens incorporadas e as observações detalhadas:

- [Testes de API](./api.md)
- [Testes de Front-End](./frontend.md)
- [Testes de Automação](./automacao.md)
