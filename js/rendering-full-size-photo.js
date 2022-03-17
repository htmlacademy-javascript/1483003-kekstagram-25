import {isEscapeKey} from './util.js';
import {makeUserPosts} from './generating-posts.js';

const pageBody = document.querySelector('body');
const galleryRandomUsersPhotos = document.querySelector('.pictures'); // Секция для вставки отрисованных фотографий случайных пользователей
const buttonCancel = document.querySelector('#picture-cancel'); // Кнопка для выхода из полноэкранного просмотра изображения
const bigPictureSection = document.querySelector('.big-picture'); // Секция полноэкранного показа изображения
const bigPictureImg = bigPictureSection.querySelector('.big-picture__img').querySelector('img'); // Полноэкранное изображение
const likesCount = bigPictureSection.querySelector('.likes-count'); // Количество лайков
const commentsCount = bigPictureSection.querySelector('.comments-count'); // Количество комментариев
const socialComments = bigPictureSection.querySelector('.social__comments'); // Список комментариев к изображению
const socialCaption = bigPictureSection.querySelector('.social__caption'); // Описание фотографии
const socialCommentCount = bigPictureSection.querySelector('.social__comment-count'); // Количество комментариев у фотографии
const commentsLoader = bigPictureSection.querySelector('.comments-loader'); // Кнопка для загрузки новой порции комментариев

const userPosts = makeUserPosts();

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideBigPhoto();
  }
};

function showBigPhoto() {
  bigPictureSection.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  document.addEventListener('keydown', onBigPhotoEscKeydown);
}

function hideBigPhoto() {
  bigPictureSection.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPhotoEscKeydown); // 1 Почему здесь название onBigPhotoEscKeydown
}

buttonCancel.addEventListener('click', hideBigPhoto); // Этот обработчик получается мы не можем удалить

galleryRandomUsersPhotos.addEventListener('click', showBigPhoto); // 1 А здесь название просто showBigPhoto


galleryRandomUsersPhotos.addEventListener('click', (evt) => {
  showBigPhoto();
  bigPictureImg.src = evt.target.src;
  console.log(evt.target);
});

console.log(userPosts);
