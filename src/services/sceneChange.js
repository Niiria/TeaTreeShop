import navActive from '../utils/navActive';

const LANDING = document.querySelector('.landing');
const TEAS = document.querySelector('.teas');
const CART = document.querySelector('.cart');

export default class SceneChange {
  constructor() {
    this.landing();
  }

  change(name) {
    navActive(name);
    if (name === 'landing') this.landing();
    if (name === 'teas') this.teas();
    if (name === 'cart') this.cart();
    if (name === 'leafs') this.teas();
  }

  landing() {
    this.name = 'landing';
    CART.classList.remove('displayGrid');
    CART.classList.add('displayNone');
    TEAS.classList.remove('displayGrid');
    TEAS.classList.add('displayNone');
    LANDING.classList.remove('displayNone');
    LANDING.classList.add('displayBlock');
  }

  teas() {
    this.name = 'teas';
    CART.classList.remove('displayGrid');
    CART.classList.add('displayNone');
    LANDING.classList.remove('displayBlock');
    LANDING.classList.add('displayNone');
    TEAS.classList.remove('displayNone');
    TEAS.classList.add('displayGrid');
  }

  cart() {
    this.name = 'cart';
    LANDING.classList.remove('displayBlock');
    LANDING.classList.add('displayNone');
    TEAS.classList.remove('displayGrid');
    TEAS.classList.add('displayNone');
    CART.classList.remove('displayNone');
    CART.classList.add('displayGrid');
  }
}
