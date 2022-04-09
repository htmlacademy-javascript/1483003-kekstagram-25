import { isEscapeKey } from './util.js';
import { openUploadMessagePopup } from './message-upload-popup.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';

const DEFAULT_IMAGE_SCALE = 100;

const pageBody = document.body;
/**
 * @description Секция в которой находятся нужные элементы
 */
const imgUploadSection = pageBody.querySelector('.img-upload');
/**
 * @description  Поле для загрузки изображения
 */
const uploadFileInputElement = imgUploadSection.querySelector('#upload-file');
/**
 * @description Форма редактирования изображения
 */
const uploadPopupContainer = imgUploadSection.querySelector('.img-upload__overlay');
/**
 * @description Изображение которое загрузил пользователь
 */
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');
/**
 * @description Кнопка для закрытия формы редактирования изображения
 */
const uploadCancel = imgUploadSection.querySelector('#upload-cancel');
/**
 * Поле для значения текущего масштаба
 */
const scaleControlValue = imgUploadSection.querySelector('.scale__control--value');
/**
 * Форма ввода данных
 */
const imageUploadForm = document.querySelector('#upload-select-image');

function onEditPopupEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditPopup();
  }
}

/**
 * @description Функция открытия окна с редактированием изображения
 * @returns {void}
 */
function openImageEditPopup() {
  const file = this.files[0];

  if (!file.type.startsWith('image/')) {
    openUploadMessagePopup('error');
    return;
  }

  uploadPopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');

  addScaleHandler();
  document.addEventListener('keydown', onEditPopupEsc);
  uploadCancel.addEventListener('click', closeImageEditPopup);

  const fileReader = new FileReader();
  fileReader.onload = function (evt) {
    imgUploadPreview.src = evt.target.result;
  };

  fileReader.readAsDataURL(file);
}


function closeImageEditPopup() {
  uploadPopupContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  removeScaleHandler();
  document.removeEventListener('keydown', onEditPopupEsc);

  clearEnterData();
}

uploadFileInputElement.addEventListener('change', openImageEditPopup);

/**
 * @description Функция по возвращению всех данных и контрола фильтра к исходному состоянию
 * @returns {void}
 */
function clearEnterData() {
  scaleControlValue.value = `${DEFAULT_IMAGE_SCALE}%`;
  imgUploadPreview.style = 'transform: scale(1)';

  imageUploadForm.reset();
  imgUploadPreview.src = '';
}

export { onEditPopupEsc };
