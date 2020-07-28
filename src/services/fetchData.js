import Axios from 'axios';
import itemCounter from '../utils/itemCounter';

class FetchData {
  constructor(jsonUrl) {
    this.jsonUrl = jsonUrl;
    this.database = [];
  }

  async getJSON(name) {
    try {
      await Axios.get(this.jsonUrl + name).then(async (e) => {
        this.JSON = e.data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  init() {
    if (localStorage.getItem('Database') === null) {
      localStorage.setItem('Database', JSON.stringify(this.database));
    }
  }

  getLocal() {
    try {
      if (JSON.parse(localStorage.getItem('Database')) === null) {
        return false;
      }
      this.database = JSON.parse(localStorage.getItem('Database'));
      return this.database;
    } catch (error) {
      throw new Error(error);
    }
  }

  clearLocal() {
    this.database = [];
    localStorage.setItem('Database', JSON.stringify(this.database));
  }

  removeObject(index) {
    if (JSON.parse(localStorage.getItem('Database')).length > 0) {
      this.database = JSON.parse(localStorage.getItem('Database'));
    }

    itemCounter(-this.database[index].count);
    this.database.splice(index, 1);

    localStorage.setItem('Database', JSON.stringify(this.database));
  }

  pushObject(object) {
    if (JSON.parse(localStorage.getItem('Database')).length > 0) {
      this.database = JSON.parse(localStorage.getItem('Database'));
    }
    let control = false;
    this.database.forEach((element, index) => {
      if (element.name === object.name) {
        this.database[index].count += object.count;
        control = true;
      }
    });
    if (!control) this.database.push(object);

    localStorage.setItem('Database', JSON.stringify(this.database));
  }

  adjustObjectCount(index, value) {
    if (JSON.parse(localStorage.getItem('Database')).length > 0) {
      this.database = JSON.parse(localStorage.getItem('Database'));
    }

    itemCounter(value - this.database[index].count);
    this.database[index].count = parseInt(value, 10);

    localStorage.setItem('Database', JSON.stringify(this.database));
  }
}

const fetchData = new FetchData('src/helpers/');
export default fetchData;
