import { showPhotoPopup } from './rendering-full-size-photo.js';

const renderUsersPosts = (userPosts) => {
  /**
 * Секция для вставки отрисованных фотографий случайных пользователей
 */
  const galleryRandomUsersPhotos = document.querySelector('.pictures');
  /**
   *  Шаблон для заполнения данными фотографии случайного пользователя
   */
  const userPhotoTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const photosGalleryFragment = document.createDocumentFragment();

  userPosts.forEach((userPost) => {

    const userPhoto = userPhotoTemplate.cloneNode(true);

    userPhoto.querySelector('.picture__img').src = userPost.url;
    userPhoto.querySelector('.picture__comments').textContent = userPost.comments.length;
    userPhoto.querySelector('.picture__likes').textContent = userPost.likes;

    photosGalleryFragment.append(userPhoto);

    userPhoto.addEventListener('click', () => {
      showPhotoPopup(userPost);
    });
  });

  galleryRandomUsersPhotos.append(photosGalleryFragment);

  return galleryRandomUsersPhotos;
};

export { renderUsersPosts };
