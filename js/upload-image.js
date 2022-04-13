import { isEscapeKey } from './util.js';
import { openUploadMessagePopup } from './message-upload-popup.js';
import { addScaleHandler, removeScaleHandler } from './changing-image-scale.js';
import { onChangeImageEffect, onEffectValueChange } from './image-slider-effects.js';
import { uploadFormValidate } from './form-validation.js';

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
const imageUploadForm = imgUploadSection.querySelector('#upload-select-image');
/**
 * Блок для вставки слайдера
 */
const effectLevelSlider = imgUploadSection.querySelector('.effect-level__slider');
/**
 * Филдсет со всеми эффектами
 */
const imgEffectsFieldset = document.querySelector('.img-upload__effects');

const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');

/**
 * @description Функция по возвращению всех данных и контрола фильтра к исходному состоянию
 * @returns {void}
 */
const clearEnterData = () => {
  scaleControlValue.value = `${DEFAULT_IMAGE_SCALE}%`;
  imgUploadPreview.style = 'transform: scale(1)';

  imageUploadForm.reset();
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.src = '';
};

/**
 * @description Функция закрытия окна с редактированием изображения
 * @returns {void}
 */
const closeImageEditPopup = () => {
  uploadPopupContainer.classList.add('hidden');
  pageBody.classList.remove('modal-open');

  removeScaleHandler();
  document.removeEventListener('keydown', onEditPopupEsc);

  imgEffectsFieldset.removeEventListener('change', onChangeImageEffect);
  effectLevelSlider.noUiSlider.destroy();

  clearEnterData();
};

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

  imgUploadEffectLevel.classList.add('hidden');

  uploadPopupContainer.classList.remove('hidden');
  pageBody.classList.add('modal-open');
  uploadFormValidate();

  addScaleHandler();
  document.addEventListener('keydown', onEditPopupEsc);
  uploadCancel.addEventListener('click', closeImageEditPopup);

  const uiSlider = noUiSlider.create(effectLevelSlider, {
    range: {min: 0, max: 1,},
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

  uiSlider.on('update', onEffectValueChange);

  imgEffectsFieldset.addEventListener('change', onChangeImageEffect);

  const fileReader = new FileReader();
  fileReader.onload = function (evt) {
    imgUploadPreview.src = evt.target.result;
  };

  fileReader.readAsDataURL(file);
}

function onEditPopupEsc(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImageEditPopup();
  }
}

uploadFileInputElement.addEventListener('change', openImageEditPopup);

export { onEditPopupEsc, closeImageEditPopup };
