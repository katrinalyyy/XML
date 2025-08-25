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

      /**
     * @param {object} data
     * @param {(id:number)=>void} onAddToCart
     */
    render(data, onAddToCart) {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML(data));

        const btn = this.parent.querySelector('#add-to-cart-main');
        btn.addEventListener('click', () => {
        onAddToCart(data.id);
        });
  }
}