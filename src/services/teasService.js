const TEAS_NAME = document.querySelectorAll('.teas_name');
const TEAS_PRICE = document.querySelectorAll('.teas_price');
const TEAS_MAIN = document.querySelector('.teas_main');
const TEAS_PAGE_COUNT = document.querySelector('.teas_main-pageCount');

class TeasService {
  constructor() {
    this.data = [];
    this.page = 0;
    this.totalPages = 0;
    this.index = 0;
    this.array = [];
  }

  setData(data) {
    this.data = data;
  }

  display(array) {
    this.array = array;
    let itemsView = array.length - 7 * this.page;

    let arrayIndex = 0 + 7 * this.page;
    let pageIndex = 0;

    for (
      arrayIndex, pageIndex;
      arrayIndex < 7 + 7 * this.page;
      pageIndex += 1, arrayIndex += 1
    ) {
      if (itemsView > 0) {
        TEAS_MAIN.children[pageIndex].classList.remove('visibilityHidden');
        TEAS_NAME[pageIndex].innerHTML = array[arrayIndex].name;
        TEAS_PRICE[pageIndex].innerHTML = `${array[arrayIndex].price} $`;
        itemsView -= 1;
      } else {
        TEAS_MAIN.children[pageIndex].classList.add('visibilityHidden');
      }
    }
  }

  async setTeas(condition) {
    this.pageArray = [];
    this.index = 0;
    this.condition = condition;
    if (condition === 'All') {
      this.totalPages = Math.ceil(this.data.length / 7);
      TEAS_PAGE_COUNT.innerHTML = `Page ${this.page + 1} / ${this.totalPages}`;
      this.display(this.data);
    } else {
      this.data.forEach((element) => {
        if (condition === element.category) {
          this.pageArray[this.index] = element;
          this.index += 1;
        }
      });
      this.totalPages = Math.ceil(this.pageArray.length / 7);
      TEAS_PAGE_COUNT.innerHTML = `Page ${this.page + 1} / ${this.totalPages}`;
      this.display(this.pageArray);
    }
  }
}

const teas = new TeasService(1);

export default teas;
