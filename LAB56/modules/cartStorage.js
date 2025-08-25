const KEY = 'cartItems';

/**
 * @typedef {{ id: number, qty: number }} CartItem
 */

/** Возвращает массив CartItem */
export function getCartItems() {
  return /** @type {CartItem[]} */(
    JSON.parse(localStorage.getItem(KEY) || '[]')
  );
}

/** Сохраняет новый массив в localStorage */
function save(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

/** Добавляет 1 шт товара в корзину (или создаёт запись, если её нет) */
export function addCartItem(id) {
  const items = getCartItems();
  const it = items.find(x => x.id === id);
  if (it) {
    it.qty++;
  } else {
    items.push({ id, qty: 1 });
  }
  save(items);
}

/** Обновляет количество (может стать 0 и тогда мы убираем товар) */
export function updateCartItem(id, qty) {
  let items = getCartItems();
  if (qty <= 0) {
    items = items.filter(x => x.id !== id);
  } else {
    items = items.map(x => x.id === id ? { ...x, qty } : x);
  }
  save(items);
}

/** Удаляет товар целиком из корзины */
export function removeCartItem(id) {
  const items = getCartItems().filter(x => x.id !== id);
  save(items);
}

/** Очищает корзину полностью */
export function clearCart() {
  localStorage.removeItem(KEY);
}
