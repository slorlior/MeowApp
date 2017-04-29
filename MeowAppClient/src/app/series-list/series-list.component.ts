import { Component, OnInit } from '@angular/core';
import { SeriesService } from './series.service';
import { ISerie } from '../interfaces/ISerie';
import * as moment from 'moment';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrls: ['./series-list.component.css'],
  providers: [SeriesService]
})
export class SeriesListComponent implements OnInit {
  series:ISerie[];

  constructor(private _seriesService:SeriesService) { }

  ngOnInit() {
    this._seriesService.getSeriesByDate(moment().subtract(7, "days").format('DD/MM/YYYY'))
    .subscribe(
      series => {
        this.orderSeries(series);
        console.log(this.series);
      },
      error =>  console.log(error));
    }

    orderSeries(series:ISerie[]){
      if(series){
        this.series=series.sort((first,second)=>{
          let day=moment(second.airDate,'DD/MM/YYYY');
          let isBefore=moment(second.airDate,'DD/MM/YYYY').isBefore(moment(first.airDate,'DD/MM/YYYY'));
          if(isBefore){
            return 1;
          }
          return -1;


        });
      }
    }

  }
