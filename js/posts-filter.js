import { renderUsersPosts } from './rendering-random-user-posts.js';
import { debounce, randomIntegersBetweenRange } from './util.js';

const POST_MAX_COUNT = 10;
const RERENDER_DELAY = 500;

/**
 * Контейнер с постами
 */
const postsContainer = document.querySelector('.pictures');
/**
 * Секция с кнопками для фильтрации постов пользователей
 */
const imgFiltersSection = document.querySelector('.img-filters');
/**
 * Форма с кнопками для фильтрации постов пользователей
 */
const imgFiltersForm = imgFiltersSection.querySelector('.img-filters__form');
/**
 * Кнопки фильтрации постов
 */
const filterButton = imgFiltersSection.querySelectorAll('.img-filters__button');

const showFilterPosts = () => {
  imgFiltersSection.classList.remove('img-filters--inactive');
  imgFiltersSection.classList.add('img-filters--active');
};

/**
 * Блокировка кнопок фильтрации при незагруженных данных
 */
const disableFilterPosts = () => {
  filterButton.forEach((button) => {
    button.disabled = true;
  });
};

/**
 * Разблокировка кнопок при успешной загрузки
 */
const enableFilterPosts = () => {
  filterButton.forEach((button) => {
    button.disabled = false;
  });
};

/**
 * @description Функция возвращает посты пользователей в таком порядке, в каком они пришли с сервера
 * @param {array} userPosts
 * @returns {array}
 */
const filterPostsDefault = (userPosts) => userPosts;

/**
 * @description Функция сортировки постов пользователей по количеству комментариев (самые обсуждаемые в начале)
 * @param {array} userPosts
 * @returns {array}
 */
const filterPostsDiscuss = (userPosts) => userPosts.slice().sort((commentA, commentB) => commentB.comments.length - commentA.comments.length);

/**
 * @description Функция отрисовки 10-ти случайных, не повторяющихся постов пользователей
 * @param {array} posts
 * @param {number} maxCount
 * @returns {array}
 */
const filterPostsRandom = (posts, maxCount) => {
  const startIndex = 0;
  const lastIndex = posts.length - 1;
  const elementsCount = Math.min(posts.length, maxCount);
  const randomPostsIndexes = randomIntegersBetweenRange(startIndex, lastIndex, elementsCount);
  return randomPostsIndexes.map((index) => posts[index]);
};

/**
 * @description Функция добавления/удаления классов
 * @param {string} filterName
 */
const changeFilterClassName = (filterName) => {
  document.querySelectorAll('.img-filters__button').forEach((element) => element.classList.remove('img-filters__button--active'));
  document.querySelector(`#${filterName}`).classList.add('img-filters__button--active');
};

const clearOldPosts = () => {
  const posts = postsContainer.querySelectorAll('.picture');

  posts.forEach((post) => {
    post.remove();
  });
};

const postFilterChange = debounce((evt, userPosts) => {
  if (!evt.target.classList.contains('img-filters__button')) {
    return;
  }
  const filter = evt.target.id;

  clearOldPosts();

  switch (filter) {
    case 'filter-discussed':
      changeFilterClassName(filter);
      renderUsersPosts(filterPostsDiscuss(userPosts));
      break;
    case 'filter-random':
      changeFilterClassName(filter);
      renderUsersPosts(filterPostsRandom(userPosts, POST_MAX_COUNT));
      break;
    case 'filter-default':
      changeFilterClassName(filter);
      renderUsersPosts(filterPostsDefault(userPosts));
      break;
  }
}, RERENDER_DELAY);

const initPostsFilter = (userPosts) => {
  imgFiltersForm.addEventListener('click', (evt) => postFilterChange(evt, userPosts));
  showFilterPosts();
  enableFilterPosts();
};

export { initPostsFilter, disableFilterPosts };

