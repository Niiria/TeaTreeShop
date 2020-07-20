const NAV_PAGES = document.querySelector('.nav_pages');

const navActive = (name) => {
  Array.from(NAV_PAGES.children).forEach((element) => {
    if (element.firstElementChild.id === name) {
      element.firstElementChild.classList.add('navActive');
    } else {
      element.firstElementChild.classList.remove('navActive');
    }
  });
};

export default navActive;
