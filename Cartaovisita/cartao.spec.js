// @ts-check

import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('https://cartao-de-visitas-1f916.web.app')
    await expect(page.getByRole('link', { name: '' })).toBeVisible();
});

test.describe('ST000 - Testes Home', () =>{
    test('carregar pagina home', async ({ page }) => {
        // Expect a title "to contain" a substring.
        await expect(page).toHaveTitle(/Cartão de Visitas/);
        await expect(page.locator('body')).toBeVisible();
        
    }); 






});

test.describe('ST001 - Testes de email', () => {

    test.beforeEach('Carregar pagina email', async ({ page }) => {
        await page.getByRole('link', { name: '' }).click();
        await expect(page.getByRole('link', { name: '' })).not.toBeVisible();
        await expect(page).toHaveURL('https://cartao-de-visitas-1f916.web.app/email');

        await expect(page.getByRole('img', { name: 'Catterina' })).toBeVisible();
        await expect(page.getByText('Catterina Vittorazzi Salvador')).toBeVisible();
        await expect(page.getByText('Trainee')).toBeVisible();

        let visivel = ['Nome', 'Email', 'Mensagem']
        for (const element of visivel) {
            await expect(page.getByText(element)).toBeVisible();
            await expect(page.getByText(element)).toBeEditable();
        }

        expect(page.getByRole('button', { name: 'Voltar' })).toBeVisible
        expect(page.getByRole('button', { name: 'Enviar' })).toBeVisible

    });

    test('fill', async ({ page }) => {
        
        await page.locator('input[name="user_name"]').fill('teste');
        await page.locator('input[name="user_email"]').fill('teste@teste.com');
        await page.locator('textarea[name="message"]').fill('testerr');
        page.getByRole('button', { name: 'Enviar' }).click();

    });

});