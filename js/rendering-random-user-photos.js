import {makeUserPosts} from './generating-posts.js';

const getRandomUsersPhotos = () => {
  const galleryRandomUsersPhotos = document.querySelector('.pictures'); // Секция для вставки отрисованных фотографий случайных пользователей
  const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture'); // Шаблон для заполнения данными фотографии случайного пользователя

  const userPosts = makeUserPosts();

  const photosGalleryFragment = document.createDocumentFragment();

  userPosts.forEach((userPost) => {
    const userPhoto = userPhotoTemplate.cloneNode(true);
    userPhoto.querySelector('.picture__img').src = userPost.url;
    userPhoto.querySelector('.picture__comments').textContent = userPost.comments.length;
    userPhoto.querySelector('.picture__likes').textContent = userPost.likes;
    photosGalleryFragment.appendChild(userPhoto);
  });

  galleryRandomUsersPhotos.appendChild(photosGalleryFragment);
};

export {getRandomUsersPhotos};
