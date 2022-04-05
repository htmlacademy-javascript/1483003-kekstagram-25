import { makeUserPosts } from './generating-posts.js';
import { renderUsersPosts } from './rendering-random-user-photos.js';
import './changing-image-scale.js';
import './upload-image.js';
import './form-validation.js';
import './image-slider-effects.js';

const userPosts = makeUserPosts();
renderUsersPosts(userPosts);

console.log(userPosts);


const sentence = document.querySelector('.social__text');
const text = sentence.textContent;


const arrText = text.split(' ');
const mapMethod = arrText.map((word) => word.toLowerCase());

mapMethod.forEach((word) => `#${word}`);

const sliceMethod = mapMethod.slice(0, 3);

mapMethod.every(
  (word, index) => word === word[index + 1]
);

// mapMethod.every(word, index => word === word[index + 1]);

/* function hasDublicate(word, index) {
    if (word === word[index + 1]) {
        console.log();
    }
} */


// const copyArr = arrText.splice(0, 3);

console.log(mapMethod);
console.log(arrText);
console.log(sliceMethod);


/* const pageBody = document.body;
const uploadFileInputElement = document.querySelector('#upload-file');
const uploadPopupContainer = document.querySelector('.img-upload__overlay');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

uploadFileInputElement.addEventListener('change', function () {
  const file = this.files[0];
  if (!file.type.startsWith('image/')) {
    openUploadMessagePopup('error');
    return;
  }
  uploadPopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  console.log(file.type);

  const fileReader = new FileReader();
  fileReader.onload = function (evt) {
    imgUploadPreview.src = evt.target.result;
  };
  fileReader.readAsDataURL(file);

}); */


