import { MainPage } from "./pages/main/index.js";
import { ProductPage } from "./pages/product/index.js";
// import { CartPage }    from "./pages/cart/index.js";
// import { getCartItems } from "./modules/cartStorage.js";
import { CartPage } from "./pages/cart/index.js";
import { getCartItems, addCartItem } from "./modules/cartStorage.js";

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

// const CART_KEY = "cartCount";
// const getCartCount = () => Number(localStorage.getItem(CART_KEY) || 0);
// const setCartCount = n => localStorage.setItem(CART_KEY, String(n));

// document.addEventListener("DOMContentLoaded", () => {
//   // тема
//   new ThemeManager();

//   // счётчик
//   const cartCounterEl = document.getElementById("cart-counter");
//   cartCounterEl.textContent = getCartCount();

//   const root = document.getElementById("root");
//   if (!root) return;

//   // 1) Обработчик «Добавить в корзину» теперь принимает (id)
//   const handleAddToCart = (id) => {
//     const newCount = getCartCount() + 1;
//     setCartCount(newCount);
//     cartCounterEl.textContent = newCount;
//     console.log("Добавили в корзину товар", id);
//   };

//   // 2) Обработчик «Перейти» теперь принимает (id)
//   const handleCardClick = (id) => {
//     console.log("Перешли на страницу товара с id =", id);
//     // Передаём в конструктор именно id
//     const productPage = new ProductPage(root, id, {
//       goBack: () => window.history.back(),
//       addToCart: handleAddToCart,
//     });
//     productPage.render();
//   };

//   // 3) Запускаем главную страницу
//   const mainPage = new MainPage(root, {
//     handleCardClick,
//     handleAddToCart
//   });
//   mainPage.render();
// });


// document.addEventListener("DOMContentLoaded", () => {
//   new ThemeManager();

//   const root = document.getElementById("root");
//   if (!root) return;

//   // вспомогалка обновить цифру в шапке
//   const cartCounterEl = document.getElementById("cart-counter");
//   function updateCounter() {
//     cartCounterEl.textContent = getCartItems().length;
//   }

//   // Добавить в корзину
//   const handleAddToCart = id => {
//     import("./modules/cartStorage.js").then(mod => {
//       mod.addCartItem(id);
//       updateCounter();
//     });
//   };

//   let mainPage;
//   // Перейти к детали
//   const handleCardClick = id => {
//     const productPage = new ProductPage(root, id, {
//       goBack: () => mainPage.render(),
//       addToCart: handleAddToCart,
//     });
//     productPage.render();
//   };

//   // Клик по иконке корзины
//   document.getElementById("shop-cart").addEventListener("click", () => {
//     const cartPage = new CartPage(root, {
//       goBack:    () => mainPage.render(),
//       updateCounter,
//     });
//     cartPage.render();
//   });

//   // Инициализация начальной страницы
//   mainPage = new MainPage(root, {
//     handleCardClick,
//     handleAddToCart,
//   });
//   mainPage.render();
//   updateCounter();
// });


document.addEventListener("DOMContentLoaded", () => {
  new ThemeManager();


  const root = document.getElementById("root");
    if (!root) return;
  const cartBtn = document.getElementById("shop-cart");
  const cartCounterEl = document.getElementById("cart-counter");

  // function updateCounter() {
  //   cartCounterEl.textContent = getCartItems().length;
  // }

  function updateCounter() {
    const items = getCartItems();            // [{id:1, qty:3}, {id:2, qty:1}, …]
    const totalQty = items
      .map(item => item.qty)
      .reduce((sum, q) => sum + q, 0);
    cartCounterEl.textContent = totalQty;
  }

  // «Добавить в корзину» из любой страницы
  const handleAddToCart = id => {
    addCartItem(id);
    updateCounter();
  };

  let mainPage;
  const handleCardClick = id => {
    const productPage = new ProductPage(root, id, {
      goBack: () => mainPage.render(),
      addToCart: handleAddToCart
    });
    productPage.render();
  };

  // открыть корзину
  cartBtn.addEventListener("click", () => {
    const cartPage = new CartPage(root, {
      goBack:    () => mainPage.render(),
      updateCounter
    });
    cartPage.render();
  });

  // запуск главной
  mainPage = new MainPage(root, {
    handleCardClick,
    handleAddToCart
  });
  mainPage.render();
  updateCounter();
});