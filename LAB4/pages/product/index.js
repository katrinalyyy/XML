import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";

export class ProductPage {
    constructor(parent, productData) {  
        this.parent = parent;
        this.productData = productData;
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return `
            <div id="product-page"></div>
        `;
    }

    clickBack() {
        // Получаем текущее состояние корзины
        const currentCartCount = parseInt(localStorage.getItem("cartCount") || 0);
        
        // Полностью пересоздаем главную страницу с теми же параметрами
        const mainPage = new MainPage(this.parent, {
            handleCardClick: (e) => {
                const cardId = +e.currentTarget.dataset.id;
                const data = mainPage.getData().find(item => item.id === cardId);
                if (data) {
                    const productPage = new ProductPage(this.parent, data);
                    productPage.render();
                }
            },
            handleAddToCart: () => {
                const newCount = parseInt(localStorage.getItem("cartCount") || 0) + 1;
                localStorage.setItem("cartCount", newCount);
                document.getElementById("cart-counter").textContent = newCount;
            }
        });
        
        // Очищаем и перерисовываем
        this.parent.innerHTML = '';
        mainPage.render();
        
        // Восстанавливаем счетчик
        document.getElementById("cart-counter").textContent = currentCartCount;
    }

    addToCart() {
        const newCount = getCartCount() + 1;
        setCartCount(newCount);
        document.getElementById("cart-counter").textContent = newCount;
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
    
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));

        const product = new ProductComponent(this.pageRoot);
        product.render(this.productData, this.addToCart.bind(this));
    }
}

// Добавляем функции работы с корзиной
const CART_KEY = "cartCount";
const getCartCount = () => Number(localStorage.getItem(CART_KEY) || 0);
const setCartCount = (n) => localStorage.setItem(CART_KEY, String(n));