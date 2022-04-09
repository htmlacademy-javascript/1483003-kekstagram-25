import { isEscapeKey, checkStringMaxLength } from './util.js';
import { openUploadMessagePopup } from './message-upload-popup.js';

/**
 * Форма ввода данных
 */
const imageUploadForm = document.querySelector('#upload-select-image');
/**
 * Поле для ввода хеш-тегов
 */
const hashtagsField = imageUploadForm.querySelector('.text__hashtags');
/**
 * Поле для ввода комментариев
 */
const commentField = imageUploadForm.querySelector('.text__description');
/**
 *
 */
const uploadSubmitButton = imageUploadForm.querySelector('#upload-submit');

// eslint-disable-next-line no-misleading-character-class
const REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAGS_MAX_LENGTH = 20;


/**
 * Блокировка кнопки формы на время ожидания ответа сервера
 */
const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикация...';
};

/**
 * Разблокировка кнопки формы на время ожидания ответа сервера
 */
/* const unBlockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
}; */

const pristine = new Pristine(imageUploadForm, {
  classTo: 'text__group',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'text__group',
  errorTextTag: 'p',
  errorTextClass: 'error-text'
});

imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (isValid) {
    imageUploadForm.submit();
    blockSubmitButton();
    openUploadMessagePopup('success');
  } else {
    openUploadMessagePopup('error');
  }
});

/**
 * @description Функция проверки количества хеш-тегов - не более HASHTAGS_MAX_QUANTITY
 * @param {string} value
 * @returns {boolean}
 */
const checkLengthHashtags = (value) => {
  const arrHashtags = value.split(' ');
  return arrHashtags.length <= HASHTAGS_MAX_QUANTITY;
};

/**
 * @description Функция проверки длины хештега - не более 20 символов
 * @param {string} value
 * @returns {boolean}
 */
const checkLengthOneHashtag = (value) => {
  const oneHashtag = value.split(' ');
  return oneHashtag.every((hashtag) => hashtag.length <= HASHTAGS_MAX_LENGTH);
};

/**
 * @description Функция проверки строки на соответствие условиям регулярного выражения
 * @param {string} arrayItem - элемент массива
 * @returns {boolean}
 */
const isMatchRegExp = (arrayItem) => {
  const re = new RegExp(REGULAR_EXPRESSION);
  return re.test(arrayItem);
};

/**
 * @description Функция проверки каждого хеш-тега на правильность ввода в соответствии с регулярным выражением
 * @param {string} value
 * @returns {boolean}
 */
const validateRegExp = (value) => {
  if (value === '') {
    return true;
  }
  const arrayHashtags = value.split(' ');
  return arrayHashtags.every(isMatchRegExp);
};

/**
 * @description Функция проверяет, чтобы один и тот же хэш-тег не был использован дважды
 * @param {string} value
 * @returns {boolean}
 */
const hasDuplicateHashtag = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  const uniqueTag = new Set(hashtags);
  return uniqueTag.size === hashtags.length;
};

/**
 * @description Функция проверки длинны комментария
 * @param {array} value
 * @returns {boolean}
 */
const validateComment = (value) => checkStringMaxLength(value, COMMENT_MAX_LENGTH);

pristine.addValidator(hashtagsField, checkLengthHashtags, `Не более ${HASHTAGS_MAX_QUANTITY} хеш-тегов`, 1, false);
pristine.addValidator(hashtagsField, checkLengthOneHashtag, `Длина хештега не должна превышать ${HASHTAGS_MAX_LENGTH} символов`, 1, true);
pristine.addValidator(hashtagsField, validateRegExp, 'Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.', 1, false);
pristine.addValidator(hashtagsField, hasDuplicateHashtag, 'Хеш-теги не должны повторяться', 1, false);
pristine.addValidator(commentField, validateComment, `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`, 1, false);

/**
 * @description Отмена закрытия модального окана, когда фокус в поле ввода хеш-тегов
 */
hashtagsField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

/**
 * @description Отмена закрытия модального окана, когда фокус в поле ввода комментариев
 */
commentField.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
