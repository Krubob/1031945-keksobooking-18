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
  window.toActiveMode = function () {
    window.dom.mapElement.classList.remove('map--faded'); // активация карты
    window.dom.adFormElement.classList.remove('ad-form--disabled'); // активация формы
    window.dom.inputAddress.placeholder = window.pinCoordinates.pinActiveModeX() + 'px; ' + window.pinCoordinates.pinActiveModeY() + 'px;';
    window.dom.inputAddress.value = window.pinCoordinates.pinActiveModeX() + 'px; ' + window.pinCoordinates.pinActiveModeY() + 'px;';
    unblockSelect(window.dom.fieldsetForm); // разблокировка масиива полей создания объявления
    unblockSelect(window.dom.selectFilter); // разблокировка массива полей выбора фильтра объявлений
    window.dom.fieldsetFilter.disabled = false; // разблокировка полей фильтра объявлений
    window.backend.load(window.successHandler, window.errorHandler);
  };

  // переход в активное состояние при нажатии на метку
  window.dom.pinElem.addEventListener('mousedown', window.toActiveMode);
  // window.dom.pinElem.removeEventListener('mousedown', window.toActiveMode);

  // переход в активное состояние при нажатии на Enter
  window.dom.pinElem.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.toActiveMode();
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

  // создаем функцию для генерации начальных значений
  var init = function () {
    window.dom.inputAddress.placeholder = window.pinCoordinates.pinNoActiveModeX() + 'px; ' + window.pinCoordinates.pinNoActiveModeY() + 'px;'; // начальные координаты метки
    window.dom.inputAddress.value = window.pinCoordinates.pinNoActiveModeX() + 'px; ' + window.pinCoordinates.pinNoActiveModeY() + 'px;';
    blockSelect(window.dom.fieldsetForm); // блокировка масиива полей создания объявления
    blockSelect(window.dom.selectFilter); // блокировка массива полей выбора фильтра объявлений
    window.dom.fieldsetFilter.disabled = true; // блокировка поля фильтра объявлений
    window.guestsNumber = window.dom.guestsNumberSelect;
    window.roomsNumber = window.dom.roomsNumberSelect;
    window.houseType = window.dom.houseTypeSelect;
    window.timein = window.dom.timeinSelect;
    window.timeout = window.dom.timeoutSelect;
    attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [2]); // начальное состояние select для количества гостей
    attachAttrDisabled([window.timeout[0], window.timeout[1], window.timeout[2]], [0]);
    window.guestsNumber[2].selected = true;
    window.dom.housePrice.placeholder = '1000';
  };
  init();

  // создаем обработчик события на изменения select в форме и синхронизируем варианты выбора кол-ва комнат и гостей
  window.roomsNumber.addEventListener('change', function () {
    var valueOpt = window.roomsNumber.value;
    if (valueOpt === '1') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [2]);
    } else if (valueOpt === '2') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [1, 2]);
    } else if (valueOpt === '3') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [0, 1, 2]);
    } else if (valueOpt === '100') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [3]);
    } else {
      window.roomsNumber.setCustomValidity('');
    }
  });

  // -//- синхронизируем варианты выбора типа жилья и его стоимости
  window.houseType.addEventListener('change', function () {
    var valueOpt = window.houseType.value;
    if (valueOpt === 'bungalo') {
      window.dom.housePrice.min = '0';
      window.dom.housePrice.placeholder = '0';
    } else if (valueOpt === 'flat') {
      window.dom.housePrice.min = '1000';
      window.dom.housePrice.placeholder = '1000';
    } else if (valueOpt === 'house') {
      window.dom.housePrice.min = '5000';
      window.dom.housePrice.placeholder = '5000';
    } else if (valueOpt === 'palace') {
      window.dom.housePrice.min = '10000';
      window.dom.housePrice.placeholder = '10000';
    } else {
      window.houseType.setCustomValidity('');
    }
  });

  // -//- синхронизируем варианты выбора времени заезда и выезда
  window.timein.addEventListener('change', function () {
    var valueOpt = window.timein.value;
    if (valueOpt === '12:00') {
      attachAttrDisabled([window.timeout[0], window.timeout[1], window.timeout[2]], [0]);
    } else if (valueOpt === '13:00') {
      attachAttrDisabled([window.timeout[0], window.timeout[1], window.timeout[2]], [1]);
    } else if (valueOpt === '14:00') {
      attachAttrDisabled([window.timeout[0], window.timeout[1], window.timeout[2]], [2]);
    } else {
      window.timein.setCustomValidity('');
    }
  });

  // вывод сообщения об успешной отправки
  window.dom.submitForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.dom.mapElement.appendChild(window.dom.successWindow);
  });

})();
