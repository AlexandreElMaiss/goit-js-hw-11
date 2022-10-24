import axios from 'axios';
const API_KEY = '30550641-0f108504ecdb994905cf7394f';

export default class PixabayAPI {
  constructor() {
    this.serchQuery = '';
    this.page = 1;
  }

  async getFotos() {
    return await axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${this.serchQuery}&image_type=photo&orientation=horizontal$safesearch=true&page=${this.page}&per_page=40`
      )
      .then(({ data }) => {
        this.incrementPage();
        return data;
      });
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  getPage() {
    return this.page;
  }

  get query() {
    return this.serchQuery;
  }
  set query(newQuery) {
    this.serchQuery = newQuery;
  }
}
