const EFFECT_CONFIG = {
  chrome: {
    options: {
      range: { min: 0, max: 1, },
      start: 1,
      step: 0.1,
    },
    style: 'grayscale',
    unit: '',
  },

  sepia: {
    options: {
      range: { min: 0, max: 1, },
      start: 1,
      step: 0.1,
    },
    style: 'sepia',
    unit: '',
  },

  marvin: {
    options: {
      range: { min: 0, max: 100, },
      start: 100,
      step: 1,
    },
    style: 'invert',
    unit: '%',
  },

  phobos: {
    options: {
      range: { min: 0, max: 3, },
      start: 3,
      step: 0.1,
    },
    style: 'blur',
    unit: 'px',
  },

  heat: {
    options: {
      range: { min: 1, max: 3, },
      start: 3,
      step: 0.1,
    },
    style: 'brightness',
    unit: '',
  },
};

const NO_EFFECT = 'none';

/**
 * Форма ввода данных
 */
const imageUploadForm = document.querySelector('#upload-select-image');
/**
 * Секция с нужными блоками для удобства поиска
 */
const imgUploadSection = document.querySelector('.img-upload__overlay');
/**
 * Полностью весь блок со слайдером
 */
const effectSliderContainer = document.querySelector('.img-upload__effect-level');
/**
 * Блок для вставки слайдера
 */
const effectLevelSlider = imgUploadSection.querySelector('.effect-level__slider');
/**
 * Input для записи выбранного значения
 */
const effectInputValue = imgUploadSection.querySelector('.effect-level__value');
/**
 * Изображение для редактирования
 */
const imgUploadPreview = imgUploadSection.querySelector('.img-upload__preview img');

/**
 * @description Функция наложение эффектов на изображение
 * @param {string} effectName
 */
const updateSliderConfig = (effectName) => {
  effectLevelSlider.noUiSlider.updateOptions(effectName.options);
};

/**
 * @description Функция сброса значений и блокировки слайдера
 */
const imageEffectReset = () => {
  imgUploadPreview.style.filter = NO_EFFECT;
  imgUploadPreview.className = '';
  effectInputValue.value = '';
  effectSliderContainer.classList.add('hidden');
};

/**
 * @description Функция добавления эффекта к изображению
 * @param {MouseEvent} evt
 */
const onChangeImageEffect = (evt) => {
  const effectName = evt.target.value;
  imgUploadPreview.className = '';
  imgUploadPreview.classList.add(`effects__preview--${effectName}`);
  if (effectName === NO_EFFECT) {
    imageEffectReset();
  } else {
    effectSliderContainer.classList.remove('hidden');
    updateSliderConfig(EFFECT_CONFIG[effectName]);
  }
};

const onEffectValueChange = (handlersValue) => {
  const value = handlersValue[0];
  const effectName = imageUploadForm.effect.value;
  if (effectName === NO_EFFECT) {
    return;
  }
  const filterName = EFFECT_CONFIG[effectName].style;
  const filterUnits = EFFECT_CONFIG[effectName].unit;
  imgUploadPreview.style.filter = `${filterName}(${value}${filterUnits})`;
  effectInputValue.value = value;
};

export { onChangeImageEffect, onEffectValueChange };
