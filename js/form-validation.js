import { isEscapeKey, checkStringMaxLength } from './util.js';
import { openUploadMessagePopup } from './message-upload-popup.js';
import { sendDataToServer } from './server-api.js';
import { closeImageEditPopup } from './upload-image.js';

const REGULAR_EXPRESSION = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const COMMENT_MAX_LENGTH = 140;
const HASHTAGS_MAX_COUNT = 5;
const HASHTAGS_MAX_LENGTH = 20;
const hashtagValidateRegExp = new RegExp(REGULAR_EXPRESSION);

/**
 * Форма ввода данных
 */
const imageUploadForm = document.querySelector('#upload-select-image');
/**
 * Поле для ввода хеш-тегов
 */
const hashtagsInput = imageUploadForm.querySelector('.text__hashtags');
/**
 * Поле для ввода комментариев
 */
const commentInput = imageUploadForm.querySelector('.text__description');
/**
 *
 */
const uploadSubmitButton = imageUploadForm.querySelector('#upload-submit');

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
const unBlockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const pristine = new Pristine(imageUploadForm, {
  classTo: 'text__group',
  errorClass: 'is-invalid',
  successClass: 'is-valid',
  errorTextParent: 'text__group',
  errorTextTag: 'p',
  errorTextClass: 'error-text'
});

const uploadFormValidate = () => {
  pristine.validate();
};

/**
 * @description Функция проверки количества хеш-тегов - не более HASHTAGS_MAX_QUANTITY
 * @param {string} value
 * @returns {boolean}
 */
const checkHashtagsCount = (value) => value.split(' ').length <= HASHTAGS_MAX_COUNT;

/**
 * @description Функция проверки длины хештега - не более 20 символов
 * @param {string} value
 * @returns {boolean}
 */
const checkHashtagLength = (value) => value.split(' ').every((hashtag) => hashtag.length <= HASHTAGS_MAX_LENGTH);

/**
 * @description Функция проверки строки на соответствие условиям регулярного выражения
 * @param {string} arrayItem - элемент массива
 * @returns {boolean}
 */
const checkIsValidHashtag = (arrayItem) => hashtagValidateRegExp.test(arrayItem);

/**
 * @description Функция проверки каждого хеш-тега на правильность ввода в соответствии с регулярным выражением
 * @param {string} value
 * @returns {boolean}
 */
const checkIsValidHashtags = (value) => {
  if (value === '') {
    return true;
  }
  return value.split(' ').every(checkIsValidHashtag);
};

/**
 * @description Функция проверяет, чтобы один и тот же хэш-тег не был использован дважды
 * @param {string} value
 * @returns {boolean}
 */
const validateIsDuplicateHashtags = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  const uniqueHashtags = new Set(hashtags);
  return uniqueHashtags.size === hashtags.length;
};

/**
 * @description Функция проверки длинны комментария
 * @param {array} value
 * @returns {boolean}
 */
const validateComment = (value) => checkStringMaxLength(value, COMMENT_MAX_LENGTH);

pristine.addValidator(hashtagsInput, checkHashtagsCount, `Не более ${HASHTAGS_MAX_COUNT} хеш-тегов`, 1, false);
pristine.addValidator(hashtagsInput, checkHashtagLength, `Длина хештега не должна превышать ${HASHTAGS_MAX_LENGTH} символов`, 1, true);
pristine.addValidator(hashtagsInput, checkIsValidHashtags, 'Строка после решётки может состоять только из букв и чисел', 1, false);
pristine.addValidator(hashtagsInput, validateIsDuplicateHashtags, 'Хеш-теги не должны повторяться', 1, false);
pristine.addValidator(commentInput, validateComment, `Длина комментария не может составлять больше ${COMMENT_MAX_LENGTH} символов`, 1, false);


// Добавление обработчика на отпракву формы
imageUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const isValid = pristine.validate();
  if (!isValid) {
    return;
  }

  const formData = new FormData(evt.target);
  blockSubmitButton();

  const onSuccess = () => {
    closeImageEditPopup();
    unBlockSubmitButton();
    openUploadMessagePopup('success');
  };

  const onError = () => {
    closeImageEditPopup();
    unBlockSubmitButton();
    openUploadMessagePopup('error');
  };

  sendDataToServer(formData, onSuccess, onError);
});

// Отмена закрытия модального окана, когда фокус в поле ввода хеш-тегов
hashtagsInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

// Отмена закрытия модального окана, когда фокус в поле ввода комментариев
commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

export { uploadFormValidate };
