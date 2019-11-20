'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var mainPinComputedStyle = window.getComputedStyle(mainPin, null); // width-65px, height-65px
  var mainPinAfterComputedStyle = window.getComputedStyle(mainPin, ':after'); // width-10px, height-22px
  window.startCoords = {
    x: window.dom.pinElem.offsetLeft,
    y: window.dom.pinElem.offsetTop
  };

  var mainPinOffset = {
    x: Math.floor(parseInt(mainPinComputedStyle.width, 10) * 0.5),
    y: Math.floor(parseInt(mainPinComputedStyle.height, 10) + parseInt(mainPinAfterComputedStyle.height, 10)),
  };

  window.coordPinMode = {
    noActModeX: window.dom.pinElem.offsetLeft + Math.floor(parseInt(mainPinComputedStyle.width, 10) * 0.5),
    noActModeY: window.dom.pinElem.offsetTop + Math.floor(parseInt(mainPinComputedStyle.height, 10) * 0.5),
    actModeX: window.dom.pinElem.offsetLeft + Math.floor(parseInt(mainPinComputedStyle.width, 10) * 0.5),
    actModeY: window.dom.pinElem.offsetTop + Math.floor(parseInt(mainPinComputedStyle.height, 10) * 0.5 + parseInt(mainPinAfterComputedStyle.height, 10))
  };

  var container = document.querySelector('.map');
  var containerComputedStyle = window.getComputedStyle(container, null);

  // при каждом движении мыши необходимо обновлять смещение относительно первоначальной точки
  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    if (!mainPin.dragged) {
      return;
    }

    var сoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY,
    };

    window.newCoords = {
      x: сoords.x - mainPin.shift.x,
      y: сoords.y - mainPin.shift.y,
    };

    // console.log('newCoords', window.newCoords, mainPinOffset, containerComputedStyle.width);

    if (window.newCoords.x + mainPinOffset.x >= parseInt(containerComputedStyle.width, 10)
      || window.newCoords.x + mainPinOffset.x <= 0
      || window.newCoords.y + mainPinOffset.y <= 130
      || window.newCoords.y + mainPinOffset.y >= 630) {
      return;
    }

    mainPin.style.top = window.newCoords.y + 'px';
    mainPin.style.left = window.newCoords.x + 'px';
    window.dom.inputAddress.placeholder = window.newCoords.x + ' ' + window.newCoords.y;
    window.dom.inputAddress.value = window.newCoords.x + ' ' + window.newCoords.y;
  };

  // при отпускании кнопки мыши необходимо переставать слушать события движения мыши
  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);

    mainPin.dragged = false;
  };

  // добавим обработчик события mousedown - начала перемещения пина
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var shift = {
      x: evt.clientX - mainPin.offsetLeft,
      y: evt.clientY - mainPin.offsetTop,
    };

    mainPin.shift = shift;
    mainPin.dragged = true;

    document.addEventListener('mousemove', onMouseMove); // добавим обработчики события передвижения мыши
    document.addEventListener('mouseup', onMouseUp); // добавим обработчики события отпускания мыши
  });

})();
