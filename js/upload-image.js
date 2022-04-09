import { isEscapeKey } from './util.js';
import { openUploadMessagePopup } from './message-upload-popup.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';
import { focusIn, focusOut } from './form-validation.js';
import { onChangeImageEffect } from './image-slider-effects.js';

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
 * Поле для ввода хеш-тегов
 */
const hashtagsField = imgUploadSection.querySelector('.text__hashtags');
/**
 * Поле для ввода комментариев
 */
const commentField = imgUploadSection.querySelector('.text__description');
/**
 * Поле для значения текущего масштаба
 */
const scaleControlValue = imgUploadSection.querySelector('.scale__control--value');
/**
 *  Список эффектов накладываемых на изображение
 */
const effectsList = imgUploadSection.querySelector('.effects__list');
/**
 * Блок для вставки слайдера
 */
const effectLevelSlider = imgUploadSection.querySelector('.effect-level__slider');

const DEFAULT_IMAGE_SCALE = 100;

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

  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
    connect: 'lower',
    format: {
      to: function (value) {
        if (Number.isInteger(value)) {
          return value.toFixed(0);
        }
        return value.toFixed(1);
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  effectsList.addEventListener('click', onChangeImageEffect);

  hashtagsField.addEventListener('focusin', focusIn);
  hashtagsField.addEventListener('focusout', focusOut);

  commentField.addEventListener('focusin', focusIn);
  commentField.addEventListener('focusout', focusOut);

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

  effectsList.removeEventListener('click', onChangeImageEffect);
  effectLevelSlider.noUiSlider.destroy();

  clearEnterData();

  hashtagsField.removeEventListener('focusin', focusIn);
  hashtagsField.removeEventListener('focusout', focusOut);

  commentField.removeEventListener('focusin', focusIn);
  commentField.removeEventListener('focusout', focusOut);
}

uploadFileInputElement.addEventListener('change', openImageEditPopup);

/**
 * @description Функция по возвращению всех данных и контрола фильтра к исходному состоянию
 * @returns {void}
 */
function clearEnterData() {
  scaleControlValue.value = `${DEFAULT_IMAGE_SCALE}%`;
  imgUploadPreview.style = 'transform: scale(1)';

  imgUploadPreview.src = '';
  imgUploadPreview.className = '';

  hashtagsField.value = '';
  commentField.value = '';
}

export { onEditPopupEsc };
