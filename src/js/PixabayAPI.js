import axios from 'axios';

export default class PixabayAPI {
  BASE_URL = 'https://pixabay.com/api/';
  baseOpts = {
    key: '34579319-e65916c8fd3357218f04822ae',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 40,
  };
  totalHits = 0;
  receivedHits = 0;
  constructor(query) {
    this.options = {
      ...this.baseOpts,
      q: query,
    };
  }

  async get() {
    try {
      const response = await axios.get(this.BASE_URL, { params: this.options });
      this.options.page += 1;
      this.totalHits = response.data.totalHits;
      this.receivedHits += response.data.hits.length;
      return response.data;
    } catch {
      throw new Error('data retrieval error');
    }
  }

  isDone() {
    return this.receivedHits >= this.totalHits;
  }
}