'use strict';
(function () {

  window.removePins = function () {
    var arrayPins = window.dom.similarPins.querySelectorAll('.map__pin:not(.map__pin--main)'); // записываем все dom-элементы в псевдомассив
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

  // window.filterType = function () {
  window.dom.housingType.addEventListener('change', function () {
    var valueOpt = window.dom.housingType.value;
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
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.dom.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.dom.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex();
      window.getCard();
    }
  });
  // };
  window.dom.housingPrice.addEventListener('change', function () {
    var valueOpt = window.dom.housingPrice.value;
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
        }
      });
    } else if (valueOpt === 'low') {
      window.elementsFiltered = window.data.filter(function (element) {
        if (element.offer.price <= 10000) {
          return element.offer.price;
        }
      });
    } else if (valueOpt === 'high') {
      window.elementsFiltered = window.data.filter(function (element) {
        if (element.offer.price >= 50000) {
          return element.offer.price;
        }
      });
    }
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.dom.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.dom.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex();
      window.getCard();
    }
  });

  window.dom.housingRooms.addEventListener('change', function () {
    var valueOpt = window.dom.housingRooms.value;
    console.log(valueOpt);
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
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.dom.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.dom.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex();
      window.getCard();
    }
  });

  window.dom.housingGuests.addEventListener('change', function () {
    var valueOpt = window.dom.housingGuests.value;
    console.log(valueOpt);
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
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.dom.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.dom.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex();
      window.getCard();
    }
  });

  window.dom.housingGuests.addEventListener('change', function () {
    var valueOpt = window.dom.housingGuests.value;
    console.log(valueOpt);
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
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.dom.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.dom.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex();
      window.getCard();
    }
  });

  var checkboxes = window.dom.housingFeatures.querySelectorAll('input');
  var checkboxesArr = Array.from(checkboxes);
  // console.log(checkbox);

  window.dom.housingFeatures.addEventListener('change', function (evt) {
    window.removePins();
    window.removeCards();
    window.closePopups();

    var checkboxesFiltered = checkboxesArr.filter(function (element) {
      return element.checked;
    });
    // console.log(checkboxesFiltered);

    var valuesOfCheckbox = [];
    for (var j = 0; j < checkboxesFiltered.length; j++) {
      valuesOfCheckbox.push(checkboxesFiltered[j].value);
    }
    console.log(valuesOfCheckbox);

    window.elementsFiltered = window.data.filter(function (element) {
      for (var k = 0; k < element.offer.features.length; k++) {
        for (var m = 0; m < valuesOfCheckbox.length; m++) {
          return element.offer.features[k] === valuesOfCheckbox[m];
        }
      }
    });
    for (var i = 0; i < window.PINS_NUMBER; i++) {
      window.dom.similarPins.appendChild(window.renderPin(window.elementsFiltered[i]));
      window.dom.similarPins.appendChild(window.renderCard(window.elementsFiltered[i]));
      window.addValueIndex();
      window.getCard();
    }
  });

})();
