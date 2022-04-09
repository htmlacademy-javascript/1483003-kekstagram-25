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
let commentsCounter = 0;
let copyComments = [];
/* let comments = []; */

const onBigPhotoEsc = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hidePhotoPopup();
  }
};

/* function renderCommentList (list, container) {
  container.innerHTML = '';

  const commentsList = list.slice();

  if (commentsList.length <= COMMENT_COUNT) {
    moreCommentsButton.classList.add('hidden');
  } else {
    moreCommentsButton.classList.remove('hidden');
  }

  const commentsPack = commentsList.splice(0, COMMENT_COUNT);
  let commentsCount = commentsPack.length;

  container.appendChild(addToFragment(commentsPack));

  commentsCountElement.innerHTML = `${commentsCount} из <span class="comments-count">${list.length}</span> комментариев`;

  moreCommentsButton.addEventListener('click', () => {
    const addCommentsPack = commentsList.splice(0, COMMENT_COUNT);
    const addCommentsCount = addCommentsPack.length;
    container.appendChild(addToFragment(addCommentsPack));
    commentsCount += addCommentsCount;
    commentsCountElement.innerHTML = `${commentsCount} из <span class="comments-count">${list.length}</span> комментариев`;
    if (commentsCount === list.length) {
      moreCommentsButton.classList.add('hidden');
    } else {
      moreCommentsButton.classList.remove('hidden');
    }
  });
}
 */

/**
 * @description Функция по отрисовке комментарив пользователей
 * @param {array} postComments
 */
function renderComments(comments) {
  /* const postComments = copyComments.splice(0, COMMENTS_LIMIT); */
  if (!comments.length) {
    /* hideCommentsLoader(); */
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
  /* commentsCounter += postComments.length;
  socialCommentsShow.textContent = commentsCounter; */


  /* if (!comments.length) {
    hideCommentsLoader();
  } */
}

function loadMoreComments() {
  showCommentsLoader();
  if (copyComments.length <= COMMENTS_LIMIT) {
    hideCommentsLoader();
  }
  const postComments = copyComments.splice(0, COMMENTS_LIMIT);
  renderComments(postComments);
}

/* hideCommentsLoader(); */
/* if (!postComments.length) {
  commentsLoader.classList.add('hidden');
  hideCommentsLoader();
} */


/**
 * @description Функция скрывает кнопку загрузки доолнительных коментариев, если комментариев меньше COMMENTS_LIMIT
 * @returns {void}
 */
function hideCommentsLoader() {
  commentsLoader.classList.add('hidden');
  commentsLoader.removeEventListener('click', loadMoreComments);
}

/**
 * @description Функция показывает кнопку загрузки дополнительных коментариев, если комментариев больше COMMENTS_LIMIT
 * @returns {void}
 */
function showCommentsLoader() {
  commentsLoader.classList.remove('hidden');
  commentsLoader.addEventListener('click', loadMoreComments);
}

/* function onCommentsButtonClick() {
  if (copyComments.length) {
    renderComments(copyComments.splice(0, COMMENTS_LIMIT));
    if (copyComments.length) {
      hideCommentsLoader();
    }
  }
} */

/**
 * @description Функция показа окна с полноразмерным изображением и заполнением поста данными
 * @param {Object} post - обьект массива
 */
function showPhotoPopup(post) {
  fullSizePopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  bigPictureImg.src = post.url;
  likesCount.textContent = post.likes;
  commentsCount.textContent = post.comments.length;
  socialCaption.textContent = post.description;

  socialComments.innerHTML = '';

  /* if (post.comments.length <= COMMENTS_LIMIT) {
    hideCommentsLoader();
  } else {
    showCommentsLoader();
  } */

  /* const copyComments = [...post.comments];   */
  copyComments = [...post.comments];
  /* const commentsFive = copyComments.splice(0, COMMENTS_LIMIT);
 */
  loadMoreComments();

  /* if (!copyComments.length) {
    hideCommentsLoader();
  } else {
    showCommentsLoader();
  } */

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


