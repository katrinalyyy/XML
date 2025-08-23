export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
        <div class="product-page">
            <div class="product-card">
                <div class="product-image">
                    <img src="${data.src}" alt="${data.title}">
                </div>
                <div class="product-details">
                    <h1>${data.title}</h1>
                    <div class="product-volume">${data.volume}</div>
                    <div class="product-prices">
                        <span class="old-price">${data.price}</span>
                        <span class="new-price">${data.discountedPrice}</span>
                        <div class="price-note">по максимальной карте</div>
                    </div>
                    <div class="installment-plan">от ${Math.round(parseInt(data.discountedPrice)/4)} ₽ × 4 платежа <a href="#">подробнее →</a></div>
                    <div class="auth-note">① авторизуйся и получай бонусы</div>
                    <button class="add-to-cart-btn-product" id="add-to-cart-main">ДОБАВИТЬ В КОРЗИНУ</button>
                    <div class="availability">НАЛИЧИЕ В МАГАЗИНАХ →</div>
                </div>
            </div>
        </div>
    `;
    }

    render(data, onAddToCart) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        
        document.getElementById('add-to-cart-main')
            .addEventListener('click', onAddToCart);
    }
}