'use strict';

(function () {

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

      window.dom.pinElem.style.top = (window.dom.pinElem.offsetTop - shift.y) + 'px';
      window.dom.pinElem.style.left = (window.dom.pinElem.offsetLeft - shift.x) + 'px';

      // console.log(window.dom.pinElem.offsetTop);
      // console.log(window.dom.pinElem.offsetLeft);

      window.dom.inputAddress.placeholder = (window.dom.pinElem.offsetLeft - shift.x) + 'px; ' + (window.dom.pinElem.offsetTop - shift.y) + 'px;';
      window.dom.inputAddress.value = (window.dom.pinElem.offsetLeft - shift.x) + 'px; ' + (window.dom.pinElem.offsetTop - shift.y) + 'px;';
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
