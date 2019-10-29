'use strict';

var NUMBER_OF_OBJ = 8;
var ENTER_KEYCODE = 13;

var ad = {
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

var dom = {
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

var pin = {
  pinTop: window.getComputedStyle(dom.pinElem, null).top, // 375px
  pinLeft: window.getComputedStyle(dom.pinElem, null).left, // 570px
  pinHeightMuffin: window.getComputedStyle(dom.muffinElem, null).height, // 44px
  pinWidthMuffin: window.getComputedStyle(dom.muffinElem, null).width, // 40px
  pinHeight: window.getComputedStyle(dom.pinElem, ':after').height, // 70px !!! <- не правильно показывает значение
  pinWidth: window.getComputedStyle(dom.pinElem, ':after').width, // 50px !!! <- не правильно показывает значение
  pinActiveMode: function () {
    var pinValueXY = (parseInt(pin.pinTop, 10) + 0.5 * parseInt(pin.pinHeightMuffin, 10)) + 'px; ' + (parseInt(pin.pinLeft, 10) + 0.5 * parseInt(pin.pinWidthMuffin, 10)) + 'px;';
    return pinValueXY;
  },
  pinNoActiveMode: function () {
    var pinValueXY = (parseInt(pin.pinTop, 10) + parseInt(pin.pinHeight, 10)) + 'px; ' + (parseInt(pin.pinLeft, 10) + 0.5 * parseInt(pin.pinWidth, 10)) + 'px;';
    return pinValueXY;
  }
};

var arr = ad.author.avatar;
var newArr = arr.slice(); // создаем копию нужного нам массива
var guestsNumber = dom.guestsNumberSelect;
var roomsNumber = dom.roomsNumberSelect;

// создаем функцию для выбора случайного значения из копии массива
var getRandomElement = function () {
  var randomNumber = Math.floor(Math.random() * newArr.length);
  var randomChoice = newArr[randomNumber];
  newArr.splice(randomNumber, 1);
  return randomChoice;
};

// создаем функцию для генерации объекта со случайными значениями
var createRandomObj = function () {
  var mainObj = {}; // создаем пустой объект для записи в него объектов: author, offer, location
  var author = {}; // -//-
  var offer = {}; // -//-
  var location = {}; // -//-
  var locationX = ad.location.x();
  var locationY = ad.location.y();
  author.avatar = getRandomElement();
  offer.title = ad.offer.title;
  offer.address = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';
  offer.price = ad.offer.price;
  offer.type = ad.offer.type;
  offer.rooms = ad.offer.rooms;
  offer.guests = ad.offer.guests;
  offer.checkin = ad.offer.checkin;
  offer.checkout = ad.offer.checkout;
  offer.features = ad.offer.features;
  offer.description = ad.offer.description;
  offer.photos = ad.offer.photos;
  location.x = locationX;
  location.y = locationY;

  mainObj.author = author;
  mainObj.offer = offer;
  mainObj.location = location;
  return mainObj;
};

// создаем функцию для записи сгенерированных N объектов в массив
var createArrOfObj = function () {
  var arrOfObj = []; // создаем пустой массив для записи в него объектов
  for (var i = 0; i < NUMBER_OF_OBJ; i++) {
    arrOfObj.push(createRandomObj());
  }
  return arrOfObj;
};
var randomArr = createArrOfObj(NUMBER_OF_OBJ);

// создаем функцию для отрисовки метки на карте
var renderPin = function () {
  var pinElement = dom.similarPinTemplate.cloneNode(true);
  pinElement.style = randomArr[i].offer.address;
  pinElement.querySelector('img').src = randomArr[i].author.avatar;
  pinElement.querySelector('img').alt = randomArr[i].offer.title;
  return pinElement;
};

// создаем функцию для отрисовки N меток на карте
var fragment = document.createDocumentFragment();
for (var i = 0; i < NUMBER_OF_OBJ; i++) {
  fragment.appendChild(renderPin());
}

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
var toActiveMode = function () {
  dom.mapElement.classList.remove('map--faded'); // активация карты
  dom.inputAddress.placeholder = pin.pinActiveMode(); // координаты метки после активации карты
  dom.adFormElement.classList.remove('ad-form--disabled'); // активация формы
  unblockSelect(dom.fieldsetForm); // разблокировка масиива полей создания объявления
  unblockSelect(dom.selectFilter); // разблокировка массива полей выбора фильтра объявлений
  dom.fieldsetFilter.disabled = false; // разблокировка полей фильтра объявлений
};

// переход в активное состояние при нажатии на метку
dom.pinElem.addEventListener('mousedown', function () {
  toActiveMode();
});

// переход в активное состояние при нажатии на Enter
dom.pinElem.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    toActiveMode();
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

// создаем обработчик события на изменения select в форме и синхронизируем варианты выбора кол-ва комнат и гостей
roomsNumber.addEventListener('change', function (evt) {
  var valueOpt = roomsNumber.value;
  if (valueOpt === '1') {
    attachAttrDisabled([guestsNumber[0], guestsNumber[1], guestsNumber[2], guestsNumber[3]], [2]);
    roomsNumber.setCustomValidity('Все правильно'); // !!! <- не показывается резульат валидации
  } else if (valueOpt === '2') {
    attachAttrDisabled([guestsNumber[0], guestsNumber[1], guestsNumber[2], guestsNumber[3]], [1, 2]);
  } else if (valueOpt === '3') {
    attachAttrDisabled([guestsNumber[0], guestsNumber[1], guestsNumber[2], guestsNumber[3]], [0, 1, 2]);
  } else if (valueOpt === '100') {
    attachAttrDisabled([guestsNumber[0], guestsNumber[1], guestsNumber[2], guestsNumber[3]], [3]);
  } else {
    evt.target.setCustomValidity('');
  }
});

// создаем функцию для генерации начальных значений
var init = function () {
  dom.similarPins.appendChild(fragment);
  dom.inputAddress.placeholder = pin.pinNoActiveMode(); // начальные координаты метки
  blockSelect(dom.fieldsetForm); // блокировка масиива полей создания объявления
  blockSelect(dom.selectFilter); // блокировка массива полей выбора фильтра объявлений
  dom.fieldsetFilter.disabled = true; // блокировка поля фильтра объявлений
  attachAttrDisabled([guestsNumber[0], guestsNumber[1], guestsNumber[2], guestsNumber[3]], [2]); // начальное состояние select для количества гостей
};
init();
