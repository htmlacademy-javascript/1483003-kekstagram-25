import { isEscapeKey } from './util.js';

const COMMENTS_LIMIT = 5;
let copyComments = [];

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
const cancelButton = fullSizePopupContainer.querySelector('#picture-cancel');
/**
 * Количество лайков
 * @type {Element | null}
 */
const likesCount = fullSizePopupContainer.querySelector('.likes-count');
/**
 * Список комментариев к изображению
 * @type {Element | null}
 */
const socialCommentsContainer = fullSizePopupContainer.querySelector('.social__comments');
/**
 * Один комментарий из списка комментариев
 * @type {Element | null}
 */
const postComment = fullSizePopupContainer.querySelector('.social__comment');
/**
 * Описание фотографии
 * @type {Element | null}
 */
const postDescription = fullSizePopupContainer.querySelector('.social__caption');
/**
 * Количество комментариев - всего
 * @type {Element | null}
 */
const commentsCount = fullSizePopupContainer.querySelector('.comments-count');
/**
 * Количество комментариев у фотографии - сколько показано на данный момент
 * @type {Element | null}
 */
const socialCommentsShow = fullSizePopupContainer.querySelector('.comments-show');
/**
 * Кнопка для загрузки новой порции комментариев
 * @type {Element | null}
 */
const commentsLoader = fullSizePopupContainer.querySelector('.comments-loader');

/**
 * @description Функция по отрисовке комментарив пользователей
 * @param {array} postComments
 */
const renderComments = (comments) => {
  if (!comments.length) {
    return;
  }
  const commentFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    const commentItem = postComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentFragment.append(commentItem);
  });

  socialCommentsContainer.append(commentFragment);
};

/**
 * @description Функция показывает кнопку загрузки дополнительных коментариев, если комментариев больше COMMENTS_LIMIT
 * @returns {void}
 */
const showCommentsLoader = () => {
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', loadMoreComments);
};

/**
 * @description Функция скрывает кнопку загрузки доолнительных коментариев, если комментариев меньше COMMENTS_LIMIT
 * @returns {void}
 */
const hideCommentsLoader = () => {
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', loadMoreComments);
};

/**
 * @description Функция скрытия/показа кнопки загрузки дополнительных комментариев и отрисовки комментариев по COMMENTS_LIMIT
 */
function loadMoreComments() {
  showCommentsLoader();

  renderComments(copyComments.splice(0, COMMENTS_LIMIT));
  socialCommentsShow.textContent = document.querySelectorAll('.social__comment').length;

  if (!copyComments.length) {
    hideCommentsLoader();
  }
}

/**
 * @description Функция показа окна с полноразмерным изображением и заполнением поста данными
 * @param {Object} post - обьект массива
 */
const showPhotoPopup = (post) => {
  fullSizePopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  postDescription.textContent = post.description;

  socialCommentsContainer.innerHTML = '';
  copyComments = [...post.comments];
  loadMoreComments();
  document.addEventListener('keydown', onBigPhotoEsc);
};

/**
 * @description Функция закрытия окна с полноразмерным изображением
 * @returns {void}
 */
const hidePhotoPopup = () => {
  fullSizePopupContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPhotoEsc);
};

function onBigPhotoEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoPopup();
  }
}

cancelButton.addEventListener('click', hidePhotoPopup);

export { showPhotoPopup };
