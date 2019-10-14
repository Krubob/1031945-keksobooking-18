'use strict';

var numberOfObj = 8;

var ad = {
  author: {
    avatar: ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png',
      'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'
    ]
  },
  offer: {
    title: 'Заголовок объявления',
    address: 'left: 600px; top: 350px;',
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
    x: function getRandomlocationY(min, max) {
      min = Math.ceil(0);
      max = Math.floor(1040);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    y: function getRandomlocationX(min, max) {
      min = Math.ceil(130);
      max = Math.floor(630);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }
};

var dom = {
  mapElement: document.querySelector('.map'),
  similarPinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),
  similarPins: document.querySelector('.map').querySelector('.map__pins')
};

// создаем функцию для генерации объекта со случайными значениями
var createRandomObj = function () {
  var randomObj = {}; // создаем пустой объект для записи случайных значений
  var locationX = ad.location.x();
  var locationY = ad.location.y();
  var arr = ad.author.avatar;
  var newArr = arr.splice(0, 1);
  randomObj.address = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';
  randomObj.avatar = newArr[0];
  randomObj.title = ad.offer.title;
  return randomObj;
};

// создаем функцию для генерации масссива из N объектов со случайными значениями
var createArrOfObj = function () {
  var arr = []; // создаем пустой массив для записи в него объектов
  for (var i = 0; i < numberOfObj; i++) {
    arr.push(createRandomObj());
  }
  return arr;
};

var renderPin = function () {
  var pinElement = dom.similarPinTemplate.cloneNode(true);
  pinElement.style = randomArr[i].address;
  pinElement.querySelector('img').src = randomArr[i].avatar;
  pinElement.querySelector('img').alt = randomArr[i].title;
  return pinElement;
};

var randomArr = createArrOfObj(numberOfObj);
var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin(randomArr[i]));
}
dom.mapElement.classList.remove('.map--faded');
dom.similarPins.appendChild(fragment);
