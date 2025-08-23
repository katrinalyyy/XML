import {ProductCardComponent} from "../../components/product-card/index.js";
import {Carousel} from "../../components/carousel/index.js"; 

export class MainPage {
    constructor(parent, { handleCardClick, handleAddToCart }) {
        this.parent = parent;
        this.handleCardClick = handleCardClick;
        this.handleAddToCart = handleAddToCart;
    }
    
    getData() {
        return [
            {
                id: 1,
                src: "https://pcdn.goldapple.ru/p/p/99000046786/web/696d674d61696e5f63336362393932646662666234303864623365666337656232383863393563368dd54cc37a70ce2fullhd.webp",
                title: "MOIRA loveheat blush",
                //text: "2069 ₽",
                price: "2069 ₽",
                discountedPrice: "1862 ₽",
                volume: "5.5 г"
            },
            {
                id: 2,
                src: "https://pcdn.goldapple.ru/p/p/19000082066/web/696d674d61696e8dc83a9f8cd1b28fullhd.webp",
                title: "DHC LIP CREAM",
                //text: "1 562 ₽"
                price: "1562 ₽",
                discountedPrice: "1405 ₽",
                volume: "1.5 г"
            },
            {
                id: 3,
                src: "https://pcdn.goldapple.ru/p/p/19000159585/web/696d674d61696e8dc8412ec372e9cfullhd.webp",
                title: "FOR ME by gold apple Tooth hair comb",
                //text: "345 ₽"
                price: "345 ₽",
                discountedPrice: "310 ₽",
                volume: "1 шт"
            },
        ]
    }

    getHTML() {
        const carousel = new Carousel();
        return `
            <div id="main-page">
                <div id="delivery-bar">
                    <span class="delivery-bar__label">АДРЕС ДОСТАВКИ</span>
                    <span class="delivery-bar__city">Москва</span>
                </div>
                ${carousel.getHTML()}
                <div class="products-container" id="products-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const productsContainer = document.getElementById('products-container');
        const data = this.getData();
        
        data.forEach(item => {
            const productCard = new ProductCardComponent(productsContainer);
            productCard.render(
                item,
                this.handleCardClick,
                this.handleAddToCart
            );
        });
    }
}