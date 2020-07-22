const VIEW_NAME = document.querySelectorAll('.view_name');
const VIEW_PRICE = document.querySelectorAll('.view_price');
const VIEW_MAIN = document.querySelector('.view_main');
const VIEW_PAGE_COUNT = document.querySelector('.view_main-pageCount');

class ViewService {
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

    Array.from(VIEW_MAIN.children).forEach((li, index) => {
      if (itemsView > 0) {
        li.classList.remove('visibilityHidden');
        li.classList.add('visibilityVisible');
        VIEW_NAME[index].innerHTML = array[arrayIndex].name;
        VIEW_PRICE[index].innerHTML = `${array[arrayIndex].price} $`;
        itemsView -= 1;
      } else {
        li.classList.remove('visibilityVisible');
        li.classList.add('visibilityHidden');
      }
      arrayIndex += 1;
    });
  }

  async setTeas(condition, searchValue) {
    this.pageArray = [];
    this.index = 0;
    this.condition = condition;
    if (condition === 'All' && searchValue === undefined) {
      this.totalPages = Math.ceil(this.data.length / 7);
      VIEW_PAGE_COUNT.innerHTML = `Page ${this.page + 1} / ${this.totalPages}`;
      this.display(this.data);
    } else if (searchValue === undefined) {
      this.data.forEach((element) => {
        if (condition === element.category) {
          this.pageArray[this.index] = element;
          this.index += 1;
        }
      });
      this.totalPages = Math.ceil(this.pageArray.length / 7);
      VIEW_PAGE_COUNT.innerHTML = `Page ${this.page + 1} / ${this.totalPages}`;
      this.display(this.pageArray);
    } else {
      this.data.forEach((element) => {
        if (element.name.toLowerCase().includes(searchValue.toLowerCase())) {
          this.pageArray[this.index] = element;
          this.index += 1;
        }
      });
      this.totalPages = Math.ceil(this.pageArray.length / 7);
      VIEW_PAGE_COUNT.innerHTML = `Page ${this.page + 1} / ${this.totalPages}`;
      this.display(this.pageArray);
    }
  }
}

const viewService = new ViewService(1);

export default viewService;
