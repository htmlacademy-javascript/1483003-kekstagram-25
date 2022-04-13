import { getDataFromServer } from './server-api.js';
import { renderUsersPosts } from './rendering-random-user-photos.js';
import './upload-image.js';
import './form-validation.js';

getDataFromServer(renderUsersPosts);


