import navActive from '../utils/navActive';
import fetchData from './fetchData';
import viewService from './viewService';
import cartService from './cartService';

const LANDING = document.querySelector('.landing');
const VIEW = document.querySelector('.view');
const CART = document.querySelector('.cart');
const VIEW_GIRL = document.querySelector('.view_girl');
const VIEW_MAIN_CONTAINER = document.querySelector('.view_main-container');

class SceneChange {
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
    CART.classList.remove('displayFlex');
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

    function display() {
      VIEW_MAIN_CONTAINER.classList.remove('visibilityHiddenNoDelay');
      VIEW_MAIN_CONTAINER.classList.add('visibilityVisible');
    }
    VIEW_MAIN_CONTAINER.classList.add('visibilityHiddenNoDelay');
    VIEW_MAIN_CONTAINER.classList.remove('visibilityVisible');
    window.setTimeout(display, 500);

    viewService.page = 0;

    CART.classList.remove('displayFlex');
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
    CART.classList.add('displayFlex');
  }
}

const scene = new SceneChange();
export default scene;
