import { isEscapeKey } from './util.js';

const pageBody = document.body;
/**
 *  Шаблон сообщения с ошибкой загрузки изображения
 */
const errorUploadTemplate = pageBody.querySelector('#error').content.querySelector('.error');

const errorSection = errorUploadTemplate.cloneNode(true);
/**
 * Блок с контентом попапа
 */
const errorInner = errorSection.querySelector('.error__inner');
/**
 * Кнопка выхода из сообщения об ошибки загрузки изображения
 */
const errorButton = errorSection.querySelector('.error__button');

function onErrorPopupEscKeydown(evt) {
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

function closeErrorPopup() {
  errorSection.classList.add('hidden');

  document.removeEventListener('keydown', onErrorPopupEscKeydown);
  document.removeEventListener('click', onDocumentMouseClick);
}

function openErrorPopup() {

  document.addEventListener('keydown', onErrorPopupEscKeydown);
  document.addEventListener('click', onDocumentMouseClick);
}

errorButton.addEventListener('click', () => {
  closeErrorPopup();
});

pageBody.appendChild(errorSection);


