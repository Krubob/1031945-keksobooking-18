'use strict';

(function () {

  // создаем функцию для присваивания атрибута disabled массиву
  var blockSelect = function (array) {
    for (var j = 0; j < array.length; j++) {
      array[j].disabled = true; // блокировка полей создания объявления
    }
  };

  // создаем функцию для удаления атрибута disabled массиву
  var unblockSelect = function (array) {
    for (var j = 0; j < array.length; j++) {
      array[j].disabled = false; // разблокировка полей создания объявления
    }
  };

  // создаем функцию, которая делает доступными элементы страницы при её активации
  var toActiveMode = function () {
    window.dom.mapElement.classList.remove('map--faded'); // активация карты
    window.dom.inputAddress.placeholder = window.pin.pinActiveMode(); // координаты метки после активации карты
    window.dom.adFormElement.classList.remove('ad-form--disabled'); // активация формы
    unblockSelect(window.dom.fieldsetForm); // разблокировка масиива полей создания объявления
    unblockSelect(window.dom.selectFilter); // разблокировка массива полей выбора фильтра объявлений
    window.dom.fieldsetFilter.disabled = false; // разблокировка полей фильтра объявлений
  };

  // переход в активное состояние при нажатии на метку
  window.dom.pinElem.addEventListener('mousedown', function () {
    toActiveMode();
  });

  // переход в активное состояние при нажатии на Enter
  window.dom.pinElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      toActiveMode();
    }
  });

  // создаем функцию для присваивания атрибута disabled элементам массива
  var attachAttrDisabled = function (array, exceptionArr) {
    array.forEach(function (elem, index) {
      if (exceptionArr.indexOf(index) > -1) {
        elem.disabled = false;
      } else {
        elem.disabled = true;
      }
    });
  };

  // создаем обработчик события на изменения select в форме и синхронизируем варианты выбора кол-ва комнат и гостей
  window.roomsNumber.addEventListener('change', function (evt) {
    var valueOpt = window.roomsNumber.value;
    if (valueOpt === '1') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [2]);
      window.roomsNumber.setCustomValidity('Все правильно'); // !!! <- не показывается резульат валидации
    } else if (valueOpt === '2') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [1, 2]);
    } else if (valueOpt === '3') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [0, 1, 2]);
    } else if (valueOpt === '100') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [3]);
    } else {
      evt.target.setCustomValidity('');
    }
  });

  // создаем функцию для генерации начальных значений
  var init = function () {
    window.dom.inputAddress.placeholder = window.pin.pinNoActiveMode(); // начальные координаты метки
    blockSelect(window.dom.fieldsetForm); // блокировка масиива полей создания объявления
    blockSelect(window.dom.selectFilter); // блокировка массива полей выбора фильтра объявлений
    window.dom.fieldsetFilter.disabled = true; // блокировка поля фильтра объявлений
    attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [2]); // начальное состояние select для количества гостей
  };
  init();
})();
