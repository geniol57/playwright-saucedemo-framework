// tests/pages/LoginPage.js
class LoginPage {
    constructor(page) {
        this.page = page;
        // Definimos los selectores
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    // Método para ir a la URL
    async navigate() {
        await this.page.goto('https://www.saucedemo.com/');
    }

    // Método que recibe parámetros (acá es donde pasaremos el uss y pass)
    async login(username, password) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
module.exports = { LoginPage };