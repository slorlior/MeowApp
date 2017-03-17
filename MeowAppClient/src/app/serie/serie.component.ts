import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent implements OnInit {
  image;
  serieName;
  seasonAndEpisode;
  episodeName;
  airDate;
  airDay;
  constructor() { }

  ngOnInit() {
  }

}
