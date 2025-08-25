import { ProductCardComponent } from '../../components/product-card/index.js';
import { Carousel } from '../../components/carousel/index.js';
import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';

export class MainPage {
  /**
   * @param {HTMLElement} parent
   * @param {Object} handlers
   * @param {Function} handlers.handleCardClick
   * @param {Function} handlers.handleAddToCart
   */
  constructor(parent, { handleCardClick, handleAddToCart }) {
    this.parent = parent;
    this.handleCardClick = handleCardClick;
    this.handleAddToCart = handleAddToCart;

    this.carousel = new Carousel();
  }

  getHTML() {
    return `
      <div id="main-page">
        <div id="delivery-bar">
          <span class="delivery-bar__label">АДРЕС ДОСТАВКИ</span>
          <span class="delivery-bar__city">Москва</span>
        </div>

        <!-- здесь вставляем html карусели -->
        ${this.carousel.getHTML()}

        <div class="products-container" id="products-container"></div>
      </div>
    `;
  }

  render() {
    this.parent.innerHTML = '';
    this.parent.insertAdjacentHTML('beforeend', this.getHTML());

    if (typeof this.carousel.init === 'function') {
      this.carousel.init();
    }

    // 3) подгружаем карточки через XHR
    const container = this.parent.querySelector('#products-container');
    ajax.get(stockUrls.getStocks(), (data, status) => {
      if (status === 200 && Array.isArray(data)) {
        data.forEach(item => {
          const card = new ProductCardComponent(container);
          // обёртка: положим сам Event в handleCardClick
          card.render(
            item,
            id => this.handleCardClick(id),     
            id => this.handleAddToCart(id)
          );
        });

      } else {
        container.innerHTML = `<p style="color:red">Ошибка ${status}</p>`;
      }
    });
  }
}
