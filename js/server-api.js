import { showAlertMessage } from './message-upload-popup.js';

const API_URL = 'https://25.javascript.pages.academy/kekstagram';

/**
 * @description Получение данных от сервера
 * @param {function} renderFunction
 */
const getDataFromServer = (onSuccess) => {
  fetch(`${API_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((posts) => {
      onSuccess(posts);
    })
    .catch(() => {
      showAlertMessage('Не удалось загрузить данные с сервера');
    });
};

/**
 * @description Отправка данных на сервер
 * @param {HTMLElement} formData
 * @param {function} onSuccess
 * @param {function} onError
 */
const sendDataToServer = (formData, onSuccess, onError) => {
  fetch(
    API_URL,
    {
      method: 'POST',
      body: formData,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        return;
      }
      onError();
    })
    .catch(() => onError());
};

export { getDataFromServer, sendDataToServer };

