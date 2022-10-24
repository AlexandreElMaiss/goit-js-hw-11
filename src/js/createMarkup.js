import { refs } from './refs';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
let lightbox = new SimpleLightbox('.gallery a', {
  showCounter: true,
  enableKeyboard: true,
  docClose: true,
  scrollZoom: true,
  animationSlide: true,
  maxZoom: 1.5,
});
export function createMarkup(hits) {
  const markup = hits
    .map(
      ({
        largeImageURL,
        webformatURL,
        tags,
        views,
        downloads,
        comments,
        likes,
      }) => {
        return `
        <div class="photo-card ">
          <a  href="${largeImageURL}" >
            <img class="photo-card__img" src="${webformatURL}" alt="${tags}"loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item">
              <b class="info-item__title">Likes</b>
              <span class="info-item__valeu">${likes}</span>
            </p>
            <p class="info-item">
              <b class="info-item__title">Views</b>
              <span class="info-item__valeu">${views}</span>
            </p>
            <p class="info-item">
              <b class="info-item__title">Comments</b>
              <span class="info-item__valeu">${comments}</span>
            </p>
            <p class="info-item">
              <b class="info-item__title">Downloads</b>
              <span class="info-item__valeu">${downloads}</span>
            </p>
          </div>
        </div>
        `;
      }
    )
    .join('');
  refs.list.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
  // simpleLightbox();
}

