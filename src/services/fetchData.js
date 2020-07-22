import Axios from 'axios';

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

  // eslint-disable-next-line class-methods-use-this
  getLocal() {
    console.log(JSON.parse(localStorage.getItem('Database')));
  }

  setLocal(object) {
    if (JSON.parse(localStorage.getItem('Database')) > 0) {
      this.database = JSON.parse(localStorage.getItem('Database'));
    }
    if (this.database.length === 0) this.database.push(object);
    else {
      let control = false;
      this.database.forEach((element, index) => {
        if (element.name === object.name) {
          this.database[index].count += 1;
          control = true;
        }
      });
      if (!control) this.database.push(object);

      localStorage.setItem('Database', JSON.stringify(this.database));
    }
  }
}

const data = new FetchData('src/helpers/');
export default data;
