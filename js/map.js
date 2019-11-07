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

    for (var i = 0; i < pins.length - 1; i++) {
      fragment.appendChild(renderPin(pins[i]));
      fragment.appendChild(renderCard(pins[i]));
    }

    window.dom.similarPins.appendChild(fragment);
    window.dom.mapFiltersContainer.before(fragmentExtr);
    addValueIndex();

    var psevdoAray = document.querySelectorAll('.map__card'); // записываем все dom-элементы в псевдомассив
    window.arrayCards = Array.from(psevdoAray); // преобразуем в массив
  };

  // создаем функцию для добавляения каждому пину аттрибута value
  // и присваиваем ему порядковый номер index
  var addValueIndex = function () {
    var psevdoAray = document.querySelectorAll('.map__pin'); // записываем все dom-элементы в псевдомассив
    window.arrayPins = Array.from(psevdoAray); // преобразуем в массив

    window.arrayPins.splice(0, 1); // убираем первый элемент массива, который соответствует перетаскиваемой метке, а не пину

    window.arrayPins.forEach(function (elem, index) {
      elem.value = index;
    });

    // добавляем обработчик события, который по клику на пин вызывает соответств. объявление
    document.querySelector('.map__pins').addEventListener('click', function (evt) {
      var target = evt.target;
      var button = target.closest('button');
      var valuePin = button.value;
      if (valuePin === '0') {
        document.querySelectorAll('.map__card')[0].classList.remove('hidden');
      } else if (valuePin === '1') {
        document.querySelectorAll('.map__card')[1].classList.remove('hidden');
      } else if (valuePin === '2') {
        document.querySelectorAll('.map__card')[2].classList.remove('hidden');
      } else if (valuePin === '3') {
        document.querySelectorAll('.map__card')[3].classList.remove('hidden');
      } else if (valuePin === '4') {
        document.querySelectorAll('.map__card')[4].classList.remove('hidden');
      } else if (valuePin === '5') {
        document.querySelectorAll('.map__card')[5].classList.remove('hidden');
      } else if (valuePin === '6') {
        document.querySelectorAll('.map__card')[6].classList.remove('hidden');
      } else if (valuePin === '7') {
        document.querySelectorAll('.map__card')[7].classList.remove('hidden');
      } else if (valuePin === '8') {
        document.querySelectorAll('.map__card')[8].classList.remove('hidden');
      } else if (target.value !== 'button') {
        return;
      } else if (button.classList.contains('map__pin--main')) {
        console.log('elem find');
        evt.stopPropagation();
        // evt.preventDefault();
      }
      console.log(button);
    });
  };

  // window.arrayCards.forEach(function (index) {
  //   document.querySelectorAll('.popup__close').addEventListener('click', function () {
  //     document.querySelectorAll('.map__card')[index].classList.add('hidden');
  //   });
  // });

  // document.querySelectorAll('.popup__close').addEventListener('keydown', function (evt) {
  //   if (evt.keyCode === window.ENTER_KEYCODE) {

  //   }
  // });

  // добавляем обработчик ошибки в отдельную переменную и отрисовываем сообщение об ошибке в dom-элемент
  window.errorHandler = function () {
    var error = window.dom.errorWindow;
    window.dom.mapElement.appendChild(error);
  };

})();
