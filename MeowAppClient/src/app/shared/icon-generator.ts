import { Injectable } from '@angular/core';
@Injectable()
export class IconGenerator {
  private images = "src/assets/images/"
  private CAT = 0;
  private FOX = 1;
  private LION = 2;
  private TIGER = 3;
  private catImage = this.images + "cat.png"
  private foxImage = this.images + "fox.png"
  private lionImage = this.images + "lion.png"
  private tigerImage = this.images + "tiger.png"

  // generate cat or fox with 1/3 chance each, lion or tiger with 1/6 chance each
  generateIcon() {
    var random = Math.floor((Math.random() * 6));
    switch (random % 4) {
      case this.CAT:
      return this.catImage;
      case this.FOX:
      return this.foxImage;
      case this.LION:
      return this.lionImage;
      case this.TIGER:
      return this.tigerImage;
    }
  }
}
