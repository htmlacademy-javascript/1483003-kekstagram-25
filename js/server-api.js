import { showAlertMessage } from './message-upload-popup.js';

/**
 * @description Получение данных от сервера
 * @param {array} renderFunction
 */
const getDataFromServer = (renderFunction) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((posts) =>
      renderFunction(posts))
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
    'https://25.javascript.pages.academy/kekstagram',
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

