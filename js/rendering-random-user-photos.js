import { makeUserPosts } from './generating-posts.js';

const userPosts = makeUserPosts();

/**
 * @description Функция по заполнению шаблона данными одного поста пользователя
 * @param {object} post - обьект массива
 * @returns
 */
const createPost = (post) => {
  /**
 * Шаблон для заполнения данными фотографии случайного пользователя
 */
  const templateUserPhoto = document.querySelector('#picture').content.querySelector('.picture');

  const userPost = templateUserPhoto.cloneNode(true);
  userPost.querySelector('.picture__img').src = post.url;
  userPost.querySelector('.picture__img').dataset.photoId = post.id;
  userPost.querySelector('.picture__comments').textContent = post.comments.length;
  userPost.querySelector('.picture__likes').textContent = post.likes;
  return userPost;
};

/**
 * @description Функция по отрисовке постов пользователей на странице
 * @param {array} posts - массив с данными
 */
const renderUsersPosts = (posts) => {
  /**
 * Секция для вставки отрисованных фотографий случайных пользователей
 */
  const galleryRandomUsersPhotos = document.querySelector('.pictures');
  const photosGalleryFragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const randomUserPosts = photosGalleryFragment.appendChild(createPost(post));
    galleryRandomUsersPhotos.appendChild(randomUserPosts);
  });

  /* for (let i = 0; i <= posts.length; i++) {
    const randomUserPosts = photosGalleryFragment.appendChild(createPost(posts[i]));
    galleryRandomUsersPhotos.appendChild(randomUserPosts);
  } */
};

/* renderUsersPosts(userPosts); */


/* userPosts.forEach((userPost) => {
  const userPhoto = userPhotoTemplate.cloneNode(true);
  userPhoto.addEventListener('click', showPhotoPopup);
  userPhoto.setAttribute('data-url', userPost.url);
  userPhoto.querySelector('.picture__img').src = userPost.url;
  userPhoto.querySelector('.picture__img').dataset.id = userPost.id;
  userPhoto.querySelector('.picture__comments').textContent = userPost.comments.length;
  userPhoto.querySelector('.picture__likes').textContent = userPost.likes;
  photosGalleryFragment.appendChild(userPhoto);
});
*/

renderUsersPosts(userPosts);

export {renderUsersPosts};
