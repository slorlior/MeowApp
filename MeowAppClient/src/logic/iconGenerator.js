var images = "/images/"
var CAT = 0;
var FOX = 1;
var LION = 2;
var TIGER = 3;
var catImage = images + "cat.png"
var foxImage = images + "fox.png"
var lionImage = images + "lion.png"
var tigerImage = images + "tiger.png"

// generate cat or fox with 1/3 chance each, lion or tiger with 1/6 chance each
function generateIcon() {
  var random = Math.floor((Math.random() * 6));
  switch (random % 4) {
    case CAT:
      return catImage;
    case FOX:
      return foxImage;
    case LION:
      return lionImage;
    case TIGER:
      return tigerImage;
  }
}

module.exports = {
  generateIcon:generateIcon
};
