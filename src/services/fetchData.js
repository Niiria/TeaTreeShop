import Axios from 'axios';

class FetchData {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async getJSON() {
    try {
      await Axios.get(this.baseUrl).then(async (e) => {
        this.JSON = e.data;
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}

const data = new FetchData('src/helpers/teasDatabase.json');
export default data;
