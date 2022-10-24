import { refs } from './js/refs';
import PixabayAPI from './js/pixabayAPI';
import { showLoadMoreBtn, hideLoadMoreBtn } from './js/load-mor-btn.js';
import { createMarkup } from './js/createMarkup';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';


const pixabay = new PixabayAPI();
hideLoadMoreBtn();
let totalHits;

function searchPhoto(evt) {
  evt.preventDefault();
  refs.list.innerHTML = '';
  if (evt.currentTarget.elements.searchQuery.value === '') {
    return;
  }
  pixabay.query = evt.currentTarget.elements.searchQuery.value;

  pixabay.resetPage();
  pixabay.getFotos().then(data => {
    totalHits = data.totalHits;
    Loading.standard({
      svgSize: '150px',
    });
    if (data.hits.length === 0) {
      Notify.failure(
        'Вибачте, немає зображень, які відповідають вашому пошуковому запиту. Будь ласка спробуйте ще раз.'
      );
      hideLoadMoreBtn();
      return;
    } else {
      Notify.success(`Ура! По вашому запиту ${totalHits} зображень!`);
      createMarkup(data.hits);
      if (refs.list.childElementCount < 40) {
        hideLoadMoreBtn();
      } else {
        showLoadMoreBtn();
      }
    }

    Loading.remove();
  });
}

function onLoadMore(evt) {
  evt.preventDefault();
  const pageAmount = totalHits / 27 - pixabay.getPage();
  console.log('click', pageAmount);
  if (pageAmount > 0) {
    pixabay.getFotos().then(data => {
      createMarkup(data.hits);
      smoothScroll();
    });
    Loading.standard({
      svgSize: '150px',
    });
  }
  if (pageAmount < 0.5) {
    Notify.info('Ви досягли кінця результатів пошуку.');
    hideLoadMoreBtn();
  }
  Loading.remove();
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.js-gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2.7,
    behavior: 'smooth',
  });
}

refs.form.addEventListener('submit', searchPhoto);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
