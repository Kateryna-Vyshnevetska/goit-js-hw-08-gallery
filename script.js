import {default as gallery} from './gallery-items.js'

const refs = {
  ul : document.querySelector('.js-gallery'),
  modal : document.querySelector('.js-lightbox'),
  largeImg : document.querySelector('.lightbox__image'),
  btnClose : document.querySelector('.lightbox__button'),
}

let currentImgIndex;
let index = -1;
const length = gallery.length;

const drawGallary = function InsertTagsToHTML() {
  const result = gallery.reduce((acc, elem) =>{
    index++
    return (acc += `<li class="gallery__item">
    <a class="gallery__link"
    href="${elem.original}"
    data-index = "${index}"
    >
    <img class="gallery__image" 
    src = "${elem.preview}" 
    data-source="${elem.original}"
    alt = "${elem.description}"
    >
    </img>
    </a>
    </li>`) 
  },'');
  refs.ul.insertAdjacentHTML('beforeend', result);
}

drawGallary();

const check = function CheckClickOnImage (event){
  event.preventDefault();
  if(event.target.nodeName !== 'IMG'){
    return;
  }
  const imgRef = event.target;
  const largeImgRef = imgRef.dataset.source;
  openModal(largeImgRef);
}

const openModal = function openModalWindowWithLargeImg(url){
  refs.modal.classList.add('is-open');
  window.addEventListener('keydown',event => checkKey(event));
  drawImg(url);
  currentImg();
}

const drawImg = function drawLargeImgInModalWindow(url){
  refs.largeImg.src = '';
  refs.largeImg.src = url;
}

const currentImg = function getIndexOfCurrentLinkImg(){
  return currentImgIndex = Number(event.target.parentElement.parentElement.lastElementChild.dataset.index);
}

const checkKey = function checkButtonClick(event){
  switch(event.key){
    case 'ArrowLeft':
    leftKey();
    break;
    case 'ArrowRight':
    rightKey();
    break;
    case 'Escape':
    refs.modal.classList.remove('is-open');
    document.removeEventListener('keyup',event => checkKey(event.key));
    break;
    default:
    console.log('Something wrong');
    break;
  }
}

const leftKey = function ArrowLeftPressOnKeyboard(){
  if(currentImgIndex-1 <= length && currentImgIndex-1 >= 0){
    currentImgIndex -=1;
    const newImg = gallery[currentImgIndex].original;
    drawImg(newImg);
  }else{
    currentImgIndex = 0;
  }
}
const rightKey = function ArrowRightPressOnKeyboard(){
  if(currentImgIndex+1 < length){
    currentImgIndex += 1;
    const newImg = gallery[currentImgIndex].original;
    drawImg(newImg);
  }
  else{
    currentImgIndex === 0;
  }
}

const closeModal = function closeModalWindowByOverlay(event){
  const overlay = event.target.parentNode.querySelector('.lightbox__overlay');
  if(!overlay){
    return;
  }
  refs.modal.classList.remove('is-open');
  document.removeEventListener('keyup',event => checkKey(event.key));
}

refs.ul.addEventListener('click',check);
refs.modal.addEventListener('click',closeModal);

