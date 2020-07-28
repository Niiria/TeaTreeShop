import './styles/main.scss';
import itemCounter from './utils/itemCounter';
import scene from './services/sceneChange';
import swapTheme from './utils/swapTheme';
import fetchData from './services/fetchData';
import viewService from './services/viewService';

const NAV_PAGES = document.querySelector('.nav_pages');
const NAV_CART = document.querySelector('.nav_cart');
const LOGO_THEME = document.querySelector('.nav_logo');
const VIEW_PAGE_BTN = document.querySelector('.view_main-pageBtn');
const VIEW_NAV_CATEGORIES = document.querySelector('.view_nav-categories');
const VIEW_SEARCH = document.querySelector('.view_search');
const VIEW_COUNT = document.querySelectorAll('.view_count');

scene.change('landing');

if (localStorage.getItem('itemCount') === null) {
  localStorage.setItem('itemCount', 0);
}

itemCounter(0);
fetchData.init();

Array.from(NAV_PAGES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    scene.change(element.target.id);
  });
});

NAV_CART.addEventListener('click', () => {
  scene.change('cart');
});

LOGO_THEME.addEventListener('click', async () => {
  swapTheme();
});

Array.from(VIEW_PAGE_BTN.children).forEach((button) => {
  button.addEventListener('click', (element) => {
    if (element.target.id === 'view_main-pageBtn-right') {
      if (viewService.page < viewService.totalPages - 1) {
        viewService.page += 1;
        viewService.setView(viewService.condition);
      }
    }
    if (element.target.id === 'view_main-pageBtn-left') {
      if (viewService.page !== 0) {
        viewService.page -= 1;
        viewService.setView(viewService.condition);
      }
    }
  });
});

Array.from(VIEW_NAV_CATEGORIES.children).forEach((category) => {
  category.addEventListener('click', (element) => {
    viewService.condition = element.target.id;
    viewService.page = 0;
    viewService.setView(viewService.condition);

    VIEW_SEARCH.value = '';
  });
});

VIEW_SEARCH.addEventListener('input', () => {
  viewService.page = 0;
  viewService.setView(viewService.condition, VIEW_SEARCH.value);
});

Array.from(VIEW_COUNT).forEach((div, index) => {
  Array.from(div.children).forEach((element) => {
    switch (element.id) {
      case 'view_countBtn-down':
        element.addEventListener('click', () => {
          let value = parseInt(div.children[1].innerHTML, 10);
          if (value === 1) return;

          value -= 1;
          div.children[1].innerHTML = value;
        });
        break;
      case 'view_countBtn-up':
        element.addEventListener('click', () => {
          let value = parseInt(div.children[1].innerHTML, 10);
          value += 1;
          div.children[1].innerHTML = value;
        });
        break;
      case 'view_buy':
        element.addEventListener('click', () => {
          itemCounter(parseInt(div.children[1].innerHTML, 10));

          const object = {
            name: viewService.array[index + 7 * viewService.page].name,
            price: viewService.array[index + 7 * viewService.page].price,
            count: parseInt(div.children[1].innerHTML, 10),
          };
          div.children[1].innerHTML = 1;
          fetchData.pushObject(object);
        });
        break;
      default:
        break;
    }
  });
});
