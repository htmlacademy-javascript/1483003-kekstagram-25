import { showPhotoPopup } from './rendering-full-size-photo.js';

/**
 * @description Функция по отрисовке постов пользователей на странице
 * @param {array} userPosts - массив данных
 * @returns {void}
 */
const renderUsersPosts = (userPosts) => {
  /**
 * Секция для вставки отрисованных фотографий случайных пользователей
 * @type {Element | null}
 */
  const galleryUsersPhotos = document.querySelector('.pictures');
  /**
   *  Шаблон для заполнения данными фотографии случайного пользователя
   */
  const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosGalleryFragment = document.createDocumentFragment();

  userPosts.forEach((userPost) => {

    const userPhotoElement = userPhotoTemplate.cloneNode(true);

    userPhotoElement.querySelector('.picture__img').src = userPost.url;
    userPhotoElement.querySelector('.picture__comments').textContent = userPost.comments.length;
    userPhotoElement.querySelector('.picture__likes').textContent = userPost.likes;

    photosGalleryFragment.append(userPhotoElement);

    userPhotoElement.addEventListener('click', () => {    
      showPhotoPopup(userPost);
    });
  });

  galleryUsersPhotos.append(photosGalleryFragment); 
};

export { renderUsersPosts };
