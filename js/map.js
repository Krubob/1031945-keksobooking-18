'use strict';

(function () {

  window.pinsArr = [];

  // создаем функцию для отрисовки параметров пинов
  window.renderPin = function (pins) {
    var pinElement = window.dom.similarPinTemplate.cloneNode(true);
    var locationX = pins.location.x;
    var locationY = pins.location.y;
    pinElement.querySelector('img').src = pins.author.avatar;
    pinElement.querySelector('img').alt = pins.offer.title;
    pinElement.style = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';
    return pinElement;
  };

  window.updatePins = function () {
    window.pinsArr.filter(function () {
      // запишем алгоритм фильтрации в теле функции
      window.fragment = document.createDocumentFragment();
      for (var i = 0; i < 5; i++) {
        window.fragment.appendChild(window.renderPin(window.pinsArr[i]));
      }
    });
    window.dom.similarPins.appendChild(window.fragment);
  };

  // добавляем обработчик успешной загрузки в отдельную переменную и отрисовываем пины на карте
  window.successHandler = function (data) {
    window.pinsArr = data;
    window.updatePins();
  };

  // добавляем обработчик ошибки в отдельную переменную и отрисовываем сообщение об ошибке в dom-элемент
  window.errorHandler = function () {
    var error = window.dom.errorWindow;
    window.dom.mapElement.appendChild(error);
  };

})();
