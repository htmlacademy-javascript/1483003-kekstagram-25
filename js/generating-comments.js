import {getRandomIntInclusive, getRandomArrayElement, getNextRandomInt} from './util.js';

const USER_COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const USER_NAMES = [
  'Аделаида',
  'Августин',
  'Венера',
  'Вилен',
  'Добрыня',
  'Бронислава',
  'Гертруда',
  'Родион',
  'Инга',
  'Иннокентий',
  'Устинья',
];

const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const POSITIVE_INTEGER = 3;
const MAX_POSITIVE_INTEGER = 2;

const getNextCommentId = () => getNextRandomInt(POSITIVE_INTEGER, MAX_POSITIVE_INTEGER);

// Функция получения списка комментариев

const makeComment = () => ({
  id: getNextCommentId(),
  avatar: `img/avatar-${getRandomIntInclusive(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(USER_COMMENTS),
  name: getRandomArrayElement(USER_NAMES),
});

export {makeComment};
