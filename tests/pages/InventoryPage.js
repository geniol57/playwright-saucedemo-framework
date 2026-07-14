// tests/pages/InventoryPage.js
class InventoryPage {
    constructor(page) {
        this.page = page;
        this.itemPrice = page.locator('.inventory_item_price').first();
        this.addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.cartIcon = page.locator('.shopping_cart_link');
    }

    async getPrice() {
        const priceText = await this.itemPrice.textContent();
        return priceText; // Devuelve algo como "$29.99"
    }

    async addBackpackToCart() {
        await this.addToCartButton.click();
    }

    async goToCart() {
        await this.cartIcon.click();
    }
}
module.exports = { InventoryPage };