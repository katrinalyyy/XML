export class BackButtonComponent {
  constructor(parent) {
    this.parent = parent;
  }

  getHTML() {
    // Вот тут ТОЛЬКО шаблонная строка без перевода строки
    return `<button id="back-button" class="btn-theme">Назад</button>`;
  }

  render(onClick) {
    // теперь this.parent.innerHTML получит нужный HTML
    this.parent.innerHTML = this.getHTML();

    const btn = this.parent.querySelector('#back-button');
    btn.addEventListener('click', onClick);
  }
}
