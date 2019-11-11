'use strict';

(function () {

  // создаем объект для хранения координат пина
  window.pinCoordinates = {
    pinTop: window.dom.pinElem.offsetTop, // 375px координаты по вертикали верхней левой точки метки
    pinLeft: window.dom.pinElem.offsetLeft, // 570px координаты по горизонтали верхней левой точки
    pinHeightMuffin: window.getComputedStyle(window.dom.muffinElem, null).height, // 44px высота круглой метки
    pinWidthMuffin: window.getComputedStyle(window.dom.muffinElem, null).width, // 40px ширина круглой метки
    pinHeight: window.getComputedStyle(window.dom.pinElem, ':after').height, // 22px высота острого конца метки
    pinWidth: window.getComputedStyle(window.dom.pinElem, ':after').width, // 10px ширина острого конца метки
    pinNoActiveModeX: function () { // до активации в поле адрес записываем координаты центра метки
      var pinValueXY = (window.dom.pinElem.offsetLeft + 0.5 * parseInt(window.pinCoordinates.pinWidthMuffin, 10));
      return pinValueXY;
    },
    pinNoActiveModeY: function () { // до активации в поле адрес записываем координаты центра метки
      var pinValueXY = (window.dom.pinElem.offsetTop + 0.5 * parseInt(window.pinCoordinates.pinHeightMuffin, 10));
      return pinValueXY;
    },
    pinActiveModeX: function () { // после активации в поле адрес записываем координаты острого конца метки
      var pinValueXY = (window.dom.pinElem.offsetLeft + 0.5 * parseInt(window.pinCoordinates.pinWidthMuffin, 10));
      return pinValueXY;
    },
    pinActiveModeY: function () { // после активации в поле адрес записываем координаты острого конца метки
      var pinValueXY = (window.dom.pinElem.offsetTop + parseInt(window.pinCoordinates.pinHeightMuffin, 10) + parseInt(window.pinCoordinates.pinHeight, 10));
      return pinValueXY;
    }
  };

  // добавим обработчик события mousedown - начала перемещения пина
  window.dom.pinElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {// запоминаем начальные координаты
      x: evt.clientX,
      y: evt.clientY
    };
    var dragged = false;
    // при каждом движении мыши необходимо обновлять смещение относительно первоначальной точки
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {// величина смещения
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {// новые начальные координаты
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      // записываем координаты острого конца метки в поле атрибут style
      window.dom.pinElem.style.top = (window.dom.pinElem.offsetTop - shift.y) + 'px';
      window.dom.pinElem.style.left = (window.dom.pinElem.offsetLeft - shift.x) + 'px';
      // записываем координаты острого конца метки в поле адреса и плейсхолдер
      window.dom.inputAddress.placeholder = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      window.dom.inputAddress.value = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;

      console.log(window.dom.pinElem.style.top);
      console.log(window.dom.pinElem.style.left);

      if (window.dom.pinElem.style.top >= '630') {
        window.dom.pinElem.style.top = (1260 - window.dom.pinElem.offsetTop - shift.y) + 'px';
        window.dom.pinElem.style.left = (window.dom.pinElem.offsetLeft - shift.x) + 'px';
        window.dom.inputAddress.placeholder = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
        window.dom.inputAddress.value = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      } else if (window.dom.pinElem.style.top <= '130') {
        window.dom.pinElem.style.top = (260 - window.dom.pinElem.offsetTop - shift.y) + 'px';
        window.dom.pinElem.style.left = (window.dom.pinElem.offsetLeft - shift.x) + 'px';
        window.dom.inputAddress.placeholder = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
        window.dom.inputAddress.value = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      // } else if (window.dom.pinElem.style.left <= '0') {
      //   window.dom.pinElem.style.top = (window.dom.pinElem.offsetLeft + shift.y) + 'px';
      //   window.dom.pinElem.style.left = (0 - window.dom.pinElem.offsetLeft - shift.x) + 'px';
      //   window.dom.inputAddress.placeholder = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      //   window.dom.inputAddress.value = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      // } else if (window.dom.pinElem.style.left >= '1170') {
      //   window.dom.pinElem.style.top = (window.dom.pinElem.offsetLeft + shift.y) + 'px';
      //   window.dom.pinElem.style.left = (2340 - window.dom.pinElem.offsetLeft - shift.x) + 'px';
      //   window.dom.inputAddress.placeholder = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      //   window.dom.inputAddress.value = window.dom.pinElem.style.left + ' ' + window.dom.pinElem.style.top;
      // }
      }
    };
    // при отпускании кнопки мыши необходимо переставать слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function (evt) {
          evt.preventDefault();
          window.dom.pinElem.removeEventListener('click', onClickPreventDefault);
        };
        window.dom.pinElem.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove); // добавим обработчики события передвижения мыши
    document.addEventListener('mouseup', onMouseUp); // добавим обработчики события отпускания мыши
  });

})();
