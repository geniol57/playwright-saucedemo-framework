// tests/specs/login.spec.js
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');

test.describe('Escenarios de Login', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('Login exitoso (Camino feliz)', async ({ page }) => {
        await loginPage.login('standard_user', 'secret_sauce');
        await expect(page).toHaveURL(/inventory.html/);
    });

    test('Login fallido con contraseña incorrecta', async ({ page }) => {
        await loginPage.login('standard_user', 'contrasena_mal');
        // Validamos que aparezca el mensaje de error
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toContainText('Username and password do not match');
    });

    test('Login usuario bloqueado', async ({ page }) => {
        await loginPage.login('locked_out_user', 'secret_sauce');
        const errorMsg = page.locator('[data-test="error"]');
        await expect(errorMsg).toContainText('Sorry, this user has been locked out');
    });
});