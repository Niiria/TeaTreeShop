import navActive from '../utils/navActive';
import fetchData from './fetchData';
import viewService from './viewService';
import cartService from './cartService';

const LANDING = document.querySelector('.landing');
const VIEW = document.querySelector('.view');
const CART = document.querySelector('.cart');
const VIEW_GIRL = document.querySelector('.view_girl');

class SceneChange {
  constructor() {
    this.landing();
  }

  change(name) {
    navActive(name);

    switch (name) {
      case 'landing':
        this.landing();
        break;
      case 'cart':
        this.cart();
        break;
      default:
        this.view(name);
        break;
    }
  }

  landing() {
    this.name = 'landing';
    CART.classList.remove('displayGrid');
    CART.classList.add('displayNone');
    VIEW.classList.remove('displayGrid');
    VIEW.classList.add('displayNone');
    LANDING.classList.remove('displayNone');
    LANDING.classList.add('displayBlock');
  }

  async view(name) {
    this.name = name;
    VIEW_GIRL.src = `./src/assets/img/view/${name}_girl.png`;

    await fetchData.getJSON(`${name}.json`);
    viewService.setData(fetchData.JSON);
    viewService.setView('All');

    CART.classList.remove('displayGrid');
    CART.classList.add('displayNone');
    LANDING.classList.remove('displayBlock');
    LANDING.classList.add('displayNone');
    VIEW.classList.remove('displayNone');
    VIEW.classList.add('displayGrid');
  }

  async cart() {
    this.name = 'cart';
    cartService.generateCart(await fetchData.getLocal());

    LANDING.classList.remove('displayBlock');
    LANDING.classList.add('displayNone');
    VIEW.classList.remove('displayGrid');
    VIEW.classList.add('displayNone');
    CART.classList.remove('displayNone');
    CART.classList.add('displayGrid');
  }
}

const scene = new SceneChange();
export default scene;
