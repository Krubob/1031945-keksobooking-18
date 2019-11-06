'use strict';

(function () {

  // создаем функцию для отрисовки параметров пинов
  var renderPin = function (pins) {
    var pinElement = window.dom.similarPinTemplate.cloneNode(true);
    var locationX = pins.location.x;
    var locationY = pins.location.y;
    pinElement.querySelector('img').src = pins.author.avatar;
    pinElement.querySelector('img').alt = pins.offer.title;
    pinElement.style = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';
    return pinElement;
  };

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
    // console.log(cardElement);
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
  };

  // console.log(document.querySelector('.map'));

  // добавляем обработчик ошибки в отдельную переменную и отрисовываем сообщение об ошибке в dom-элемент
  window.errorHandler = function () {
    var error = window.dom.errorWindow;
    window.dom.mapElement.appendChild(error);
  };


})();
