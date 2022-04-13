import { isEscapeKey } from './util.js';

const ALERT_SHOW_TIME = 5000;

const pageBody = document.body;
/**
 *  Шаблон сообщения с ошибкой загрузки изображения
 */
const errorUploadTemplate = getTemplateElement(pageBody, 'error', 'error');
/**
 * Шаблон сообщения об успешной загрузке изображения
 */
const successUploadTemplate = getTemplateElement(pageBody, 'success', 'success');

/**
 * @description Функция поиска шаблона на странице
 * @param {HTMLElement} parent - блок в котором ищем шаблон
 * @param {string} templateId - id шаблона
 * @param {string} elementClass - класс секции внутри шаблона
 * @returns {HTMLElement}
 */
function getTemplateElement(parent, templateId, elementClass) {
  return parent.querySelector(`#${templateId}`).content.querySelector(`.${elementClass}`);
}

/**
 * @description Функция показа попапа об успешной/неудачной отправке формы
 * @param {string} popupType - класс блока сообщения
 * @param {string} message
 * @param {string} buttonText
 */
const openUploadMessagePopup = (popupType/* , message, buttonText */) => {

  let popupTemplate;
  let popupInnerSection;
  let popupButtonElementClass;

  switch (popupType) {
    case 'success':
      popupTemplate = successUploadTemplate;
      popupInnerSection = '.success__inner';
      popupButtonElementClass = '.success__button';
      break;
    case 'error':
      popupTemplate = errorUploadTemplate;
      popupInnerSection = '.error__inner';
      popupButtonElementClass = '.error__button';
      break;
  }

  const innerPopup = popupTemplate.cloneNode(true);
  const innerPopupSection = innerPopup.querySelector(popupInnerSection);
  const popupButton = innerPopup.querySelector(popupButtonElementClass);

  const closeUploadMessagePopup = () => {
    popupButton.removeEventListener('click', closeUploadMessagePopup);
    innerPopup.remove();
  };

  const onUploadMessagePopupEsc = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeUploadMessagePopup();
    }
  };

  /**
  * @description Функция проверки, что событие (клик) было вне области блока
  * @param {MouseEvent} evt
  */
  const onOutsideClick = (evt) => {
    const isOutsideClick = !evt.composedPath().includes(innerPopupSection);
    if (isOutsideClick) {
      closeUploadMessagePopup();
    }
  };

  document.addEventListener('keydown', onUploadMessagePopupEsc, { once: true });
  document.addEventListener('click', onOutsideClick, { once: true });

  popupButton.addEventListener('click', closeUploadMessagePopup);

  pageBody.appendChild(innerPopup);
};

/**
 * @description Функция создания сообщения, что при загрузке данных с сервера произошла ошибка запроса
 * @param {string} message
 */
const showAlertMessage = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export { openUploadMessagePopup, showAlertMessage };
