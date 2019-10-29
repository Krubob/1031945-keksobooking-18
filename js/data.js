'use strict';

(function () {

  window.NUMBER_OF_OBJ = 8;
  window.ENTER_KEYCODE = 13;

  window.ad = {
    author: {
      avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
        'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'
      ]
    },
    offer: {
      title: 'Заголовок объявления',
      address: '570px; 375px;',
      price: 1000,
      type: ['palace', 'flat', 'house', 'bungalo'],
      rooms: 1,
      guests: [1, 2, 3, 4],
      checkin: ['12:00', '13:00', '14:00'],
      checkout: ['12:00', '13:00', '14:00'],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
      description: 'bla-bla',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg']
    },
    location: {
      x: function () {
        var min = 0;
        var max = 1150;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      y: function () {
        var min = 130;
        var max = 630;
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }
  };

  window.dom = {
    mapElement: document.querySelector('.map'),
    similarPinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),
    similarPins: document.querySelector('.map').querySelector('.map__pins'),
    pinElem: document.querySelector('.map__pin--main'),
    muffinElem: document.querySelector('.map__pin--main').querySelector('img'),
    adFormElement: document.querySelector('.ad-form'),
    fieldsetForm: document.querySelector('.ad-form').querySelectorAll('fieldset'),
    selectFilter: document.querySelector('.map__filters-container').querySelectorAll('select'),
    fieldsetFilter: document.querySelector('.map__filters-container').querySelector('fieldset'),
    inputAddress: document.querySelector('#address'),
    roomsNumberSelect: document.querySelector('#room_number'),
    guestsNumberSelect: document.querySelector('#capacity')
  };

  window.pin = {
    pinTop: window.getComputedStyle(window.dom.pinElem, null).top, // 375px
    pinLeft: window.getComputedStyle(window.dom.pinElem, null).left, // 570px
    pinHeightMuffin: window.getComputedStyle(window.dom.muffinElem, null).height, // 44px
    pinWidthMuffin: window.getComputedStyle(window.dom.muffinElem, null).width, // 40px
    pinHeight: window.getComputedStyle(window.dom.pinElem, ':after').height, // 70px !!! <- не правильно показывает значение
    pinWidth: window.getComputedStyle(window.dom.pinElem, ':after').width, // 50px !!! <- не правильно показывает значение
    pinActiveMode: function () {
      var pinValueXY = (parseInt(window.pin.pinTop, 10) + 0.5 * parseInt(window.pin.pinHeightMuffin, 10)) + 'px; ' + (parseInt(window.pin.pinLeft, 10) + 0.5 * parseInt(window.pin.pinWidthMuffin, 10)) + 'px;';
      return pinValueXY;
    },
    pinNoActiveMode: function () {
      var pinValueXY = (parseInt(window.pin.pinTop, 10) + parseInt(window.pin.pinHeight, 10)) + 'px; ' + (parseInt(window.pin.pinLeft, 10) + 0.5 * parseInt(window.pin.pinWidth, 10)) + 'px;';
      return pinValueXY;
    }
  };

})();
