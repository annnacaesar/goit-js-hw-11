import './sass/main.scss';
import { Notify } from 'notiflix';
import ApiService from './js/api';
import LoadMoreBtn from './js/load-more'
import imageCard from './templates/image-card.hbs'

const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');



const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

formRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch (event) {
	event.preventDefault();

	apiService.searchQuery = event.currentTarget.elements.searchQuery.value.trim();

	if (apiService.searchQuery === ''){
		return Notify.failure('Please, enter text')
	}

	loadMoreBtn.show();
	apiService.reset();
	clearImagesContainer();
	fetchImages();


}

function fetchImages () {
	loadMoreBtn.disable();
	apiService.fetchImage().then(images => {
		console.log(apiService.page);
	

		if(apiService.page === 2){
			Notify.info(`Hooray! We found ${apiService.totalHits} images.`)
		}

		if(images.length === 0){
			Notify.failure("Sorry, there are no images matching your search query. Please try again.")
		} 

		appendArticlesMarkup(images);
		loadMoreBtn.enable();
	});
}

function appendArticlesMarkup(images) {
  galleryRef.insertAdjacentHTML('beforeend', imageCard(images));
}

function clearImagesContainer() {
  galleryRef.innerHTML = '';
}

