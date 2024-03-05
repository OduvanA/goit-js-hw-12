import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";



import { createImagesMarkup } from "./js/render-functions";
import { getImages } from "./js/pixabay-api.js";

import error from './img/error.png'


const form = document.querySelector('.form');
const imageContainer = document.querySelector('.images-container');
const loader = document.querySelector('span');

form.addEventListener("submit", submitHandler);

function submitHandler(event) {
  event.preventDefault();
  
  imageContainer.innerHTML = null;

  const inputValue = form.input.value.trim();
  loader.classList.add('loader');
  if (!inputValue) {
    iziToast.error({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      iconUrl: error,
      fontSize: 'large',
      position: 'topRight',
      messageColor: 'white',
      titleColor: 'white',
      theme: 'dark',
      timeout: 5000,
      backgroundColor: '#EF4040',
      progressBar: false,
    });
    loader.classList.remove('loader');
    return;
  }
  
  getImages(inputValue)
    .then(({ hits }) => {
      if (!hits.length) {
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          iconUrl: error,
          fontSize: 'large',
          position: 'topRight',
          messageColor: 'white',
          titleColor: 'white',
          theme: 'dark',
          timeout: 5000,
          backgroundColor: '#EF4040',
          progressBar: false,
        });
      }
      createImagesMarkup(hits);
      loader.classList.remove('loader');
    }); 
}
