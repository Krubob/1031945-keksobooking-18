'use strict';

(function () {

  window.NUMBER_OF_OBJ = 8;
  window.ENTER_KEYCODE = 13;

  window.dom = {
    mapElement: document.querySelector('.map'),
    similarPinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),
    errorWindow: document.querySelector('#error').content.querySelector('.error'),
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

})();
