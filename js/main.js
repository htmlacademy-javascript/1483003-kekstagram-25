import { makeUserPosts } from './generating-posts.js';
import { renderUsersPosts } from './rendering-random-user-photos.js';

const UserPosts = makeUserPosts();
renderUsersPosts(UserPosts);
