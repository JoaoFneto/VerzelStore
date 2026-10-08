# Verzel Store - Testes de Automação

## Objetivo

Documentar os testes automatizados de ponta a ponta da Verzel Store, incluindo os cenários executados, os resultados esperados e as evidências capturadas pelo Playwright durante cada etapa.

## Escopo

Validação da jornada de compra, incluindo seleção de produtos, aplicação de cupom, preenchimento dos dados do cliente e confirmação do pedido.

## Resumo da Execução

| Caso de Teste | Status |
|---------------|---------|
| CT01 | ✅ Aprovado |
| CT02 | ✅ Aprovado |
| CT03 | ✅ Aprovado |

---

# CT01 - Jornada de compra com cupom válido

## Cenário

```gherkin
Scenario: Concluir uma compra utilizando um cupom válido

Given que acesso a loja e adiciono os produtos P002 e P003 ao carrinho
When aplico o cupom válido "BEMVINDO10"
And preencho os dados do cliente no checkout
And confirmo o pedido
Then o sistema deve informar que o cupom foi aplicado
And deve aplicar 10% de desconto sobre o subtotal elegível
And deve exibir a confirmação do pedido
And devo conseguir retornar à loja
```

## Status

✅ APROVADO

## Evidências

![CT01 - Loja inicial](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-01-loja-inicial.png)
![CT01 - Adicionar produto P002](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-02-adicionar-produto-p002.png)
![CT01 - Adicionar produto P003](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-03-adicionar-produto-p003.png)
![CT01 - Abrir carrinho](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-04-abrir-carrinho.png)
![CT01 - Aplicar cupom válido](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-05-aplicar-cupom-valido.png)
![CT01 - Abrir checkout](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-06-abrir-checkout.png)
![CT01 - Preencher dados do cliente](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-07-preencher-dados.png)
![CT01 - Pedido confirmado](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-08-pedido-confirmado.png)
![CT01 - Retornar à loja](evidencias/EvidenciaAutomation/CT-PLAYW-01/CT01-09-retornar-a-loja.png)

## Observações

O teste adiciona os produtos P002 e P003, aplica o cupom "BEMVINDO10" e valida a mensagem de aplicação do cupom. Em seguida, preenche os dados do cliente, confirma o pedido e verifica o retorno à loja.

---

# CT02 - Jornada de compra com cupom inválido

## Cenário

```gherkin
Scenario: Concluir uma compra após informar um cupom inválido

Given que acesso a loja e adiciono os produtos P001 e P005 ao carrinho
When informo o cupom "CUPOMINVALIDO"
Then o sistema deve exibir a mensagem "Cupom inválido."
When preencho os dados do cliente no checkout
And confirmo o pedido
Then o sistema deve exibir a confirmação do pedido
And devo conseguir retornar à loja
```

## Status

✅ APROVADO

## Evidências

![CT02 - Loja inicial](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-01-loja-inicial.png)
![CT02 - Adicionar produto P001](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-02-adicionar-produto-p001.png)
![CT02 - Adicionar produto P005](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-03-adicionar-produto-p005.png)
![CT02 - Abrir carrinho](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-04-abrir-carrinho.png)
![CT02 - Validar cupom inválido](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-05-validar-cupom-invalido.png)
![CT02 - Abrir checkout](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-06-abrir-checkout.png)
![CT02 - Preencher dados do cliente](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-07-preencher-dados.png)
![CT02 - Pedido confirmado](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-08-pedido-confirmado.png)
![CT02 - Retornar à loja](evidencias/EvidenciaAutomation/CT-PLAYW-02/CT02-09-retornar-a-loja.png)

## Observações

O teste adiciona os produtos P001 e P005 e verifica que o cupom "CUPOMINVALIDO" é rejeitado com a mensagem esperada. A jornada prossegue pelo checkout até a confirmação do pedido.

---

# CT03 - Jornada de compra com cupom expirado

## Cenário

```gherkin
Scenario: Concluir uma compra após informar um cupom expirado

Given que acesso a loja e adiciono os produtos P005 e P003 ao carrinho
When informo o cupom expirado "VERAO2026"
Then o sistema deve exibir a mensagem "Cupom expirado."
When preencho os dados do cliente no checkout
And confirmo o pedido
Then o sistema deve exibir a confirmação do pedido
And devo conseguir retornar à lista de produtos
```

## Status

✅ APROVADO

## Evidências

![CT03 - Loja inicial](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-01-loja-inicial.png)
![CT03 - Adicionar produto P005](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-02-adicionar-produto-p005.png)
![CT03 - Adicionar produto P003](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-03-adicionar-produto-p003.png)
![CT03 - Abrir carrinho](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-04-abrir-carrinho.png)
![CT03 - Validar cupom expirado](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-05-validar-cupom-expirado.png)
![CT03 - Abrir checkout](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-06-abrir-checkout.png)
![CT03 - Preencher dados do cliente](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-07-preencher-dados.png)
![CT03 - Pedido confirmado](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-08-pedido-confirmado.png)
![CT03 - Retornar à loja](evidencias/EvidenciaAutomation/CT-PLAYW-03/CT03-09-retornar-a-loja.png)

## Observações

O teste adiciona os produtos P005 e P003 e verifica que o cupom "VERAO2026" é identificado como expirado. A jornada prossegue pelo checkout até a confirmação do pedido e valida o retorno à lista de produtos.
