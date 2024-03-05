import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const lightbox = new SimpleLightbox('.images-container a', { captionsData: 'alt', });

export function createImagesMarkup(images) {

  const imagesContainer = document.querySelector(".images-container");
  const markup = images.map(({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) =>
    `<div class="image-card">
    <div class="image">
      <a href="${largeImageURL}">
      <img class="gallery-image" src="${webformatURL}" alt="${tags}"/>
      </a>
   </div>
   <ul class="stats">
      <li class="stats-name">Likes<p class="numbers">${likes}</p></li>
      <li class="stats-name">Views<p class="numbers">${views}</p></li>
      <li class="stats-name">Comments<p class="numbers">${comments}</p></li>
      <li class="stats-name">Downloads<p class="numbers">${downloads}</p></li>
    </ul></div>`)
    .join("");
  imagesContainer.insertAdjacentHTML("beforeend", markup);
  lightbox.refresh();
}

   