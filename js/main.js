import { makeUserPosts } from './generating-posts.js';
import { renderUsersPosts } from './rendering-random-user-photos.js';
import './changing-image-scale.js';
import './upload-image.js';
import './form-validation.js';
import './image-slider-effects.js';

const userPosts = makeUserPosts();
renderUsersPosts(userPosts);


