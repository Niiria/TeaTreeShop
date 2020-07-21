import navActive from '../utils/navActive';
import data from './fetchData';
import teas from './teasService';

const LANDING = document.querySelector('.landing');
const TEAS = document.querySelector('.teas');
const CART = document.querySelector('.cart');

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
      case 'teas':
        this.teas();
        break;
      case 'cart':
        this.cart();
        break;
      case 'leafs':
        this.teas();
        break;
      default:
        break;
    }
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

  async teas() {
    this.name = 'teas';
    await data.getJSON();
    teas.setData(data.JSON);
    teas.setTeas('Black');

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

const scene = new SceneChange();
export default scene;
