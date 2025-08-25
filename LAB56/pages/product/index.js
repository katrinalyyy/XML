import { ajax } from '../../modules/ajax.js';
import { stockUrls } from '../../modules/stockUrls.js';
import { ProductComponent } from '../../components/product/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';

export class ProductPage {
  /**
  * @param {HTMLElement} parent — куда рендерить страницу
  * @param {number} id — id карточки
  * @param {{goBack:()=>void, addToCart:(id:number)=>void}} handlers
  */
  constructor(parent, id, handlers) {
    this.parent = parent;
    this.id = id;
    this.handlers = handlers;
  }

  // 1) Собираем «шапку» страницы (можно туда же вставить контейнер)
  getHTML() {
    return `
      <div id="product-page">
        <div id="back-button-container"></div>
        <div id="product-container"></div>
      </div>
    `;
  }

  render() {
    // 1) вставляем шаблон
    this.parent.innerHTML = this.getHTML();

    // Дебаг: что у нас в this.parent?
    console.log('ProductPage.render: this.parent=', this.parent);


    // 2) кнопка «Назад»
    const backRoot = this.parent.querySelector('#back-button-container');
    // Дебаг: пробуем найти контейнер
    console.log('backRoot=', backRoot);
    const back = new BackButtonComponent(backRoot);
    back.render(this.handlers.goBack);

    // 3) подгружаем данные по API
    ajax.get(stockUrls.getStockById(this.id), (data, status) => {
      if (status === 200 && data) {
        this.renderData(data);
      } else {
        this.parent
          .querySelector('#product-container')
          .innerHTML = `<p style="color:red">Ошибка ${status}</p>`;
      }
    });
  }

  renderData(item) {
    // 4) отрисовываем компонент детали
    const container = this.parent.querySelector('#product-container');
    const comp = new ProductComponent(container);
    comp.render(item, id => this.handlers.addToCart(id));
  }
}
