export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }
    
    getHTML(data) {
        return `
        <div class="card" style="width: 300px;">
            <img class="card-img-top" src="${data.src}" alt="картинка">
            <div class="card-body">
                <h5 class="card-title">${data.title}</h5>
                <div class="card-prices">
                    <span class="card-base-price">${data.price}</span>
                </div>
                <button class="btnbtn" id="click-card-${data.id}" data-id="${data.id}">Перейти</button>
            </div>
            <button class="add-to-cart-btn" id="add-to-cart-${data.id}" data-id="${data.id}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
            </button>
        </div>
    `;
    }

    render(data, onCardClick, onAddToCart) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
    
        // Слушатель для кнопки "Перейти"
        this.parent
            .querySelector(`#click-card-${data.id}`)
            .addEventListener('click', onCardClick);
    
        // Слушатель для кнопки "Добавить в корзину"
        this.parent
            .querySelector(`#add-to-cart-${data.id}`)
            .addEventListener('click', onAddToCart);
    }
}