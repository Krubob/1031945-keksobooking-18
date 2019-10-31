'use strict';

(function () {

  window.backend = {
    load: function (onLoad, onError) {
      var URL = 'https://js.dump.academy/keksobooking/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.addEventListener('load', function () {
        if (xhr.status === 200) {
          onLoad(xhr.response);
        } else {
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
        }
      });

      xhr.addEventListener('error', function () {
        onError('Произошла ошибка');
      });

      xhr.addEventListener('timeout', function () {
        onError('Запрос не успел выполниться за ' + xhr.timeOut + 'мс');
      });
      xhr.timeout = 10000;

      xhr.open('GET', URL);
      xhr.send();
    }
  };

})();