import { Component, OnInit,Input } from '@angular/core';
import {ISerie} from '../interfaces/ISerie';
@Component({
  selector: '[app-serie]',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {
  @Input("app-serie") serie:ISerie;

  ngOnInit() {
  }

}
