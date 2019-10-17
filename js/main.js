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

var arr = ad.author.avatar;
var newArr = arr.slice(); // создаем копию нужного нам массива

var dom = {
  mapElement: document.querySelector('.map'),
  similarPinTemplate: document.querySelector('#pin').content.querySelector('.map__pin'),
  similarPins: document.querySelector('.map').querySelector('.map__pins')
};

// создаем функцию для выбора случайного значения из копии массива
var getRandomElement = function () {
  var k = Math.floor(Math.random() * newArr.length);
  var random = newArr[k];
  newArr.splice(k, 1);
  return random;
};

// создаем функцию для генерации объекта со случайными значениями
var createRandomObj = function () {
  var mainObj = {}; // создаем пустой объект для записи значений
  var author = {};
  var offer = {};
  var location = {};
  var locationX = ad.location.x();
  var locationY = ad.location.y();
  var randomElementArr = getRandomElement(newArr);
  author.avatar = randomElementArr;
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
  location.x = ad.location.x;
  location.y = ad.location.y;

  mainObj.author = author;
  mainObj.offer = offer;
  mainObj.location = location;

  return mainObj;
};

var createArrOfObj = function () {
  var a = []; // создаем пустой массив для записи в него объектов
  for (var i = 0; i < numberOfObj; i++) {
    a.push(createRandomObj());
  }
  return a;
};

var randomArr = createArrOfObj(numberOfObj);

var renderPin = function () {
  var pinElement = dom.similarPinTemplate.cloneNode(true);
  pinElement.style = randomArr[i].offer.address;
  pinElement.querySelector('img').src = randomArr[i].author.avatar;
  pinElement.querySelector('img').alt = randomArr[i].offer.title;
  return pinElement;
};

var fragment = document.createDocumentFragment();
for (var i = 0; i < 8; i++) {
  fragment.appendChild(renderPin());
}
dom.mapElement.classList.remove('.map--faded');
dom.similarPins.appendChild(fragment);
