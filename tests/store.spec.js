import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { expect, test } from '@playwright/test';

const evidenceFolders = {
    CT01: 'CT-PLAYW-01',
    CT02: 'CT-PLAYW-02',
    CT03: 'CT-PLAYW-03',
};

async function runStep(page, testInfo, stepNumber, name, action) {
    await test.step(name, action);

    const ct = testInfo.title.match(/^CT0[123]/)?.[0];
    const folder = evidenceFolders[ct];
    if (!folder) {
        throw new Error(`Não foi possível identificar a pasta de evidências para o teste: ${testInfo.title}`);
    }

    const evidencePath = path.resolve(testInfo.config.rootDir, '..', 'evidencias', 'EvidenciaAutomation', folder);
    await mkdir(evidencePath, { recursive: true });
    await page.screenshot({
        path: path.join(evidencePath, `${ct}-${String(stepNumber).padStart(2, '0')}-${name}.png`),
        fullPage: true,
    });
}

test('CT01 - Validar a Jornada completa de compra com sucesso com cupom valido', async ({ page }, testInfo) => {
    await runStep(page, testInfo, 1, 'loja-inicial', () => page.goto('/'));
    await runStep(page, testInfo, 2, 'adicionar-produto-p002', () =>
        page.locator('.produto-corpo').filter({ has: page.locator('#nome-P002') }).locator('button').click());
    await runStep(page, testInfo, 3, 'adicionar-produto-p003', () =>
        page.locator('.produto-corpo').filter({ has: page.locator('#nome-P003') }).locator('button').click());
    await runStep(page, testInfo, 4, 'abrir-carrinho', () => page.locator('.link-carrinho').click());
    await runStep(page, testInfo, 5, 'aplicar-cupom-valido', async () => {
        await page.locator('#campo-cupom').fill('BEMVINDO10');
        await page.locator('[class*="botao-secundario"]').click();
        const cupomAplicado = page.locator('.cupom-aplicado p');
        await expect(cupomAplicado).toBeVisible();
        await expect(cupomAplicado).toContainText('aplicado.');
    });
    await runStep(page, testInfo, 6, 'abrir-checkout', () =>
        page.locator('.botao.botao-primario.botao-largo').click());
    await runStep(page, testInfo, 7, 'preencher-dados', async () => {
        await page.locator('#campo-nome').fill('João freire');
        await page.locator('#campo-email').fill('freireneto92@gmail.com');
        await page.locator('#campo-cep').fill('55760000');
    });
    await runStep(page, testInfo, 8, 'pedido-confirmado', async () => {
        await page.locator('[class*="botao-primario"]').click();
        await expect(page.locator('.confirmacao-selo')).toContainText('Pedido confirmado');
    });
    await runStep(page, testInfo, 9, 'retornar-a-loja', async () => {
        await page.locator('[class*="botao-primario"]').click();
        expect(page.url()).toContain('https://verzel-store.qa-test-verzel-store.workers.dev/');
    });
});

test('CT02 - Validar a Jornada completa de compra com sucesso com cupom inválido', async ({ page }, testInfo) => {
    await runStep(page, testInfo, 1, 'loja-inicial', () => page.goto('/'));
    await runStep(page, testInfo, 2, 'adicionar-produto-p001', () =>
        page.locator('.produto-corpo').filter({ has: page.locator('#nome-P001') }).locator('button').click());
    await runStep(page, testInfo, 3, 'adicionar-produto-p005', () =>
        page.locator('.produto-corpo').filter({ has: page.locator('#nome-P005') }).locator('button').click());
    await runStep(page, testInfo, 4, 'abrir-carrinho', () => page.locator('.link-carrinho').click());
    await runStep(page, testInfo, 5, 'validar-cupom-invalido', async () => {
        await page.locator('#campo-cupom').fill('CUPOMINVALIDO');
        await page.locator('[class*="botao-secundario"]').click();
        const mensagemCupom = page.locator('#mensagem-cupom');
        await expect(mensagemCupom).toBeVisible();
        await expect(mensagemCupom).toHaveText('Cupom inválido.');
    });
    await runStep(page, testInfo, 6, 'abrir-checkout', () =>
        page.locator('.botao.botao-primario.botao-largo').click());
    await runStep(page, testInfo, 7, 'preencher-dados', async () => {
        await page.locator('#campo-nome').fill('Ricardo Silva');
        await page.locator('#campo-email').fill('ricardoneto@gmail.com');
        await page.locator('#campo-cep').fill('51760000');
    });
    await runStep(page, testInfo, 8, 'pedido-confirmado', async () => {
        await page.locator('[class*="botao-primario"]').click();
        await expect(page.locator('.confirmacao-selo')).toContainText('Pedido confirmado');
    });
    await runStep(page, testInfo, 9, 'retornar-a-loja', async () => {
        await page.locator('[class*="botao-primario"]').click();
        await expect(page.locator('.marca-loja')).toContainText('store');
    });
});

test('CT03 - Validar a Jornada completa de compra com sucesso com cupom expirado', async ({ page }, testInfo) => {
    await runStep(page, testInfo, 1, 'loja-inicial', () => page.goto('/'));
    await runStep(page, testInfo, 2, 'adicionar-produto-p005', () =>
        page.locator('.produto-corpo').filter({ has: page.locator('#nome-P005') }).locator('button').click());
    await runStep(page, testInfo, 3, 'adicionar-produto-p003', () =>
        page.locator('.produto-corpo').filter({ has: page.locator('#nome-P003') }).locator('button').click());
    await runStep(page, testInfo, 4, 'abrir-carrinho', () => page.locator('.link-carrinho').click());
    await runStep(page, testInfo, 5, 'validar-cupom-expirado', async () => {
        await page.locator('#campo-cupom').fill('VERAO2026');
        await page.locator('[class*="botao-secundario"]').click();
        const mensagemCupom = page.locator('#mensagem-cupom');
        await expect(mensagemCupom).toBeVisible();
        await expect(mensagemCupom).toHaveText('Cupom expirado.');
    });
    await runStep(page, testInfo, 6, 'abrir-checkout', () =>
        page.locator('.botao.botao-primario.botao-largo').click());
    await runStep(page, testInfo, 7, 'preencher-dados', async () => {
        await page.locator('#campo-nome').fill('Paulo neto');
        await page.locator('#campo-email').fill('pauloneto@gmail.com');
        await page.locator('#campo-cep').fill('53760000');
    });
    await runStep(page, testInfo, 8, 'pedido-confirmado', async () => {
        await page.locator('[class*="botao-primario"]').click();
        await expect(page.locator('.confirmacao-selo')).toContainText('Pedido confirmado');
    });
    await runStep(page, testInfo, 9, 'retornar-a-loja', async () => {
        await page.locator('[class*="botao-primario"]').click();
        await expect(page.locator('.active')).toContainText('Produtos');
    });
});