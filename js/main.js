const POST_DESCRIPTIONS = [
  "Следуй за своим сердцем, но не забывай брать с собой мозг",
  "Мне нужен шестимесячный отпуск дважды в год",
  "Я на 99% ангел, но вот этот оставшийся 1%",
  "Никогда не отказывайся от своей мечты. Продолжай спать",
  "Если бы кто-то услышал мои мысли, то я был бы в психушке",
  "Как я себя чувствую без кофе экспрессо? Депрессо",
  "Жизнь коротка, поэтому улыбайтесь, пока есть возможность и зубы",
  "Хочу отправить свое фото в НАСА. Пусть увидят, что такое настоящая звезда",
  "Я пытался быть адекватным, но это были худшие две минуты моей жизни",
  "Умный человек решает проблемы, а мудрый в них старается не попадать",
  "Я не ленив, просто нахожусь в привычном для себя энергосберегающем режиме",
  "Не спеши взрослеть. Взросление – это ловушка",
  "Необязательно всем нравится. Не все люди имеют значение",
  "У меня доброе сердце, но вот язык…",
  "Мама учила не материться, а жизнь научила не материться при маме",
];

const USER_COMMENTS = [
  "Всё отлично!",
  "В целом всё неплохо. Но не всё.",
  "Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.",
  "Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.",
  "Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше",
  "Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!",
];

const USER_NAMES = [
  "Аделаида",
  "Августин",
  "Венера",
  "Вилен",
  "Добрыня",
  "Бронислава",
  "Гертруда",
  "Родион",
  "Инга",
  "Иннокентий",
  "Устинья",
];

const POSTS_PHOTO_COUNT = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

// https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function isNumber(val) {
  return typeof val === 'number';
}

function isPositiveMaxNumbers() {
  return Math.max(...arguments) > 0;
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

/**
 * @description Функция проверяет, что строка меньше или равна заданной длине
 * @param {string} string - проверяемая строка
 * @param {number} maxLength - максимальная длина
 * @return {boolean}
 */
const checkStringMaxLength = (string, maxLength) => string.length <= maxLength;

checkStringMaxLength('Привет', 10);

// Получение целого неповторяющегося числа

const getNextRandomInt = (startNumber = 1, maxStep = 1) => {
  let currentNumber = startNumber;
  return () => {
    const resultNumber = currentNumber;
    currentNumber += getRandomIntInclusive(1, maxStep);
    return resultNumber
  }
}

const getNextCommentId = getNextRandomInt(3, 2);

const getRandomArrayIndex = (elements) => {
  return getRandomIntInclusive(0, elements.length - 1)
};

// Функция получения списка комментариев

const makeComment = () => {
  return {
    id: getNextCommentId(),
    avatar: `img/avatar-${getRandomIntInclusive(1, 6)}.svg`,
    message: USER_COMMENTS[getRandomArrayIndex(USER_COMMENTS)],
    name: USER_NAMES[getRandomArrayIndex(USER_NAMES)],
  }
};

// Функция получения описания фотографии

const makePost = (_, index) => {
  const id = ++index;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: POST_DESCRIPTIONS[getRandomArrayIndex(POST_DESCRIPTIONS)],
    likes: getRandomIntInclusive(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomIntInclusive(1, 3) }, makeComment),
  }
}

const descriptionPhoto = Array.from({ length: POSTS_PHOTO_COUNT }, makePost);

console.log(descriptionPhoto);


