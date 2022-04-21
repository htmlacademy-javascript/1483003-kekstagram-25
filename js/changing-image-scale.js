const PREVIEW_SCALE_STEP = 25;
const PREVIEW_MIN_SCALE = 25;
const PREVIEW_MAX_SCALE = 100;
const PREVIEW_SCALE_DEFAULT = 100;
const DIVIDER_FOR_SCALE = 100;

const imgUploadPreviewContainer = document.querySelector('.img-upload__preview-container');
/**
 * Кнопка для уменьшения масштаба изображения
 */
const scaleControlSmaller = imgUploadPreviewContainer.querySelector('.scale__control--smaller');
/**
 * Кнопка для увеличения масштаба изображения
 */
const scaleControlBigger = imgUploadPreviewContainer.querySelector('.scale__control--bigger');
/**
 * Поле для значения текущего масштаба
 */
const scaleControlValue = imgUploadPreviewContainer.querySelector('.scale__control--value');
/**
 * Изображение для редактирования
 */
const imgUploadPreview = imgUploadPreviewContainer.querySelector('.img-upload__preview img');

/**
 * @description Функция уменьшения масштаба изображения
 */
const onReduceScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale > PREVIEW_MIN_SCALE) {
    scale -= PREVIEW_SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    imgUploadPreview.style = `transform: scale(${scale / DIVIDER_FOR_SCALE})`;
  }
};
/**
 * @description Функция увеличения масштаба изображения
 */
const onIncreaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale < PREVIEW_MAX_SCALE) {
    scale += PREVIEW_SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    imgUploadPreview.style = `transform: scale(${scale / DIVIDER_FOR_SCALE})`;
  }
};

const addScaleHandler = () => {
  scaleControlValue.value = `${PREVIEW_SCALE_DEFAULT}%`;
  scaleControlSmaller.addEventListener('click', onReduceScale);
  scaleControlBigger.addEventListener('click', onIncreaseScale);
};

const removeScaleHandler = () => {
  scaleControlSmaller.removeEventListener('click', onReduceScale);
  scaleControlBigger.removeEventListener('click', onIncreaseScale);
};

export { addScaleHandler, removeScaleHandler };
