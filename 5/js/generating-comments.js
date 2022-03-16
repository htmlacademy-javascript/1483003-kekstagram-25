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

const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;

const COMMENT_START_ID = 3;
const COMMENT_MAX_ID = 2;

const getNextCommentId = getNextRandomInt(COMMENT_START_ID, COMMENT_MAX_ID);

// Функция получения списка комментариев

const makeComment = () => ({
  id: getNextCommentId(),
  avatar: `img/avatar-${getRandomIntInclusive(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
  message: getRandomArrayElement(USER_COMMENTS),
  name: getRandomArrayElement(USER_NAMES),
});

export {makeComment};
