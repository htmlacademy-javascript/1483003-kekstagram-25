// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function isNumber(val) {
  return typeof val === "number";
}

function isPositiveMaxNumbers() {
  return Math.max(...arguments) > 0
}

// Функция возвращающая случайное целое число из переданного диапазона включительно

function getRandomIntInclusive(from, to) {
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
}

getRandomIntInclusive(100, 50);

/**
 * @description Функция проверяет, что строка меньше или равна заданной длине
 * @param {string} string - проверяемая строка
 * @param {number} maxLength - максимальная длина
 * @return {boolean}
 */
const checkStringMaxLength = (string, maxLength) => string.length <= maxLength;

checkStringMaxLength("Привет", 10);
