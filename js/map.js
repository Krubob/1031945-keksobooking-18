'use strict';

(function () {

  // создаем функцию для отрисовки пина и его параметров
  var renderPin = function (pins) {
    var pinElement = window.dom.similarPinTemplate.cloneNode(true);

    var locationX = pins.location.x;
    var locationY = pins.location.y;
    pinElement.querySelector('img').src = pins.author.avatar;
    pinElement.querySelector('img').alt = pins.offer.title;
    pinElement.style = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';

    return pinElement;
  };

  // создаем функцию для отрисовки карточки объявления и ее параметров
  var renderCard = function (pins) {
    var cardElement = window.dom.similarCardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').innerHTML = pins.offer.title;
    cardElement.querySelector('.popup__text--address').innerHTML = pins.offer.address;
    cardElement.querySelector('.popup__text--price').innerHTML = pins.offer.price + '₽/ночь';
    if (pins.offer.type === 'flat') {
      cardElement.querySelector('.popup__type').innerHTML = 'Квартира';
    } else if (pins.offer.type === 'bungalo') {
      cardElement.querySelector('.popup__type').innerHTML = 'Бунгало';
    } else if (pins.offer.type === 'house') {
      cardElement.querySelector('.popup__type').innerHTML = 'Дом';
    } else if (pins.offer.type === 'palace') {
      cardElement.querySelector('.popup__type').innerHTML = 'Дворец';
    }
    cardElement.querySelector('.popup__text--capacity').innerHTML = pins.offer.rooms + ' комната для' + ' ' + pins.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').innerHTML = 'Заезд после ' + pins.offer.checkin + ', выезд до ' + pins.offer.checkout;
    cardElement.querySelector('.popup__feature').innerHTML = pins.offer.features;
    cardElement.querySelector('.popup__description').innerHTML = pins.offer.description;
    cardElement.querySelector('.popup__avatar').src = pins.author.avatar;
    var createPhoto = function () {
      for (var k = 0; k < pins.offer.photos.length; k++) {
        var photoElement = window.dom.similarCardTemplate.querySelector('.popup__photo').cloneNode(true);

        cardElement.querySelector('.popup__photos').append(photoElement);
        cardElement.querySelector('.popup__photos').querySelectorAll('img')[k].src = pins.offer.photos[k];
      }
      cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos').lastChild);
      return photoElement;
    };
    createPhoto();

    cardElement.classList.add('hidden'); // по умолчанию все объявления скрыты
    return cardElement;
  };

  // добавляем обработчик успешной загрузки в отдельную переменную и вставляем параметры пинов
  window.successHandler = function (pins) {
    var fragment = document.createDocumentFragment();
    var fragmentExtr = document.createDocumentFragment();

    for (var i = 0; i < PINS_NUMBER; i++) {
      fragment.appendChild(renderPin(pins[i]));
      fragment.appendChild(renderCard(pins[i]));
    }

    window.dom.similarPins.appendChild(fragment);
    window.dom.mapFiltersContainer.before(fragmentExtr);

    addValueIndex();
    toCloseCard();
    toOpenCard();
    getCard();
  };

  // создаем функцию для добавляения каждому пину атрибута value
  // и присваиваем ему порядковый номер index
  var addValueIndex = function () {
    var pinsChosen = document.querySelector('.map__pins').querySelectorAll('.map__pin:not(.map__pin--main)');
    pinsChosen.forEach(function (elem, index) {
      elem.value = index;
    });
  };

  // создаем функцию для закрытия всех предудущих открытых окон
  window.closePopups = function () {
    var arrayPopups = document.querySelectorAll('.map__card'); // записываем все dom-элементы в псевдомассив
    arrayPopups.forEach(function (elem) {
      elem.classList.add('hidden');
    });
  };

  // создаем функцию, которая добавляет синхронизацию клика по пину и открытия нужного объявления
  var getCard = function () {
    window.dom.pinElem.removeEventListener('mousedown', window.toActiveMode);
    document.querySelector('.map__pins').addEventListener('click', function (evt) {
      var target = evt.target;
      var button = target.closest('button');
      var valuePin = button.value;
      var mapCards = document.querySelectorAll('.map__card');
      window.closePopups();
      mapCards[valuePin].classList.remove('hidden');
      console.log(button);
    });
  };

  // создаем функцию для открытия объявления по нажатию enter на пин
  var toOpenCard = function () {
    window.pins = document.querySelector('.map__pins').querySelectorAll('.map__pin');
    window.pins.forEach(function (element) {
      element.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          element.classList.remove('hidden');
          console.log('Button pin clicked');
        }
      });
    });
  };

  // создаем функцию для закрытия объявления
  var toCloseCard = function () {
    var cards = document.querySelector('.map__pins').querySelectorAll('.map__card');
    cards.forEach(function (element) {

      element.querySelector('.popup__close').addEventListener('click', function () {
        element.classList.add('hidden');
        console.log('Сlose button clicked');
      });

      element.querySelector('.popup__close').addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ENTER_KEYCODE) {
          element.querySelector('.map__card').classList.add('hidden');
          console.log('Enter button clicked');
        }
      });

      document.querySelector('.map').addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.ESC_KEYCODE) {
          element.classList.add('hidden');
          console.log('Esc button clicked');
        }
      });
    });
  };

  // добавляем обработчик ошибки в отдельную переменную и отрисовываем сообщение об ошибке в dom-элемент
  window.errorHandler = function () {
    var error = window.dom.errorWindow;
    window.dom.mapElement.appendChild(error);

    window.dom.mapElement.querySelector('.error__button').addEventListener('click', function () {
      window.dom.mapElement.querySelector('.error').classList.add('hidden');
      // console.log('Сlose button clicked');
    });

    document.addEventListener('keydown', function (evt) {
      evt.preventDefault();
      if (evt.keyCode === window.ESC_KEYCODE) {
        window.dom.mapElement.querySelector('.error').classList.add('hidden');
        // console.log('Esc button clicked');
      }
    });

    // window.dom.mapElement.addEventListener('click', function (evt) {
    //   evt.preventDefault();
    //   window.dom.mapElement.querySelector('.error').classList.add('hidden');
    //   // console.log('Window clicked');
    // });
  };

})();
