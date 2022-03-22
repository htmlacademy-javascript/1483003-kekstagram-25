import { isEscapeKey } from './util.js';
import { renderUsersPosts } from './rendering-random-user-photos.js';
import { makeUserPosts } from './generating-posts.js';

const userPosts = makeUserPosts();
console.log(userPosts);

const pageBody = document.querySelector('body');
/**
 * Секция для вставки отрисованных фотографий случайных пользователей
 */
const galleryRandomUsersPhotos = document.querySelector('.pictures');
/**
 * Кнопка для выхода из полноэкранного просмотра изображения
 */
const buttonCancel = document.querySelector('#picture-cancel');
/**
 * Секция полноэкранного показа изображения
 */
const bigPictureSection = document.querySelector('.big-picture');
/**
 * Полноэкранное изображение
 */
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img');
/**
 * Количество лайков
 */
const likesCount = bigPictureSection.querySelector('.likes-count');
/**
 * Количество комментариев
 */
const commentsCount = bigPictureSection.querySelector('.comments-count');
/**
 * Список комментариев к изображению
 */
const socialComments = bigPictureSection.querySelector('.social__comments');
/**
 * Описание фотографии
 */
const socialCaption = bigPictureSection.querySelector('.social__caption');
/**
 * Количество комментариев у фотографии
 */
const socialCommentCount = bigPictureSection.querySelector('.social__comment-count');
/**
 * Кнопка для загрузки новой порции комментариев
 */
const commentsLoader = bigPictureSection.querySelector('.comments-loader');

galleryRandomUsersPhotos.addEventListener('click', (evt) => onContainerClick(evt));

function onContainerClick (evt) {
  if (evt.target.nodeName === 'IMG') {
    showPhotoPopup (evt.target.dataset.photoId);
  }
}

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoPopup();
  }
};

function fillPreview(photoData) {
  bigPictureImg.src = photoData.url;
  likesCount.textContent = photoData.likes;
  commentsCount.textContent = photoData.comments.length;
};

function showPhotoPopup(photoId) {
  bigPictureSection.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  fillPreview(userPosts[photoId]);

  document.addEventListener('keydown', onBigPhotoEscKeydown);
}

function hidePhotoPopup() {
  bigPictureSection.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPhotoEscKeydown);
}

buttonCancel.addEventListener('click', hidePhotoPopup);

/* galleryRandomUsersPhotos.addEventListener('click', showBigPhoto);

/* galleryRandomUsersPhotos.addEventListener('click', (evt) => {
  showBigPhoto();
  const currentPhoto = evt.target.dataset;
  const bigPhoto = userPosts.find((userPost) => userPost.id === 6);
  console.log(bigPhoto);
  bigPictureImg.src = evt.target.src;

  console.log(currentPhoto);
}); */

/* console.log(allUsersPosts); */

export { showPhotoPopup };
