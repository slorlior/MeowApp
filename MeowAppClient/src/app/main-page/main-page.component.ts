import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  disabled = false;
   items: Array<string> = ['The first choice!', 'And another choice for you.', 'but wait! A third!'];
   status = {isopen: false};
   toggled(open:any) {
     console.log('Dropdown is now: ', open);
   }
   toggleDropdown ($event: MouseEvent) {
     $event.preventDefault();
     $event.stopPropagation();
     this.status.isopen = !this.status.isopen;
   }

}
