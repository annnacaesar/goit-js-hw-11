import axios from "axios";
import { Notify } from "notiflix";

export default class ApiService {
	constructor() {
		this.searchQuery = '';
		this.page = 1;
		this.per_page = 40;
		this.totalHits = null;
	}

	async fetchImage() {
	const URL = `https://pixabay.com/api/?key=27616591-ea38afb15630e129e17ab0ac4&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.per_page}&page=${this.page}`;

		// return fetch(URL).then(response => {
		// 	if (!response.ok) {
		// 		throw new Error('Error fetching data');
		// 	}
		// 	return response.json();
		// }).then(({hits, totalHits}) => {
		// 	this.incrementPage();
		// 	this.totalHits = totalHits;
		// 	return hits;
		// })

		const response = await axios.get(URL);
		if(this.page === 1 && response.data.totalHits !== 0){
			Notify.info(`Hooray! We found ${response.data.totalHits} images.`)
		};
		this.incrementPage();
		
		return response.data.hits;
	}
	
	incrementPage() {
    this.page += 1;
  }

  reset() {
    this.page = 1;
		this.totalHits = null;
  }
}
