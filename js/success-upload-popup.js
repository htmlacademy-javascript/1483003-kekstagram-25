import { isEscapeKey } from './util.js';

const pageBody = document.body;
/**
 * Шаблон сообщения об успешной загрузке изображения
 */
const successUploadTemplate = pageBody.querySelector('#success').content.querySelector('.success');

const successSection = successUploadTemplate.cloneNode(true);
/**
 * Блок с контентом попапа
 * @type {Element | null}
 */
const successInner = successSection.querySelector('.success__inner');
/**
 * Кнопка для выхода из сообщения об успешной загрузки изображения
 */
const successButton = successSection.querySelector('.success__button');

function onSuccessEscKey(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault(evt);
    closeSuccessPopup();
  }
}

/**
 * @description Функция проверки, что событие (клик) было вне области блока
 * @param {*} evt
 */
function onDocumentMouseClick(evt) {
  const click = evt.composedPath().includes(successInner);
  if (!click) {
    closeSuccessPopup();
  }
}

/**
 * @description Функция закрытия окна, что отправка данных прошла успешно
 * @returns {void}
 */
function closeSuccessPopup() {
  successSection.classList.add('hidden');

  document.removeEventListener('keydown', onSuccessEscKey);
  document.removeEventListener('click', onDocumentMouseClick);

}

/**
 * @description Функция открытия окна, что отправка данных прошла успешно
 * @returns {void}
 */
function openSuccessPopup() {

  document.addEventListener('keydown', onSuccessEscKey);
  document.addEventListener('click', onDocumentMouseClick);
}

successButton.addEventListener('click', () => {
  closeSuccessPopup();
});

pageBody.appendChild(successSection);


/******** Подсказки */

// Атрибут disabled (у кнопки) - Блокирует доступ и изменение элемента.
