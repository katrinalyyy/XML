import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";

class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle-heart');
    this.initTheme();
  }

  toggleTheme() {
    document.body.classList.toggle('light-theme');
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    this.updateThemeStyles();
  }

  updateThemeStyles() {
    const buttons = document.querySelectorAll('.btn-theme-aware');
    buttons.forEach(btn => {
      btn.classList.toggle('light-theme', document.body.classList.contains('light-theme'));
    });
  }

  restoreTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
      this.updateThemeStyles();
    }
  }

  initTheme() {
    this.restoreTheme();
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }
}

const CART_KEY = "cartCount";

const getCartCount = () => Number(localStorage.getItem(CART_KEY) || 0);
const setCartCount = (n) => localStorage.setItem(CART_KEY, String(n));

document.addEventListener("DOMContentLoaded", () => {
    new ThemeManager();
    
    // Находим элемент счётчика корзины
    const cartCounterEl = document.getElementById("cart-counter");
    cartCounterEl.textContent = getCartCount();
    
    const root = document.getElementById("root");
    if (!root) return;
    
    // Обработчик добавления в корзину
    const handleAddToCart = (e) => {
        const newCount = getCartCount() + 1;
        setCartCount(newCount);
        cartCounterEl.textContent = newCount;
    };
    
    // Обработчик перехода на страницу товара
    const handleCardClick = (e) => {
        const cardId = +e.currentTarget.dataset.id;
        const mainPage = new MainPage(root, { handleCardClick, handleAddToCart });
        const data = mainPage.getData().find(item => item.id === cardId);
        
        if (data) {
            const productPage = new ProductPage(root, data);
            productPage.render();
        }
    };
    
    // Инициализация главной страницы
    const mainPage = new MainPage(root, { handleCardClick, handleAddToCart });
    mainPage.render();
});