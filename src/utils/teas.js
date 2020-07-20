import { itemCounter, roundUp } from '../js/functions.js';
import { teas, teasData } from '../js/functions.js';

// Catching required DOM
const TEAS_VIEW_UL = document.querySelector('.main_teas-menuRight-ul');
const BUTTONS = document.querySelectorAll('.teas_buyBtn');

const TEAS_DATABASE_NAME = document.querySelectorAll('.teas_database-name');
const TEAS_DATABASE_PRICE = document.querySelectorAll('.teas_database-price');

const TEAS_MENU_CATEGORY = document.querySelectorAll(
  '.main_teas-menuLeft-category'
);
const TEAS_MENU_SEARCH = document.querySelector('#main_teas-menuLeftSearch');

const TEAS_PAGE_BTN = document.querySelectorAll(
  '.main_teas-menuRight-searchBtn'
);
const TEAS_PAGE_TITLE = document.querySelector(
  '.main_teas-menuRight-searchPage'
);

let page = 1;
let pageTotal = 0;

// function that set values of 7 itemDysplay
function setValues(itemDisplay, database, item, condition, mode) {
  if (mode === 1) {
    if (condition == undefined) {
      TEAS_DATABASE_NAME[itemDisplay].textContent = database[item].name;
      TEAS_DATABASE_PRICE[itemDisplay].textContent = database[item].price;
      TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'visible';
      return true;
    } else if (database[item].name.toLowerCase().includes(condition)) {
      TEAS_DATABASE_NAME[itemDisplay].textContent = database[item].name;
      TEAS_DATABASE_PRICE[itemDisplay].textContent = database[item].price;
      TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'visible';
      return true;
    } else {
      TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'hidden';
      return false;
    }
  } else {
    if (condition == undefined) {
      TEAS_DATABASE_NAME[itemDisplay].textContent = database[item].name;
      TEAS_DATABASE_PRICE[itemDisplay].textContent = database[item].price;
      TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'visible';
      return true;
    } else if (database[item].category.includes(condition)) {
      TEAS_DATABASE_NAME[itemDisplay].textContent = database[item].name;
      TEAS_DATABASE_PRICE[itemDisplay].textContent = database[item].price;
      TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'visible';
      return true;
    } else {
      TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'hidden';
      return false;
    }
  }
}

// Gets the all index that meets the requirement of condition and sets the pages
function getLast(database, condition, mode) {
  let count = 0;
  for (let i = 0; i < database.length; i++) {
    if (mode === 1) {
      if (condition == undefined) {
        count++;
      } else if (database[i].name.toLowerCase().includes(condition)) {
        count++;
      }
    } else {
      if (condition == undefined) {
        count++;
      } else if (database[i].category.includes(condition)) {
        count++;
      }
    }
  }
  return count;
}

// Uses to control the view of the center of webpage
function displayView(database, page, condition, mode) {
  let item = 7 * page - 7;
  let itemDisplay;

  for (itemDisplay = 0; itemDisplay < 7; item++) {
    if (item > database.length) {
      break;
    }
    // Handling the items accessibility with condition
    const promise = new Promise((resolve, reject) => {
      if (setValues(itemDisplay, database, item, condition, mode)) {
        resolve('success');
        itemDisplay++;
      } else {
        reject('failure');
      }
    });

    promise
      .then(() => {})
      .catch(() => {
        // console.log(error);
      });
  }

  // Makes the left blocks visiblit to hidden - site has 7 so it must be done when static display
  for (; itemDisplay < 7; itemDisplay++) {
    TEAS_VIEW_UL.children[itemDisplay].style.visibility = 'hidden';
  }
  // This gets the last of the items from whole database to specify the number of total pages
  pageTotal = getLast(database, condition, mode) / 7;
  TEAS_PAGE_TITLE.textContent = 'Page ' + page + ' / ' + roundUp(pageTotal, 0);
}

// Declaration the instance of objects
let teasShoppingCard = new teasData(); // Items that are currentyly on card
const teasDatabase = new teasData(); // Items that are get from database

// Gets the card from local storage if isnt empty
if (itemCounter() > 1) {
  teasShoppingCard = JSON.parse(localStorage.getItem('teasShoppingCard'));
}

// Fetches the database from local .json
fetch('../src/js/teasDatabase.json')
  .then((e) => {
    return e.json();
  })
  .then((e) => {
    e.forEach((element, index) => {
      teasDatabase.database[index] = e[index];
    });
    displayView(teasDatabase.database, page);
  });

// Buy buttons at each of cards
BUTTONS.forEach((button) => {
  button.addEventListener('click', () => {
    // Gets the category from base based on name
    function category() {
      for (let i = 0; i < teasDatabase.database.length; i++) {
        if (
          button.previousElementSibling.childNodes[1].textContent ==
          teasDatabase.database[i].name
        ) {
          return teasDatabase.database[i].category;
        }
      }
    }

    // Creates object that is added to the card database
    const tea = new teas(
      button.previousElementSibling.childNodes[1].textContent,
      button.previousElementSibling.childNodes[3].textContent,
      category()
    );

    // Controls the amount of objects that are added to the base if the same amout is increase
    let control = 0;
    for (let i = 0; i < teasShoppingCard.database.length; i++) {
      if (teasShoppingCard.database[i].name == tea.name) {
        teasShoppingCard.database[i].amount++;
        control = 1;
        break;
      }
    }
    if (control == 0) {
      teasShoppingCard.database.push(tea);
    }

    localStorage.setItem('teasShoppingCard', JSON.stringify(teasShoppingCard));
    let itemCount = localStorage.getItem('itemCount');
    itemCount++;
    localStorage.setItem('itemCount', itemCount);
    itemCounter();
  });
});

// Choose the category from left bar
let condition;
TEAS_MENU_CATEGORY.forEach((button) => {
  button.addEventListener('click', (category) => {
    page = 1;
    condition = category.target.textContent.trim();
    if (condition == 'All') condition = undefined;

    displayView(teasDatabase.database, page, condition);
  });
});

// Search bar
TEAS_MENU_SEARCH.addEventListener('input', () => {
  page = 1;
  displayView(
    teasDatabase.database,
    page,
    TEAS_MENU_SEARCH.value.toLowerCase(),
    1
  );
});
// Page change
TEAS_PAGE_BTN.forEach((button) => {
  button.addEventListener('click', (e) => {
    if (e.target.id === 'main_teas-menuRight-searchPageBtnL') {
      page--;
      if (page < 1) page++;
      page.toFixed();

      displayView(teasDatabase.database, page, condition);
    }

    if (e.target.id === 'main_teas-menuRight-searchPageBtnR') {
      page++;
      if (page > roundUp(pageTotal, 0)) page--;
      page.toFixed();

      displayView(teasDatabase.database, page, condition);
    }
  });
});
