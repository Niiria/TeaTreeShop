import './styles/main.scss';
import itemCounter from './utils/itemCounter';
import scene from './services/sceneChange';
import swapTheme from './utils/swapTheme';
import teas from './services/teasService';

const NAV_PAGES = document.querySelector('.nav_pages');
const NAV_CART = document.querySelector('.nav_cart');
const LOGO_THEME = document.querySelector('.nav_logo');
const TEAS_BUY = document.querySelectorAll('.teas_buy');
const TEAS_PAGE_BTN = document.querySelector('.teas_main-pageBtn');
const TEAS_NAV_CATEGORIES = document.querySelector('.teas_nav-categories');

scene.change('teas');

if (localStorage.getItem('itemCount') === null) {
  localStorage.setItem('itemCount', 0);
}
itemCounter(0);

Array.from(NAV_PAGES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    scene.change(element.target.id);
    if (element.target.id === 'teas' || element.target.id === 'leafs') {
      scene.change('teas');
    }
  });
});

NAV_CART.addEventListener('click', () => {
  scene.change('cart');
});

LOGO_THEME.addEventListener('click', async () => {
  swapTheme();
});

TEAS_BUY.forEach((element) => {
  element.addEventListener('click', () => {
    itemCounter(1);
  });
});

Array.from(TEAS_PAGE_BTN.children).forEach((button) => {
  button.addEventListener('click', (element) => {
    if (element.target.id === 'teas_main-pageBtn-right') {
      if (teas.page < teas.totalPages - 1) {
        teas.page += 1;
        teas.setTeas(teas.condition);
      }
    }
    if (element.target.id === 'teas_main-pageBtn-left') {
      if (teas.page !== 0) {
        teas.page -= 1;
        teas.setTeas(teas.condition);
      }
    }
  });
});

Array.from(TEAS_NAV_CATEGORIES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    teas.condition = element.target.id;
    teas.page = 0;
    teas.setTeas(teas.condition);
  });
});
