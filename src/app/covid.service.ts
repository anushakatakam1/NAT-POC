import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CovidService {

  constructor(private http: HttpClient) { }

  GetCovidListBasedontheState(data: any) {
    return this.http.get('https://api.covid19india.org/v4/min/timeseries-' + data + '.min.json').pipe(map((res: any) => {
      return res;
    }))
  }
  getAllStatesCovidData() {
      return this.http.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats').pipe(map((res: any) => {
      return res;
    }))
  }
}
