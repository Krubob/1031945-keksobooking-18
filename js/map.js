'use strict';

(function () {

  // создаем функцию для отрисовки параметров пинов
  var renderPin = function (pins) {
    var pinElement = window.dom.similarPinTemplate.cloneNode(true);
    var locationX = pins.location.x;
    var locationY = pins.location.y;
    pinElement.querySelector('img').src = pins.author.avatar;
    pinElement.querySelector('img').alt = pins.offer.title;
    pinElement.style = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';
    return pinElement;
  };

  // добавляем обработчик успешной загрузки в отдельную переменную и вставляем параметры пинов
  window.successHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length - 1; i++) {
      fragment.appendChild(renderPin(pins[i]));
    }
    window.dom.similarPins.appendChild(fragment);
  };

  // добавляем обработчик ошибки в отдельную переменную и отрисовываем сообщение об ошибке в dom-элемент
  window.errorHandler = function () {
    var error = window.dom.errorWindow;
    window.dom.mapElement.appendChild(error);
  };

})();
