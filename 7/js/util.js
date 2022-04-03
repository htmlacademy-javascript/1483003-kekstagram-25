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

checkStringMaxLength('Привет', 10);

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

// Получение целого неповторяющегося числа

const getNextRandomInt = (startNumber = 1, maxStep = 1) => {
  let currentNumber = startNumber;
  return () => {
    const resultNumber = currentNumber;
    currentNumber += getRandomIntInclusive(1, maxStep);
    return resultNumber;
  };
};

export {isEscapeKey, getRandomIntInclusive, getRandomArrayElement, getNextRandomInt};
