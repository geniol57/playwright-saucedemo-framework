const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CheckoutPage } = require('../pages/CheckoutPage');

test.describe('Suite Completa de Compras - SauceDemo', () => {

    test('Validación de precio y finalización de compra', async ({ page }) => {
        const login = new LoginPage(page);
        const inv = new InventoryPage(page);
        const check = new CheckoutPage(page);

        await test.step('Autenticación en el sistema', async () => {
            await login.navigate();
            await login.login('standard_user', 'secret_sauce');
        });

        await test.step('Selección de producto y validación de precio', async () => {
            const precioOriginal = await inv.getPrice();
            await inv.addBackpackToCart();
            await inv.goToCart();
            const precioEnCarrito = await page.locator('.inventory_item_price').textContent();
            await expect(precioEnCarrito).toBe(precioOriginal);
        });

        await test.step('Completar formulario y finalizar orden', async () => {
            await check.proceedToCheckout();
            await check.fillCheckoutForm('Juan', 'Perez', '12345');
            await check.finishOrder();
            await expect(check.successHeader).toHaveText('Thank you for your order!');
        });
    });

    test('Intento de login con credenciales incorrectas', async ({ page }) => {
        const login = new LoginPage(page);

        await test.step('Login con usuario inexistente', async () => {
            await login.navigate();
            await login.login('usuario_falso', 'password_falso');
        });

        await test.step('Verificar mensaje de error', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
    });

    test('Validación de formulario de checkout vacío', async ({ page }) => {
        const login = new LoginPage(page);
        const inv = new InventoryPage(page);
        const check = new CheckoutPage(page);

        await test.step('Login y acceso al checkout', async () => {
            await login.navigate();
            await login.login('standard_user', 'secret_sauce');
            await inv.addBackpackToCart();
            await inv.goToCart();
            await check.proceedToCheckout();
        });

        await test.step('Intentar avanzar sin completar datos', async () => {
            await check.continueButton.click(); 
        });

        await test.step('Validar error de campos obligatorios', async () => {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
        });
    });
});