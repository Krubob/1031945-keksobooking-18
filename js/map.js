'use strict';

(function () {

  var arr = window.ad.author.avatar;
  var newArr = arr.slice(); // создаем копию нужного нам массива
  window.guestsNumber = window.dom.guestsNumberSelect;
  window.roomsNumber = window.dom.roomsNumberSelect;

  // создаем функцию для генерации объекта со случайными значениями
  var createRandomObj = function () {
    var mainObj = {}; // создаем пустой объект для записи в него объектов: author, offer, location
    var author = {}; // -//-
    var offer = {}; // -//-
    var location = {}; // -//-
    var locationX = window.ad.location.x();
    var locationY = window.ad.location.y();
    author.avatar = getRandomElement();
    offer.title = window.ad.offer.title;
    offer.address = 'left: ' + locationX + 'px;' + ' top: ' + locationY + 'px;';
    offer.price = window.ad.offer.price;
    offer.type = window.ad.offer.type;
    offer.rooms = window.ad.offer.rooms;
    offer.guests = window.ad.offer.guests;
    offer.checkin = window.ad.offer.checkin;
    offer.checkout = window.ad.offer.checkout;
    offer.features = window.ad.offer.features;
    offer.description = window.ad.offer.description;
    offer.photos = window.ad.offer.photos;
    location.x = locationX;
    location.y = locationY;

    mainObj.author = author;
    mainObj.offer = offer;
    mainObj.location = location;
    return mainObj;
  };

  // создаем функцию для выбора случайного значения из копии массива
  var getRandomElement = function () {
    var randomNumber = Math.floor(Math.random() * newArr.length);
    var randomChoice = newArr[randomNumber];
    newArr.splice(randomNumber, 1);
    return randomChoice;
  };

  // создаем функцию для записи сгенерированных N объектов в массив
  var createArrOfObj = function () {
    var arrOfObj = []; // создаем пустой массив для записи в него объектов
    for (var i = 0; i < window.NUMBER_OF_OBJ; i++) {
      arrOfObj.push(createRandomObj());
    }
    return arrOfObj;
  };
  var randomArr = createArrOfObj(window.NUMBER_OF_OBJ);

  // создаем функцию для отрисовки метки на карте
  var renderPin = function () {
    var pinElement = window.dom.similarPinTemplate.cloneNode(true);
    pinElement.style = randomArr[i].offer.address;
    pinElement.querySelector('img').src = randomArr[i].author.avatar;
    pinElement.querySelector('img').alt = randomArr[i].offer.title;
    return pinElement;
  };

  // создаем функцию для отрисовки N меток на карте
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < window.NUMBER_OF_OBJ; i++) {
    fragment.appendChild(renderPin());
  }
  window.dom.similarPins.appendChild(fragment);

})();
