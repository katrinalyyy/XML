import { ajax }      from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';
import {
  getCartItems,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../../modules/cartStorage.js';

export class CartPage {
  constructor(parent, handlers) {
    this.parent   = parent;
    this.handlers = handlers;
  }

  getHTML() {
    const totalQty = getCartItems().reduce((s, x) => s + x.qty, 0);
    return `
      <section class="h-100 h-custom" style="background-color:rgb(248,248,248)">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12">
              <div class="card" style="border-radius: 15px;">
                <div class="card-body p-0">
                  <div class="row g-0">
                    <!-- Левая -->
                    <div class="col-lg-8">
                      <div class="p-5">
                        <div class="d-flex justify-content-between align-items-center mb-5">
                          <h1 class="fw-bold mb-0">Корзина</h1>
                          <h6 class="mb-0 text-muted">
                            ${totalQty} товар${(totalQty % 10 === 1 && totalQty % 100 !== 11) ? '' : 'а'}(ов)
                          </h6>
                        </div>
                        <hr class="my-4">
                        <div id="cart-items-list"></div>
                        <hr class="my-4">
                        <button id="cart-back-btn" class="back-to-shop">
                          <i class="fas fa-long-arrow-alt-left me-2"></i>Назад к покупкам
                        </button>
                      </div>
                    </div>
                    <!-- Правая -->
                    <div class="col-lg-4 bg-body-tertiary">
                      <div class="p-5">
                        <h3 class="fw-bold mb-5 mt-2 pt-1">Итого</h3>
                        <hr class="my-4">
                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">Товаров</h5>
                          <h5 id="summary-count">0</h5>
                        </div>
                        <div class="d-flex justify-content-between mb-4">
                          <h5 class="text-uppercase">Сумма</h5>
                          <h5 id="summary-sum">0 ₽</h5>
                        </div>
                        <button id="cart-clear-btn" class="btn-clear">
                          Очистить корзину
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async render() {
    this.parent.innerHTML = this.getHTML();

    this.parent.querySelector('#cart-back-btn')
      .addEventListener('click', this.handlers.goBack);

    this.parent.querySelector('#cart-clear-btn')
      .addEventListener('click', () => {
        clearCart();
        this.handlers.updateCounter();
        this.render();
      });

    const listRoot = this.parent.querySelector('#cart-items-list');
    listRoot.innerHTML = '';

    const items = getCartItems();
    if (!items.length) {
      listRoot.innerHTML = `<p class="text-center">Корзина пуста</p>`;
      this._recalcSummary();
      return;
    }

    const recalcSummary = () => {
      const all = getCartItems();
      const count = all.reduce((s, x) => s + x.qty, 0);
      const sum   = all.reduce((s, x) => {
        const row = listRoot.querySelector(`.cart-row[data-id="${x.id}"]`);
        const price = Number(row.dataset.price);
        return s + x.qty * price;
      }, 0);

      this.handlers.updateCounter();
      this.parent.querySelector('#summary-count').textContent = count;
      this.parent.querySelector('#summary-sum').textContent   = `${sum} ₽`;
    };

    // загружаем данные параллельно
    await Promise.all(items.map(ci => new Promise(resolve => {
      ajax.get(stockUrls.getStockById(ci.id), (data, status) => {
        if (status === 200 && data) {
          const unitPrice = parseInt(data.discountedPrice.replace(/\D/g,'')) || 0;

          // создаём строку
          const row = document.createElement('div');
          row.className = 'row mb-4 d-flex justify-content-between align-items-center cart-row';
          row.dataset.id    = ci.id;
          row.dataset.price = unitPrice;
          row.innerHTML = `
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img src="${data.src}" class="img-fluid rounded-3" alt="${data.title}">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <h6 class="mb-0">${data.title}</h6>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex align-items-center">
              <button class="btn btn-link px-2 minus-btn"><i class="fas fa-minus"></i></button>
              <input 
                min="1" 
                type="number" 
                value="${ci.qty}" 
                class="form-control form-control-sm mx-2" 
                style="width:60px; text-align:center"
              />
              <button class="btn btn-link px-2 plus-btn"><i class="fas fa-plus"></i></button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h6 class="item-unit-price mb-0">${data.discountedPrice}</h6>
              <h6 class="item-line-total mb-0">${unitPrice * ci.qty} ₽</h6>
            </div>
            <div class="col-md-1 col-lg-1 col-xl-1 text-end">
              <button type="button" class="btn btn-outline-danger btn-sm remove-item">
                <i class="fas fa-times"></i>
              </button>
            </div>
          `;

          // элементы
          const minusBtn    = row.querySelector('.minus-btn');
          const plusBtn     = row.querySelector('.plus-btn');
          const qtyInput    = row.querySelector('input[type=number]');
          const lineTotalEl = row.querySelector('.item-line-total');
          const removeBtn   = row.querySelector('.remove-item');

          // уменьшить
          minusBtn.addEventListener('click', () => {
            const newQty = Math.max(1, ci.qty - 1);
            updateCartItem(ci.id, newQty);
            ci.qty = newQty;
            qtyInput.value = newQty;
            lineTotalEl.textContent = `${unitPrice * newQty} ₽`;
            recalcSummary();
          });

          // увеличить
          plusBtn.addEventListener('click', () => {
            const newQty = ci.qty + 1;
            updateCartItem(ci.id, newQty);
            ci.qty = newQty;
            qtyInput.value = newQty;
            lineTotalEl.textContent = `${unitPrice * newQty} ₽`;
            recalcSummary();
          });

          // ручной ввод
          qtyInput.addEventListener('change', () => {
            let newQty = parseInt(qtyInput.value, 10) || 1;
            if (newQty < 1) newQty = 1;
            updateCartItem(ci.id, newQty);
            ci.qty = newQty;
            qtyInput.value = newQty;
            lineTotalEl.textContent = `${unitPrice * newQty} ₽`;
            recalcSummary();
          });

          // удалить полностью
          removeBtn.addEventListener('click', () => {
            removeCartItem(ci.id);
            recalcSummary();
            listRoot.removeChild(row);
          });

          listRoot.append(row);
        }
        resolve();
      });
    })));

    // финальный пересчёт
    recalcSummary();
  }
}
