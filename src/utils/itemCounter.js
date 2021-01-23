const CART_ITEMS = document.querySelector('.nav_cart-count');

const itemCounter = (number) => {
  let item = parseInt(localStorage.getItem('itemCount'), 10);
  item += number;
  localStorage.setItem('itemCount', item);
  CART_ITEMS.textContent = localStorage.getItem('itemCount');
};

export default itemCounter;
