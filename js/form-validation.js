import { onEditPopupEsc } from './upload-image.js';
/* import { openErrorPopup } from './error-upload-popup.js';
import { openSuccessPopup } from './success-upload-popup.js'; */

/**
 * Форма для загрузки изображения
 */
const imageUploadForm = document.querySelector('#upload-select-image');
/* *
 * Форма редактирования изображения
 */
/* const imgUploadOverlay = imageUploadForm.querySelector('.img-upload__overlay'); */
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
/* const scaleControlValue = imageUploadForm.querySelector('.scale__control--value'); */
/**
 * Изображение для редактирования
 */
/* const imgUploadPreview = imageUploadForm.querySelector('.img-upload__preview').querySelector('img'); */

const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_QUANTITY = 5;

/**
 * @description Функция запрета закрытия окна при нажатии Esc
 */
function focusIn() {
  document.removeEventListener('keydown', onEditPopupEsc);
}

/**
 * @description Функция разрешения закрытия окна при нажатии Esc
 */
function focusOut() {
  document.addEventListener('keydown', onEditPopupEsc);
}

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
    /* closeEditPopup();
    openSuccessPopup(); */
    // Все данные приходят в изначальный вид
  } else {
    /* closeEditPopup();
    openErrorPopup(); */
  }
});

/**
 * @description Функция проверки количества хеш-тегов - не более HASHTAGS_MAX_QUANTITY
 * @param {array} arrHashtags - массив элементов
 * @returns {boolean}
 */
function checkLengthHashtag(arrHashtags) {
  return arrHashtags.length <= HASHTAGS_MAX_QUANTITY;
}

pristine.addValidator(
  hashtagsField,
  checkLengthHashtag,
  `Не более ${HASHTAGS_MAX_QUANTITY} хеш-тегов`
);

/**
 * @description Функция проверки строки на соответствие условиям регулярного выражения
 * @param {*} arrayItem - элемент массива
 * @returns {boolean}
 */
function isMatchRegExp(arrayItem) {
  // eslint-disable-next-line no-misleading-character-class
  const regularExpression = /^#[A-Za-zА-Яа-яËё0-9]{1,19}$/;
  return regularExpression.test(arrayItem);
}

/**
 * @description Функция проверки каждого хеш-тега на правильность ввода в соответствии с регялярным выражением
 * @param {array} array - массив элементов
 * @returns {boolean}
 */
function validateRegExp(array) {
  return array.every(isMatchRegExp);
}

pristine.addValidator(
  hashtagsField,
  validateRegExp,
  'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.'
);

/**
 * @description Функция проверяет, чтобы один и тот же хэш-тег не был использован дважды
 * @param {array} array - массив элементов
 * @returns {boolean}
 */
function hasDuplicate(array) {

  for (let i = 0; i < array.length; i++) {
    if (array[i] === array[i + 1]) {
      return true;
    }
  }
  return false;
}

/* const userPostHashtags = hashtagsField.value;
const arrayFromUserPostHashtags = userPostHashtags.split(' ');
return arrayFromUserPostHashtags;

function validateHashtags() {

}

pristine.addValidator(
  hashtagsField,

);

const userPostComment = commentField.value;
const arrayFromUserPostComment = userPostComment.split('');
return arrayFromUserPostComment; */

/**
 * @description Функция проверки длинны комментария
 * @param {array} value
 * @returns {boolean}
 */
function validateComment(value) {
  return value.length <= COMMENT_MAX_LENGTH;
}

pristine.addValidator(
  commentField,
  validateComment,
  `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`
);

export { focusIn, focusOut };

// хэш-тег начинается с символа # (решётка); +++
// строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.;  +++
// хеш-тег не может состоять только из одной решётки;
// максимальная длина одного хэш-тега 20 символов, включая решётку; +++
// хэш-теги нечувствительны к регистру: #ХэшТег и #хэштег считаются одним и тем же тегом;
// хэш-теги разделяются пробелами;
// один и тот же хэш-тег не может быть использован дважды;
// нельзя указать больше пяти хэш-тегов; +++
// хэш-теги необязательны; +++
// если фокус находится в поле ввода хэш-тега, нажатие на Esc не должно приводить к закрытию формы редактирования изображения. +++
