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
 * Количество комментариев - всего
 * @type {Element | null}
 */
const commentsCount = fullSizePopupContainer.querySelector('.comments-count');
/**
 * Количество комментариев у фотографии - сколько показано на данный момент
 *
 */
const socialCommentsShow = fullSizePopupContainer.querySelector('.comments-show');
/**
 * Кнопка для загрузки новой порции комментариев
 * @type {Element | null}
 */
const commentsLoader = fullSizePopupContainer.querySelector('.comments-loader');

const COMMENTS_LIMIT = 5;
let copyComments = [];

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
    const commentItem = socialOneComment.cloneNode(true);

    commentItem.querySelector('.social__picture').src = comment.avatar;
    commentItem.querySelector('.social__text').textContent = comment.message;

    commentFragment.append(commentItem);
  });

  socialComments.append(commentFragment);
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
  if (copyComments.length <= COMMENTS_LIMIT) {
    hideCommentsLoader();
  }
  const postComments = copyComments.splice(0, COMMENTS_LIMIT);
  renderComments(postComments);
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
  socialCaption.textContent = post.description;

  socialComments.innerHTML = '';
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

buttonCancel.addEventListener('click', hidePhotoPopup);

export { showPhotoPopup };


