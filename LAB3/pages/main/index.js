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
                src: "https://pcdn.goldapple.ru/p/p/19000313343/web/696d67416464315064708ddc59d4cc08808fullhd.webp",
                title: "GIVENCHY prisme libre",
                //text: "2069 ₽",
                price: "7310 ₽",
                discountedPrice: "7000 ₽",
                volume: "9.6 г"
            },
            {
                id: 2,
                src: "https://pcdn.goldapple.ru/p/p/9400500005/web/696d674d61696e5064708ddc3ae6e5b8c3bfullhd.webp",
                title: "ERBORIAN red",
                //text: "1 562 ₽"
                price: "1749 ₽",
                discountedPrice: "1600 ₽",
                volume: "15 ml"
            },
            {
                id: 3,
                src: "https://pcdn.goldapple.ru/p/p/19000222299/web/696d674d61696e5064708ddc56356351d1afullhd.webp",
                title: "THE ACT hydrating face toner",
                //text: "345 ₽"
                price: "1058 ₽",
                discountedPrice: "1000 ₽",
                volume: "200 ml"
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