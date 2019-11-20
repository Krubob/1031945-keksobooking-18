'use strict';
(function () {

  var housingType = document.querySelector('.map__filters-container').querySelector('#housing-type');
  var housingPrice = document.querySelector('.map__filters-container').querySelector('#housing-price');
  var housingRooms = document.querySelector('.map__filters-container').querySelector('#housing-rooms');
  var housingGuests = document.querySelector('.map__filters-container').querySelector('#housing-guests');
  var housingFeatures = document.querySelector('.map__filters-container').querySelector('#housing-features');

  window.removePins = function () {
    var arrayPins = window.similarPins.querySelectorAll('.map__pin:not(.map__pin--main)'); // записываем все dom-элементы в псевдомассив
    arrayPins.forEach(function (elem) {
      elem.remove();
    });
  };

  window.removeCards = function () {
    var arrayPopups = document.querySelectorAll('.map__card'); // записываем все dom-элементы в псевдомассив
    arrayPopups.forEach(function (elem) {
      elem.remove();
    });
  };

  window.renderFiltered = function () {
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex(); // добавляем новые индексы
      window.getCard(); // добавляем синхронизацию клика по пину и открытия нужного объявления
      window.toCloseCard();
    }
  };

  window.filterTypes = function () {
    housingType.addEventListener('change', function () {
      var valueOpt = housingType.value;
      window.removePins();
      window.removeCards();
      window.closePopups();
      if (valueOpt === 'any') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.type;
        });
      } else if (valueOpt === 'flat') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.type === 'flat';
        });
      } else if (valueOpt === 'house') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.type === 'house';
        });
      } else if (valueOpt === 'bungalo') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.type === 'bungalo';
        });
      } else if (valueOpt === 'palace') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.type === 'palace';
        });
      }
      window.renderFiltered();
    });
  };

  window.filterPrices = function () {
    housingPrice.addEventListener('change', function () {
      var valueOpt = housingPrice.value;
      window.removePins();
      window.removeCards();
      window.closePopups();
      if (valueOpt === 'any') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.price;
        });
      } else if (valueOpt === 'middle') {
        window.elementsFiltered = window.data.filter(function (element) {
          if (element.offer.price >= 10000 && element.offer.price <= 50000) {
            return element.offer.price;
          } return false;
        });
      } else if (valueOpt === 'low') {
        window.elementsFiltered = window.data.filter(function (element) {
          if (element.offer.price <= 10000) {
            return element.offer.price;
          } return false;
        });
      } else if (valueOpt === 'high') {
        window.elementsFiltered = window.data.filter(function (element) {
          if (element.offer.price <= 50000) {
            return element.offer.price;
          } return false;
        });
      }
      window.renderFiltered();
    });
  };

  window.filterRooms = function () {
    housingRooms.addEventListener('change', function () {
      var valueOpt = housingRooms.value;
      window.removePins();
      window.removeCards();
      window.closePopups();
      if (valueOpt === 'any') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.rooms;
        });
      } else if (valueOpt === '1') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.rooms === 1;
        });
      } else if (valueOpt === '2') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.rooms === 2;
        });
      } else if (valueOpt === '3') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.rooms === 3;
        });
      }
      window.renderFiltered();
    });
  };

  window.filterGuests = function () {
    housingGuests.addEventListener('change', function () {
      var valueOpt = housingGuests.value;
      window.removePins();
      window.removeCards();
      window.closePopups();
      if (valueOpt === 'any') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.guests;
        });
      } else if (valueOpt === '2') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.guests === 2;
        });
      } else if (valueOpt === '1') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.guests === 1;
        });
      } else if (valueOpt === '0') {
        window.elementsFiltered = window.data.filter(function (element) {
          return element.offer.guests === 0;
        });
      }
      window.renderFiltered();
    });
  };

  window.filterFeatures = function () {
    var checkboxes = housingFeatures.querySelectorAll('input'); // записываем в псевдомассив все найденные чекбоксы из блока дополнительных услуг
    var checkboxesArr = Array.from(checkboxes); // преобразуем псевдомассив в массив
    // создаем обработчик события на изменение чекбоксов
    housingFeatures.addEventListener('change', function () {
      window.removePins();
      window.removeCards();
      window.closePopups();
      var checkboxesFiltered = checkboxesArr.filter(function (element) { // записываем в массив checkboxesFiltered отмеченные чекбоксы
        return element.checked;
      });
      var valuesOfCheckbox = []; // записываем в пустой массив значения value отмеченных чекбокосов
      for (var j = 0; j < checkboxesFiltered.length; j++) {
        valuesOfCheckbox.push(checkboxesFiltered[j].value);
      }
      window.elementsFiltered = window.data.filter(function (element) { // создаем функцию для сравнения массивов с данными и массива valuesOfCheckbox
        for (var k = 0; k < element.offer.features.length; k++) {
          for (var m = 0; m < valuesOfCheckbox.length; m++) {
            if (element.offer.features[k] === valuesOfCheckbox[m]) { // если массивы совпадают
              return element.offer.features; // возвращаем соотв. пины
            }
          }
        } return false;
      });
      window.debounce(window.renderFiltered);
    });
  };

})();
