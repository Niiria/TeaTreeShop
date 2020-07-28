import generateCartLi from '../utils/generateCartLi';
import fetchData from './fetchData';

const CART_ITEMS = document.querySelector('.cart_items');
const CART_TOTAL = document.querySelector('.cart_total');

class CartService {
  constructor() {
    this.totalValue = 0;
    this.cartDatabase = [];
    this.currentValue = 0;
  }

  generateCart(data) {
    CART_ITEMS.innerHTML = '';
    if (data.length === 0 || !data) {
      const alert = document.createElement('h1');
      alert.innerHTML = 'Brak elementow do wyswietlenia';
      CART_ITEMS.append(alert);
      return;
    }
    data.forEach((li) => {
      CART_ITEMS.append(generateCartLi(li.name, li.price, li.count));
      this.setTotal(data);
    });
    Array.from(CART_ITEMS.children).forEach((cartItem) => {
      cartItem.childNodes[3].addEventListener('keyup', (event) => {
        if (
          (event.target.value.length < 4 &&
            event.which >= 48 &&
            event.which <= 57) ||
          event.which === 8
        ) {
          this.currentValue = event.target.value;
          data[
            Array.from(CART_ITEMS.children).indexOf(cartItem)
          ].count = this.currentValue;

          cartItem.childNodes[5].innerHTML = `${
            data[Array.from(CART_ITEMS.children).indexOf(cartItem)].price *
            this.currentValue
          }$`;
        } else {
          event.target.value = this.currentValue;
        }
      });

      cartItem.childNodes[3].addEventListener('focusin', (event) => {
        this.currentValue = event.target.value;
        event.target.value = '';
      });

      cartItem.childNodes[3].addEventListener('focusout', (event) => {
        if (event.target.value === '' || event.target.value === '0') {
          this.currentValue = 1;
        }
        fetchData.adjustObjectCount(
          Array.from(CART_ITEMS.children).indexOf(cartItem),
          this.currentValue
        );
        this.generateCart(fetchData.getLocal());
      });

      cartItem.childNodes[6].addEventListener('click', () => {
        fetchData.removeObject(
          Array.from(CART_ITEMS.children).indexOf(cartItem)
        );
        this.generateCart(fetchData.getLocal());
      });
    });
  }

  setTotal(data) {
    this.totalValue = 0;
    data.forEach((element) => {
      this.totalValue += element.price * element.count;
    });
    CART_TOTAL.innerHTML = `Total: ${this.totalValue} $`;
  }
}

const cartService = new CartService();
export default cartService;
