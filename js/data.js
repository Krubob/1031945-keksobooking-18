'use strict';

(function () {

  window.NUMBER_OF_OBJ = 8;
  window.ENTER_KEYCODE = 13;
  window.ESC_KEYCODE = 27;
  window.PINS_NUMBER = 5;

  window.dom = {
    mapElement: document.querySelector('.map'),
    mapCards: document.querySelectorAll('.map__card'),
    similarPinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),
    similarCardTemplate: document.querySelector('#card').content.querySelector('.map__card'),
    mapFiltersContainer: document.querySelector('.map__filters-container'),
    housingType: document.querySelector('.map__filters-container').querySelector('#housing-type'),
    housingPrice: document.querySelector('.map__filters-container').querySelector('#housing-price'),
    housingRooms: document.querySelector('.map__filters-container').querySelector('#housing-rooms'),
    housingGuests: document.querySelector('.map__filters-container').querySelector('#housing-guests'),
    housingFeatures: document.querySelector('.map__filters-container').querySelector('#housing-features'),
    errorWindow: document.querySelector('#error').content.querySelector('.error'),
    successWindow: document.querySelector('#success').content.querySelector('.success'),
    popupClose: document.querySelector('.popup__close'),
    submitForm: document.querySelector('.ad-form'),
    similarPins: document.querySelector('.map').querySelector('.map__pins'),
    pinElem: document.querySelector('.map__pin--main'),
    muffinElem: document.querySelector('.map__pin--main').querySelector('img'),
    adFormElement: document.querySelector('.ad-form'),
    noticeElement: document.querySelector('.notice'),
    fieldsetForm: document.querySelector('.ad-form').querySelectorAll('fieldset'),
    selectFilter: document.querySelector('.map__filters-container').querySelectorAll('select'),
    fieldsetFilter: document.querySelector('.map__filters-container').querySelector('fieldset'),
    inputAddress: document.querySelector('#address'),
    roomsNumberSelect: document.querySelector('#room_number'),
    guestsNumberSelect: document.querySelector('#capacity'),
    houseTypeSelect: document.querySelector('#type'),
    houseTypeInput: document.querySelector('#price'),
    housePrice: document.querySelector('#price'),
    timeinSelect: document.querySelector('#timein'),
    timeoutSelect: document.querySelector('#timeout'),
    fileChooser: document.querySelector('.ad-form-header__input'),
    preview: document.querySelector('.ad-form-header__preview').querySelector('img')
  };

})();
