import './styles/main.scss';
import itemCounter from './utils/itemCounter';
import scene from './services/sceneChange';
import swapTheme from './utils/swapTheme';
import data from './services/fetchData';
import viewService from './services/viewService';

const NAV_PAGES = document.querySelector('.nav_pages');
const NAV_CART = document.querySelector('.nav_cart');
const LOGO_THEME = document.querySelector('.nav_logo');
const VIEW_BUY = document.querySelectorAll('.view_buy');
const VIEW_PAGE_BTN = document.querySelector('.view_main-pageBtn');
const VIEW_NAV_CATEGORIES = document.querySelector('.view_nav-categories');
const VIEW_SEARCH = document.querySelector('.view_search');

scene.change('landing');

if (localStorage.getItem('itemCount') === null) {
  localStorage.setItem('itemCount', 0);
}
itemCounter(0);

Array.from(NAV_PAGES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    scene.change(element.target.id);
    if (element.target.id === 'teas' || element.target.id === 'leafs') {
      scene.change(element.target.id);
    }
  });
});

NAV_CART.addEventListener('click', () => {
  scene.change('cart');
});

LOGO_THEME.addEventListener('click', async () => {
  swapTheme();
});

VIEW_BUY.forEach((element) => {
  element.addEventListener('click', () => {
    itemCounter(1);

    const object = {
      name: element.previousElementSibling.children[0].innerHTML,
      price: element.previousElementSibling.children[1].innerHTML.substring(
        0,
        element.previousElementSibling.children[1].innerHTML.length - 2
      ),
      count: 1,
    };

    data.setLocal(object);
  });
});

Array.from(VIEW_PAGE_BTN.children).forEach((button) => {
  button.addEventListener('click', (element) => {
    if (element.target.id === 'view_main-pageBtn-right') {
      if (viewService.page < viewService.totalPages - 1) {
        viewService.page += 1;
        viewService.setTeas(viewService.condition);
      }
    }
    if (element.target.id === 'view_main-pageBtn-left') {
      if (viewService.page !== 0) {
        viewService.page -= 1;
        viewService.setTeas(viewService.condition);
      }
    }
  });
});

Array.from(VIEW_NAV_CATEGORIES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    viewService.condition = element.target.id;
    viewService.page = 0;
    viewService.setTeas(viewService.condition);

    VIEW_SEARCH.value = '';
  });
});

VIEW_SEARCH.addEventListener('input', () => {
  viewService.page = 0;
  viewService.setTeas(viewService.condition, VIEW_SEARCH.value);
});
