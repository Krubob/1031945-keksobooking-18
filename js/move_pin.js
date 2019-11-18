'use strict';

(function () {

  // создаем объект для хранения координат пина
  window.pinCoordinates = {
    pinTop: window.dom.pinElem.offsetTop, // 375px координаты по вертикали верхней левой точки метки
    pinLeft: window.dom.pinElem.offsetLeft, // 570px координаты по горизонтали верхней левой точки
    pinComputedStyle: window.getComputedStyle(window.dom.pinElem, null), // 44px высота круглой метки, 40px ширина круглой метки
    endOfPinComputedStyle: window.getComputedStyle(window.dom.pinElem, ':after'), // 22px высота острого конца метки, 10px ширина острого конца метки
    pinNoActiveModeX: function () { // до активации в поле адрес записываем координаты центра метки
      var pinValueX = (window.dom.pinElem.offsetLeft + 0.5 * parseInt(window.pinCoordinates.pinComputedStyle.height, 10));
      return pinValueX;
    },
    pinNoActiveModeY: function () { // до активации в поле адрес записываем координаты центра метки
      var pinValueY = (window.dom.pinElem.offsetTop + 0.5 * parseInt(window.pinCoordinates.pinComputedStyle.height, 10));
      return pinValueY;
    },
    pinActiveModeX: function () { // после активации в поле адрес записываем координаты острого конца метки
      var pinValueX = (window.dom.pinElem.offsetLeft + 0.5 * parseInt(window.pinCoordinates.endOfPinComputedStyle.width, 10));
      return pinValueX;
    },
    pinActiveModeY: function () { // после активации в поле адрес записываем координаты острого конца метки
      var pinValueY = (window.dom.pinElem.offsetTop + parseInt(window.pinCoordinates.pinComputedStyle.height, 10) + parseInt(window.pinCoordinates.endOfPinComputedStyle.height, 10));
      return pinValueY;
    }
  };
  // console.log(window.dom.pinElem.style.top);
  // console.log(window.dom.pinElem.style.left);

  // добавим обработчик события mousedown - начала перемещения пина
  window.dom.pinElem.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {// запоминаем начальные координаты
      x: evt.clientX,
      y: evt.clientY
    };

    // var mapWidth = window.getComputedStyle(document.querySelector('.map'), null).width; // 1200px
    // console.log(mapWidth);

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

      // добавляем ограничения на перемещение пина
      if (window.dom.pinElem.style.top <= '130') {
        window.dom.pinElem.style.top = 130 + 'px';
      } else if (window.dom.pinElem.style.top >= '630') {
        window.dom.pinElem.style.top = 630 + 'px';
      }
      // if (window.dom.pinElem.style.left >= '1170') {
      //   window.dom.pinElem.style.left = 1170 + 'px';
      // } else if (window.dom.pinElem.style.left <= '-32') {
      //   window.dom.pinElem.style.left = -32 + 'px';
      // }

      // console.log(window.dom.pinElem.style.top);
      // console.log(window.dom.pinElem.style.left);

      var pinLeft = window.dom.pinElem.offsetLeft - shift.x;
      var pinTop = window.dom.pinElem.offsetTop - shift.y;

      // записываем координаты острого конца метки в поле атрибут style
      window.dom.pinElem.style.left = pinLeft + 'px';
      window.dom.pinElem.style.top = pinTop + 'px';

      // записываем координаты острого конца метки в поле адреса и плейсхолдер
      window.dom.inputAddress.placeholder = pinLeft + ' ' + pinTop;
      window.dom.inputAddress.value = pinLeft + ' ' + pinTop;
    };

    // при отпускании кнопки мыши необходимо переставать слушать события движения мыши
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (dragged) {
        var onClickPreventDefault = function () {
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
