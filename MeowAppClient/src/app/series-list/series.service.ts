import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { ISerie } from '../interfaces/ISerie';

@Injectable()
export class SeriesService {
  private meowServiceUrl='http://localhost:3000';

  constructor(private http:Http) { }

  getSeries(): Observable<ISerie[]> {
    return this.http.get(this.meowServiceUrl+"/seriesData?fromDate="+moment().day(-7,).format('DD/MM/YYYY'))
    .map((res:Response)=> <ISerie[]>res.json())
    .catch((error:Response)=>{
      console.log(error);
      return Observable.throw(error.json().error || 'Server error');
    });
  }
}
