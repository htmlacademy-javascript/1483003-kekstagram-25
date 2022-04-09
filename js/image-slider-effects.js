/**
 * Секция с нужными блоками для удобства поиска
 */
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
/**
 * Блок для вставки слайдера
 */
const effectLevelSlider = imgUploadOverlay.querySelector('.effect-level__slider');
/**
 * Input для записи выбранного значения
 */
const effectLevelValue = imgUploadOverlay.querySelector('.effect-level__value');
/**
 * Изображение для редактирования
 */
const imgUploadPreview = imgUploadOverlay.querySelector('.img-upload__preview img');

const FILTERS_CONFIG = {
  chrome: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'grayscale',
    unit: '',
  },

  sepia: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    style: 'sepia',
    unit: '',
  },

  marvin: {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    style: 'invert',
    unit: '%',
  },

  phobos: {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    style: 'blur',
    unit: 'px',
  },

  heat: {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    style: 'brightness',
    unit: '',
  },
};

/* noUiSlider.create(effectLevelSlider, {
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
}); */

/**
 * @description Функция наложение эффектов на изображение
 * @param {string} effect
 */
const setImageEffect = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions(effect.options);
  effectLevelSlider.noUiSlider.on('update', (values) => {
    imgUploadPreview.style.filter = `${effect.style}(${values}${effect.unit})`;
    effectLevelValue.value = values;
  });
};

/**
 * @description Функция сброса значений и блокировки слайдера
 */
const clearImageEffectr = () => {
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.className = '';
  effectLevelValue.value = '';
  effectLevelSlider.setAttribute('disabled', true);
};

/**
 * @description Функция добавления эффекта к изображению
 * @param {MouseEvent} evt
 */
const onChangeImageEffect = (evt) => {
  if (evt.target.matches('input[type="radio"]')) {
    const effect = evt.target.value;
    imgUploadPreview.className = '';
    imgUploadPreview.classList.add(`effects__preview--${effect}`);
    if (effect === 'none') {
      clearImageEffectr();
    } else {
      effectLevelSlider.removeAttribute('disabled', true);
      setImageEffect(FILTERS_CONFIG[effect]);
    }
  }
};

export { onChangeImageEffect };
