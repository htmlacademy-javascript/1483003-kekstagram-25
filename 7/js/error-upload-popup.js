import { isEscapeKey } from './util.js';

const pageBody = document.body;
/**
 *  Шаблон сообщения с ошибкой загрузки изображения
 */
const errorUploadTemplate = pageBody.querySelector('#error').content.querySelector('.error');

const errorSection = errorUploadTemplate.cloneNode(true);
/**
 * Блок с контентом попапа
 * @type {Element | null}
 */
const errorInner = errorSection.querySelector('.error__inner');
/**
 * Кнопка выхода из сообщения об ошибки загрузки изображения
 */
const errorButton = errorSection.querySelector('.error__button');

function onErrorPopupEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
}

/**
 * @description Функция проверки, что событие (клик) было вне области блока
 * @param {*} evt
 */
function onDocumentMouseClick(evt) {
  const click = evt.composedPath().includes(errorInner);
  if (!click) {
    closeErrorPopup();
  }
}

/**
 * @description Функция закрытия окна, что при отправке данных произошла ошибка запроса
 * @returns {void}
 */
function closeErrorPopup() {
  errorSection.classList.add('hidden');

  document.removeEventListener('keydown', onErrorPopupEsc);
  document.removeEventListener('click', onDocumentMouseClick);
}

/**
 * @description Функция открытия окна, что при отправке данных произошла ошибка запроса
 * @returns {void}
 */
function openErrorPopup() {
  document.addEventListener('keydown', onErrorPopupEsc);
  document.addEventListener('click', onDocumentMouseClick);
}

errorButton.addEventListener('click', () => {
  closeErrorPopup();
});

pageBody.appendChild(errorSection);

export { openErrorPopup };
