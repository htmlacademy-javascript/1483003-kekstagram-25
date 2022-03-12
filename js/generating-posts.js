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

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 6;

const POSTS_PHOTO_COUNT = 25;

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
