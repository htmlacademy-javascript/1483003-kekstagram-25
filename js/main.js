import { makeUserPosts } from './generating-posts.js';
import { renderUsersPosts } from './rendering-random-user-photos.js';
import './form-validation.js';

const userPosts = makeUserPosts();
renderUsersPosts(userPosts);
