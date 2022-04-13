import {getRandomIntInclusive, getRandomArrayElement, getNextCommentId} from './util.js';

const POST_DESCRIPTIONS = [
  'Следуй за своим сердцем, но не забывай брать с собой мозг',
  'Мне нужен шестимесячный отпуск дважды в год',
  'Я на 99% ангел, но вот этот оставшийся 1%',
  'Никогда не отказывайся от своей мечты. Продолжай спать',
  'Если бы кто-то услышал мои мысли, то я был бы в психушке',
  'Как я себя чувствую без кофе экспрессо? Депрессо',
  'Жизнь коротка, поэтому улыбайтесь, пока есть возможность и зубы',
  'Хочу отправить свое фото в НАСА. Пусть увидят, что такое настоящая звезда',
  'Я пытался быть адекватным, но это были худшие две минуты моей жизни',
  'Умный человек решает проблемы, а мудрый в них старается не попадать',
  'Я не ленив, просто нахожусь в привычном для себя энергосберегающем режиме',
  'Не спеши взрослеть. Взросление – это ловушка',
  'Необязательно всем нравится. Не все люди имеют значение',
  'У меня доброе сердце, но вот язык…',
  'Мама учила не материться, а жизнь научила не материться при маме',
];

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

const POSTS_PHOTO_COUNT = 25;

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_AVATAR_ID = 1;
const MAX_AVATAR_ID = 6;

const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 6;

// Функция получения списка комментариев

const makeComment = () => ({
  id: getNextCommentId(),
  avatar: `img/avatar-${getRandomIntInclusive(MIN_AVATAR_ID, MAX_AVATAR_ID)}.svg`,
  message: getRandomArrayElement(USER_COMMENTS),
  name: getRandomArrayElement(USER_NAMES),
});

// Функция получения описания фотографии

const makePost = (_, index) => {
  const id = ++index;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomIntInclusive(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomIntInclusive(MIN_COMMENT_ID, MAX_COMMENT_ID) }, makeComment),
  };
};

const makeUserPosts = () => Array.from({ length: POSTS_PHOTO_COUNT }, makePost);

export {makeUserPosts};