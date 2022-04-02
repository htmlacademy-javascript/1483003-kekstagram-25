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
const imgUploadPreview = imgUploadPreviewContainer.querySelector('.img-upload__preview').querySelector('img');

const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

/**
 * @description Функция уменьшения масштаба изображения
 */
const onReduceScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale > MIN_SCALE) {
    scale -= SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    imgUploadPreview.style = `transform: scale(${scale / 100})`;
  }
};
/**
 * @description Функция увеличения масштаба изображения
 */
const onIncreaseScale = () => {
  let scale = parseInt(scaleControlValue.value, 10);
  if (scale < MAX_SCALE) {
    scale += SCALE_STEP;
    scaleControlValue.value = `${scale}%`;
    imgUploadPreview.style = `transform: scale(${scale / 100})`;
  }
};

const addScaleHandler = () => {
  scaleControlSmaller.addEventListener('click', onReduceScale);
  scaleControlBigger.addEventListener('click', onIncreaseScale);
};

const removeScaleHandler = () => {
  scaleControlSmaller.removeEventListener('click', onReduceScale);
  scaleControlBigger.removeEventListener('click', onIncreaseScale);
};

export {addScaleHandler, removeScaleHandler};
