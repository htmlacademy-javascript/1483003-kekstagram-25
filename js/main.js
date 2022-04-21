import { getDataFromServer } from './server-api.js';
import { initPostsFilter, disableFilterPosts } from './posts-filter.js';
import { renderUsersPosts } from './rendering-random-user-posts.js';
import './upload-image.js';
import './form-validation.js';

disableFilterPosts();

getDataFromServer((posts) => {
  renderUsersPosts(posts);
  initPostsFilter(posts);
});
