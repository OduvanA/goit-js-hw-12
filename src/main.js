import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import { createImagesMarkup } from "./js/render-functions";
import { getImages } from "./js/pixabay-api.js";

import error from './img/error.png'


const form = document.querySelector('.form');
const imageContainer = document.querySelector('.images-container');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

let page;
let inputValue; 


form.addEventListener("submit", submitFormHandler);
loadMoreBtn.addEventListener('click', loadMoreHandler);

async function submitFormHandler(event) {
  event.preventDefault();
  page = 1;
  imageContainer.innerHTML = null;
  inputValue = form.input.value.trim();
  loader.classList.add('is-hidden');
  loadMoreBtn.classList.add('is-hidden');
  
  if (!inputValue) {
    return iziToast.error({
      title: 'Error',
      message:
        'Please enter your search query',
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
  try {
    loader.classList.remove('is-hidden');
    const images = await getImages(inputValue, page);
    if (!images.hits.length) {
      loader.classList.add('is-hidden');
      return iziToast.error({
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
    createImagesMarkup(images.hits);
    loader.classList.add('is-hidden');
    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error.message);
  }
}
  
async function loadMoreHandler() {
  loader.classList.remove('is-hidden');
  loadMoreBtn.classList.add('is-hidden');
  page += 1;

  try {
    const images = await getImages(inputValue, page); 
    const totalPages = Math.ceil(images.totalHits / 15);
    createImagesMarkup(images.hits);
    smoothScroll();
    
    if (page >= totalPages) {
      loader.classList.add('is-hidden');
      loadMoreBtn.classList.add('is-hidden');
    return iziToast.info({
      message: "We're sorry, but you've reached the end of search results.",
    });
    }
    loader.classList.add('is-hidden');
    loadMoreBtn.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
    console.log(error.message);
    loader.classList.add('is-hidden');
  }
}
  
function smoothScroll() {
  const imageHeight = imageContainer.firstElementChild.getBoundingClientRect().height;

  window.scrollBy({
    top: imageHeight * 2,
    behavior: 'smooth',
  });
}