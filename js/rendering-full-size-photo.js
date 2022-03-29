import { isEscapeKey } from './util.js';
// import { makeUserPosts } from './generating-posts.js';

const pageBody = document.body;
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
 * Один комментарий из списка комментариев
 */
const socialOneComment = bigPictureSection.querySelector('.social__comment');
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

const COMMENTS_LIMIT = 5;

/* function onContainerClick (evt) {
  if (evt.target.nodeName === 'IMG') {
    ......;
  }
} */

const onBigPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoPopup();
  }
};

function createComment(userComments) {
  const commentFragment = document.createDocumentFragment();

  userComments.comments.forEach((userComment) => {
    const commentItem = socialOneComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = userComment.avatar;
    commentItem.querySelector('.social__text').textContent = userComment.message;
    commentFragment.append(commentItem);
  });

  socialComments.innerHTML = '';
  socialComments.append(commentFragment);
}

function showPhotoPopup(post) {
  bigPictureSection.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  socialCommentCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');

  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  createComment(post);

  document.addEventListener('keydown', onBigPhotoEscKeydown);
}

function hidePhotoPopup() {
  bigPictureSection.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPhotoEscKeydown);
}

buttonCancel.addEventListener('click', hidePhotoPopup);

// commentsLoader.addEventListener('click', createComment(post));

/* console.log(allUsersPosts); */

export { showPhotoPopup };
