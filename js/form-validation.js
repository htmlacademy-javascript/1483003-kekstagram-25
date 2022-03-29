import { isEscapeKey } from './util.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';

const pageBody = document.body;
/**
 * Форма для загрузки изображения
 */
const imageUploadForm = document.querySelector('#upload-select-image');
/**
 * Форма редактирования изображения
 */
const imgUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay');
/**
 * Кнопка для закрытия формы редактирования изображения
 */
const uploadCancel = imageUploadForm.querySelector('#upload-cancel');
/**
 * Поле для ввода хеш-тегов
 */
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
/**
 * Поле для ввода комментариев
 */
const commentField = imageUploadForm.querySelector('.text__description');
/**
 * Поле для значения текущего масштаба
 */
const scaleControlValue = imageUploadForm.querySelector('.scale__control--value');
/**
 * Изображение для редактирования
 */
const imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview').querySelector('img');

const DEFAULT_IMAGE_SCALE = 100;
const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_QUANTITY = 5;

// eslint-disable-next-line no-misleading-character-class
const regularExpression = /^#[A-Za-zА-Яа-яËё0-9]{1,19}$/;

const pristine = new Pristine(imageUploadForm, {
  classTo: 'img-upload__text',
  errorTextParent: 'img-upload__text',
  errorTextTag: 'p',
  errorTextClass: 'error-text'
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    // Сообщение - попап об успешной загрузке изображения
    // Все данные приходят в изначальный вид
    console.log('Можно отправлять');
  } else {
    console.log('Форма невалидна');
  }
});

function onEditPopupEscKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditPopup();
  }
}

/**
 * Функция запрета закрытия окна при нажатии Esc
 */
function focusIn() {
  document.removeEventListener('keydown', onEditPopupEscKeydown);
}

/**
 * Функция разрешения закрытия окна при нажатии Esc
 */
function focusOut() {
  document.addEventListener('keydown', onEditPopupEscKeydown);
}

function openEditPopup() {
  imgUploadOverlay.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  addScaleHandler();

  hashtagsField.addEventListener('focusin', focusIn);
  hashtagsField.addEventListener('focusout', focusOut);

  commentField.addEventListener('focusin', focusIn);
  commentField.addEventListener('focusout', focusOut);

  uploadCancel.addEventListener('click', closeEditPopup);
  document.addEventListener('keydown', onEditPopupEscKeydown);

  scaleControlValue.value = `${DEFAULT_IMAGE_SCALE}%`;
  imgUploadPreview.style = 'transform: scale(1)';
}

function closeEditPopup() {
  imgUploadOverlay.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  removeScaleHandler();

  hashtagsField.removeEventListener('focusin', focusIn);
  hashtagsField.removeEventListener('focusout', focusOut);

  commentField.removeEventListener('focusin', focusIn);
  commentField.removeEventListener('focusout', focusOut);

  document.removeEventListener('keydown', onEditPopupEscKeydown);

  scaleControlValue.value = `${DEFAULT_IMAGE_SCALE}%`;
  imgUploadPreview.style = 'transform: scale(1)';
}

const userPostHashtags = hashtagsField.value;
const arrayFromUserPostHashtags = userPostHashtags.split('');
// return arrayFromUserPostHashtags;

function validateHashtags() {

}

pristine.addValidator(
  hashtagsField,

);

const userPostComment = commentField.value;
const arrayFromUserPostComment = userPostComment.split('');
// return arrayFromUserPostComment;

function validateComment(value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

pristine.addValidator(
  commentField,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);


/* openEditPopup(); */

