'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var adFormElement = document.querySelector('.ad-form');
  var fieldsetFilter = document.querySelector('.map__filters-container').querySelector('fieldset');
  var selectFilter = document.querySelector('.map__filters-container').querySelectorAll('select');
  var fieldsetForm = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var housePrice = document.querySelector('#price');
  var noticeElement = document.querySelector('.notice');
  var successWindow = document.querySelector('#success').content.querySelector('.success');
  var submitForm = document.querySelector('.ad-form');
  window.inputAddress = document.querySelector('#address');
  window.preview = document.querySelector('.ad-form-header__preview').querySelector('img');

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
    mapElement.classList.remove('map--faded'); // активация карты
    adFormElement.classList.remove('ad-form--disabled'); // активация формы
    window.inputAddress.placeholder = window.coordPinMode.actModeX + ' ' + window.coordPinMode.actModeY;
    window.inputAddress.value = window.coordPinMode.actModeX + ' ' + window.coordPinMode.actModeY;
    unblockSelect(fieldsetForm); // разблокировка масиива полей создания объявления
    unblockSelect(selectFilter); // разблокировка массива полей выбора фильтра объявлений
    fieldsetFilter.disabled = false; // разблокировка полей фильтра объявлений
    window.load.startLoad(window.successHandler, window.errorHandler);
  };

  // переход в активное состояние при нажатии на метку
  window.pinElem.addEventListener('mousedown', window.toActiveMode);


  // переход в активное состояние при нажатии на Enter
  window.pinElem.addEventListener('keydown', function (evt) {
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
    window.pinElem.style.left = window.pinElem.offsetLeft + 'px';
    window.pinElem.style.top = window.pinElem.offsetTop + 'px';
    window.inputAddress.placeholder = window.coordPinMode.noActModeX + ' ' + window.coordPinMode.noActModeY; // начальные координаты метки
    window.inputAddress.value = window.coordPinMode.noActModeX + ' ' + window.coordPinMode.noActModeY; // -//-
    blockSelect(fieldsetForm); // блокировка масиива полей создания объявления
    blockSelect(selectFilter); // блокировка массива полей выбора фильтра объявлений
    fieldsetFilter.disabled = true; // блокировка поля фильтра объявлений
    window.guestsNumber = document.querySelector('#capacity');
    window.roomsNumber = document.querySelector('#room_number');
    window.houseType = document.querySelector('#type');
    window.timein = document.querySelector('#timein');
    window.timeout = document.querySelector('#timeout');
    window.houseTypePrice = document.querySelector('#price');
    attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [2]); // начальное состояние select для количества гостей
    attachAttrDisabled([window.timeout[0], window.timeout[1], window.timeout[2]], [0]);
    window.guestsNumber[2].selected = true;
    housePrice.placeholder = '1000';
  };
  init();

  // создаем обработчик события на изменения select в форме и синхронизируем варианты выбора кол-ва комнат и гостей
  window.roomsNumber.addEventListener('change', function () {
    var valueOpt = window.roomsNumber.value;
    if (valueOpt === '1') {
      window.guestsNumber[2].selected = true;
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [2]);
    } else if (valueOpt === '2') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [1, 2]);
      window.guestsNumber[1].selected = true;
    } else if (valueOpt === '3') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [0, 1, 2]);
      window.guestsNumber[0].selected = true;
    } else if (valueOpt === '100') {
      attachAttrDisabled([window.guestsNumber[0], window.guestsNumber[1], window.guestsNumber[2], window.guestsNumber[3]], [3]);
      window.guestsNumber[3].selected = true;
    } else {
      window.roomsNumber.setCustomValidity('');
    }
  });

  // -//- синхронизируем варианты выбора типа жилья и его стоимости
  window.houseType.addEventListener('change', function () {
    var valueOpt = window.houseType.value;
    if (valueOpt === 'bungalo') {
      housePrice.min = '0';
      housePrice.placeholder = '0';
    } else if (valueOpt === 'flat') {
      housePrice.min = '1000';
      housePrice.placeholder = '1000';
    } else if (valueOpt === 'house') {
      housePrice.min = '5000';
      housePrice.placeholder = '5000';
    } else if (valueOpt === 'palace') {
      housePrice.min = '10000';
      housePrice.placeholder = '10000';
    } else {
      window.houseType.setCustomValidity('');
    }
  });

  window.houseTypePrice.addEventListener('input', function (evt) {
    var valueOpt = window.houseType.value;
    var target = evt.target;
    if (valueOpt === 'bungalo' && target.value !== '0') {
      target.setCustomValidity('Цена за ночь должна быть равна 0 руб.');
    } else if (valueOpt === 'flat' && target.value !== '1000') {
      target.setCustomValidity('Цена за ночь должна быть равна 1000 руб.');
    } else if (valueOpt === 'house' && target.value !== '5000') {
      target.setCustomValidity('Цена за ночь должна быть равна 5000 руб.');
    } else if (valueOpt === 'palace' && target.value !== '10000') {
      target.setCustomValidity('Цена за ночь должна быть равна 10000 руб.');
    } else {
      target.setCustomValidity('');
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

  // подписываемся на событие отправки формы
  submitForm.addEventListener('submit', function (evtSub) {
    evtSub.preventDefault();
    mapElement.appendChild(successWindow); // вывод сообщения об успешной отправке
    window.upload.startUpload(new FormData(submitForm), function () {

      // возвращаем метку в исходное состояние
      window.pinElem.style.left = window.startCoords.x + 'px';
      window.pinElem.style.top = window.startCoords.y + 'px';

      window.closePopups(); // закрываем карточку открытыго объявления
      window.toActiveMode();
      recoverFormData();// вызываем функцию для очистки заполненных полей
      window.preview.src = 'img/muffin-grey.svg';

      // подписываемся на нажатие Esc для закрытия сообщения об успешной отправке
      document.addEventListener('keydown', function (evt) {
        evt.preventDefault();
        if (evt.keyCode === window.ESC_KEYCODE) {
          document.querySelector('.map').querySelector('.success').classList.add('hidden');
        }
      });

      // подписываемся на клик мышью для закрытия сообщения об успешной отправке
      document.querySelector('.map').querySelector('.success').addEventListener('click', function (evt) {
        evt.preventDefault();
        document.querySelector('.map').querySelector('.success').classList.add('hidden');
      });

    });
  });

  // создаем функцию для очистки заполненных полей
  var recoverFormData = function () {
    // clearing inputs
    var inputs = noticeElement.getElementsByTagName('input');
    for (var m = 0; m < inputs.length; m++) {
      switch (inputs[m].type) {
        case 'text':
        case 'number':
        case 'file':
          inputs[m].value = '';
          break;
        case 'radio':
        case 'checkbox':
          inputs[m].checked = false;
      }
    }
    // clearing selects
    var selects = noticeElement.getElementsByTagName('select');
    for (var k = 0; k < selects.length; k++) {
      switch (selects[k].id) {
        case 'type':
          selects[k].selectedIndex = 1;
          break;
        case 'room_number':
          selects[k].selectedIndex = 0;
          break;
        case 'capacity':
          selects[k].selectedIndex = 2;
          break;
        case 'timein':
        case 'timeout':
          selects[k].selectedIndex = 0;
          selects[k].selectedIndex = 0;
      }
    }

    // clearing textarea
    var text = noticeElement.getElementsByTagName('textarea');
    for (var i = 0; i < text.length; i++) {
      text[i].value = '';
    }
  };

})();
