const isEscapeKey = (evt) => evt.key === 'Escape';

const isNumber = (val) => typeof val === 'number';

/**
 * @description Функция находит наибольшее число из переданных и проверяет, положительное ли оно
 * @param  {number} args - проверяемое число или числа
 * @returns {boolean}
 */
const isPositiveMaxNumbers = (...args) => Math.max(...args) > 0;

/**
 * @description Функция проверяет, что строка меньше или равна заданной длине
 * @param {string} string - проверяемая строка
 * @param {number} maxLength - максимальная длина
 * @return {boolean}
 */
const checkStringMaxLength = (string, maxLength) => string.length <= maxLength;

/**
 * @description Функция возвращающая случайное целое число из переданного диапазона включительно
 * @param {number} from - минимальное значение
 * @param {number} to - максимальное значение
 * @returns {number} - случайное целое число из переданного диапазона
 */
const getRandomIntInclusive = (from, to) => {
  if (!isNumber(from) || !isNumber(to) || !isPositiveMaxNumbers(from, to)) {
    return null;
  }
  if (from < 0) {
    from = 0;
  }
  if (to < 0) {
    to = 0;
  }
  if (from > to) {
    [from, to] = [to, from];
  }
  const min = Math.ceil(from); // Округление вверх до ближайшего большего целого
  const max = Math.floor(to); // Округление вниз до ближайшего меньшего целого
  if (from === to) {
    return from;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
};

/**
 * @description Функция возвращает элемент массива
 * @param {array} elements - массив
 */
const getRandomArrayElement = (elements) => elements[getRandomIntInclusive(0, elements.length - 1)];

// Функция получение целого неповторяющегося числа
const getNextRandomInt = (startNumber = 1, maxStep = 1) => {
  let currentNumber = startNumber;
  return () => {
    const resultNumber = currentNumber;
    currentNumber += getRandomIntInclusive(1, maxStep);
    return resultNumber;
  };
};

/**
 * Возвращает перемешанную копию исходного массива
 * @param {Array} array - исходный массив
 * @returns {Array} перемешанная копия массива
 */
const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.5);

/**
 * Заданное количество уникальных числел, в допустимом диапазоне
 * @param {number} from - начальное значение диапазона
 * @param {number} to - конечное диапазона
 * @param {number} resultsLimit - количество элементов
 * @returns {number[]} - Массив чисел в диапазоне
 */
const randomIntegersBetweenRange = (from, to, resultsLimit) => {
  const range = Math.abs(from - to);
  if (!range) {
    return [];
  }
  const resultsCount = Math.min(range, resultsLimit);
  const minValue = Math.min(from, to);
  const values = Array.from({ length: range }, (_, index) => minValue + index);
  return shuffleArray(values).splice(0, resultsCount);
};

/**
 * @description Функция устранения 'дребезга' при переключении фильтра сортировки постов
 * @param {function} callback
 * @param {number} timeoutDelay - задержка по времени
 * @returns {function}
 */
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

/**
 * @description Функция поиска шаблона на странице
 * @param {HTMLElement} parent - блок в котором ищем шаблон
 * @param {string} templateId - id шаблона
 * @param {string} elementClass - класс секции внутри шаблона
 * @returns {HTMLElement}
 */
const getTemplateElement = (parent, templateId, elementClass) => parent.querySelector(`#${templateId}`).content.querySelector(`.${elementClass}`);

export { isEscapeKey, checkStringMaxLength, getRandomIntInclusive, getRandomArrayElement, getNextRandomInt, debounce, randomIntegersBetweenRange, getTemplateElement };
