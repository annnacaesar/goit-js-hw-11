import './sass/main.scss';
import "simplelightbox/dist/simple-lightbox.min.css";
import { Notify } from 'notiflix';
import ApiService from './js/api';
import LoadMoreBtn from './js/load-more'
import imageCard from './templates/image-card.hbs'
import SimpleLightbox from 'simplelightbox';


const formRef = document.querySelector('#search-form');
const galleryRef = document.querySelector('.gallery');

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});
const gallery = new SimpleLightbox(".gallery__link", {
	additionalHtml: ' Слава Україні!!!'
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

		if (images.length === 0){
			fail();
		loadMoreBtn.hide()
		}
		
		appendArticlesMarkup(images);
		gallery.refresh();
		loadMoreBtn.enable();
		scroll();

	});
}

function appendArticlesMarkup(images) {
  galleryRef.insertAdjacentHTML('beforeend', imageCard(images));
}

function clearImagesContainer() {
  galleryRef.innerHTML = '';
}

function scroll () {
	const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

	window.scrollBy({
		top: cardHeight * 2,
		behavior: "smooth",
	});
}

function fail () {
	Notify.failure("Sorry, there are no images matching your search query. Please try again.")
}

