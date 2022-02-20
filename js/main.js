// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// Функция, возвращающая случайное целое число из переданного диапазона включительно

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min); // Округление вверх до ближайшего большего целого
  max = Math.floor(max); // Округление вниз до ближайшего меньшего целого
  if (min > max || min === max) {
    return ('Значение «min» не должно быть больше или равно «max»');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

getRandomIntInclusive(10, 50);


// Функция для проверки максимальной длины строки

function checkStringLength(checkedString, maxLength) {
  return checkedString.length <= maxLength;
}

checkStringLength('Привет', 5);
