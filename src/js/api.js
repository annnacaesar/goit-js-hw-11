import axios from "axios";
import { Notify } from "notiflix";

export default class ApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
		this.per_page = 40;
	}

	async fetchImage() {
	const URL = `https://pixabay.com/api/?key=27616591-ea38afb15630e129e17ab0ac4&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

	const response = await axios.get(URL);
	this.totalHits(this.page, response.data.totalHits);
	this.incrementPage();
	
	return response.data.hits;
	}
	
	incrementPage() {
    this.page += 1;
  }

  reset() {
    this.page = 1;
  }

	totalHits(page, hits) {
		if(page === 1 && hits !== 0){
			Notify.info(`Hooray! We found ${hits} images.`)
		};
	}
}
