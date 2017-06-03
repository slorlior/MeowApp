import { Component } from '@angular/core';
import { IconGenerator } from './shared/icon-generator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [IconGenerator]
})
export class AppComponent {
  title = 'app works!';
  icon = "";

  constructor(private _iconGenerator:IconGenerator) {
    this.icon = this._iconGenerator.generateIcon();
  }
  generateIcon() {
    return this.icon;
  }
}
