import { isEscapeKey } from './util.js';

const pageBody = document.body;
/**
 * Секция полноэкранного показа изображения
 * @type {Element | null}
 */
const fullSizePopupContainer = document.querySelector('.big-picture');
/**
 * Полноэкранное изображение
 * @type {Element | null}
 */
const bigPictureImg = fullSizePopupContainer.querySelector('.big-picture__img img');
/**
 * Кнопка для выхода из полноэкранного просмотра изображения
 * @type {Element | null}
 */
const buttonCancel = fullSizePopupContainer.querySelector('#picture-cancel');
/**
 * Количество лайков
 * @type {Element | null}
 */
const likesCount = fullSizePopupContainer.querySelector('.likes-count');
/**
 * Количество комментариев
 * @type {Element | null}
 */
const commentsCount = fullSizePopupContainer.querySelector('.comments-count');
/**
 * Список комментариев к изображению
 * @type {Element | null}
 */
const socialComments = fullSizePopupContainer.querySelector('.social__comments');
/**
 * Один комментарий из списка комментариев
 * @type {Element | null}
 */
const socialOneComment = fullSizePopupContainer.querySelector('.social__comment');
/**
 * Описание фотографии
 * @type {Element | null}
 */
const socialCaption = fullSizePopupContainer.querySelector('.social__caption');
/**
 * Количество комментариев у фотографии
 * @type {Element | null}
 */
/* const socialCommentCount = fullSizePopupContainer.querySelector('.social__comment-count'); */
/**
 * Кнопка для загрузки новой порции комментариев
 * @type {Element | null}
 */
const commentsLoader = fullSizePopupContainer.querySelector('.comments-loader');

const COMMENTS_LIMIT = 5;
/* let commentsCounter = 5; */

const onBigPhotoEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoPopup();
  }
};

/**
 * @description Функция по отрисовке комментарив пользователей
 * @param {array} postComments
 */
function renderComments(postComments) {

  const commentFragment = document.createDocumentFragment();

  postComments.forEach((postComment) => {
    const commentItem = socialOneComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = postComment.avatar;
    commentItem.querySelector('.social__text').textContent = postComment.message;

    commentFragment.append(commentItem);
  });

  socialComments.innerHTML = '';
  socialComments.append(commentFragment);
}

/**
 * @description Функция скрывает кнопку загрузки доолнительных коментариев, если комментариев меньше COMMENTS_LIMIT
 * @returns {void}
 */
function hideCommentsLoader() {
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', () => { });
}

/**
 * @description Функция показывает кнопку загрузки доолнительных коментариев, если комментариев больше COMMENTS_LIMIT
 * @returns {void}
 */
function showCommentsLoader() {
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', () => {
  });
}

/**
 * @description Функция показа окна с полноразмерным изображением и заполнением поста данными
 * @param {Object} post - обьект массива
 */
function showPhotoPopup(post) {
  fullSizePopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  if (post.comments.length <= COMMENTS_LIMIT) {
    hideCommentsLoader();
  } else {
    showCommentsLoader();
  }

  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  renderComments(post.comments);

  document.addEventListener('keydown', onBigPhotoEsc);
}

/**
 * @description Функция закрытия окна с полноразмерным изображением
 * @returns {void}
 */
function hidePhotoPopup() {
  fullSizePopupContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPhotoEsc);

}

buttonCancel.addEventListener('click', hidePhotoPopup);

export { showPhotoPopup };
