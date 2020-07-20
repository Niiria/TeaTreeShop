import './styles/main.scss';
import itemCounter from './utils/itemCounter';
import SceneChange from './services/sceneChange';
import swapTheme from './utils/swapTheme';

const NAV_PAGES = document.querySelector('.nav_pages');
const NAV_CART = document.querySelector('.nav_cart');
const LOGO_THEME = document.querySelector('.nav_logo');

const scene = new SceneChange();

scene.change('landing');

itemCounter(0);

Array.from(NAV_PAGES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    scene.change(element.target.id);
  });
});

NAV_CART.addEventListener('click', () => {
  scene.change('cart');
});

LOGO_THEME.addEventListener('click', () => {
  swapTheme();
});
