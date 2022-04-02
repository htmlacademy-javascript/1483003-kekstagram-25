import {getRandomIntInclusive, getRandomArrayElement} from './util.js';
import {makeComment} from './generating-comments.js';

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

const LIKES_MIN_QUANTITY = 15;
const LIKES_MAX_QUANTITY = 200;

const COMMENT_MIN_ID = 1;
const COMMENT_MAX_ID = 20;

const POSTS_PHOTO_COUNT = 25;

// Функция получения описания фотографии

const makePost = (_, index) => {
  const id = ++index;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(POST_DESCRIPTIONS),
    likes: getRandomIntInclusive(LIKES_MIN_QUANTITY, LIKES_MAX_QUANTITY),
    comments: Array.from({ length: getRandomIntInclusive(COMMENT_MIN_ID, COMMENT_MAX_ID) }, makeComment),
  };
};

const makeUserPosts = () => Array.from({ length: POSTS_PHOTO_COUNT }, makePost);

export {makeUserPosts};
