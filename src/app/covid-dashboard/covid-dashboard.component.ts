import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CovidService } from '@app/covid.service';

@Component({
  selector: 'app-covid-dashboard',
  templateUrl: './covid-dashboard.component.html',
  styleUrls: ['./covid-dashboard.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class CovidDashboardComponent implements OnInit {

  States = [
    { Key: 'AN', Value: 'Andaman and Nicobar Islands' },
    { Key: 'AP', Value: 'Andhra Pradesh' },
    { Key: 'AR', Value: 'Arunachal Pradesh' },
    { Key: 'AS', Value: 'Assam' },
    { Key: 'BR', Value: 'Bihar' },
    { Key: 'CH', Value: 'Chandigarh' },
    { Key: 'CT', Value: 'Chhattisgarh' },
    { Key: 'DN', Value: 'Dadra and Nagar Haveli and Daman and Diu' },
    { Key: 'DL', Value: 'Delhi' },
    { Key: 'GA', Value: 'Goa' },
    { Key: 'GJ', Value: 'Gujarat' },
    { Key: 'HR', Value: 'Haryana' },
    { Key: 'HP', Value: 'Himachal Pradesh' },
    { Key: 'JK', Value: 'Jammu and Kashmir' },
    { Key: 'JH', Value: 'Jharkhand' },
    { Key: 'KA', Value: 'Karnataka' },
    { Key: 'KL', Value: 'Kerala' },
    { Key: 'LA', Value: 'Ladakh' },
    { Key: 'LD', Value: 'Lakshadweep' },
    { Key: 'MP', Value: 'Madhya Pradesh' },
    { Key: 'MH', Value: 'Maharashtra' },
    { Key: 'MN', Value: 'Manipur' },
    { Key: 'ML', Value: 'Meghalaya' },
    { Key: 'MZ', Value: 'Mizoram' },
    { Key: 'NL', Value: 'Nagaland' },
    { Key: 'OR', Value: 'Odisha' },
    { Key: 'PB', Value: 'Punjab' },
    { Key: 'RJ', Value: 'Rajasthan' },
    { Key: 'SK', Value: 'Sikkim' },
    { Key: 'TN', Value: 'Tamil Nadu' },
    { Key: 'TG', Value: 'Telangana' },
    { Key: 'TR', Value: 'Tripura' },
    { Key: 'UP', Value: 'Uttar Pradesh' },
    { Key: 'UT', Value: 'Uttarakhand' }
  ]

  StateChange: FormControl = new FormControl('TG');

  CovidInfo: any = [];

  graphData: any = [];

  districts: any;

  displaydata: any;

  constructor(public cvdSrvc: CovidService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ValueChangesForState();
    this.GetCovidList(this.StateChange.value);
  }

  ValueChangesForState() {
    this.StateChange.valueChanges.subscribe((val: any) => {
      this.GetCovidList(val);
    });
  }

  GetCovidList(state: any) {
    this.cvdSrvc.GetCovidListBasedontheState(state).subscribe((results: any) => {
      let Coviddata: any = this.converttovalue(results);
      var dt = new Date();
      dt.setDate(dt.getDate() - 10);
      for (let [key, value] of Object.entries(Coviddata.dates)) {
        if (key > this.datePipe.transform(dt, 'yyyy-MM-dd')) {
          let Obj = {
            DD: key,
            val: value
          }
          this.CovidInfo.push(Obj);
        }
      }

      this.districts = Coviddata.districts;
    });
  }

  converttovalue(data: any) {
    for (let result of Object.values(data)) {
      return result;
    }
  }

  getConfirmedData(data: any) {
    this.displaydata = data;
    this.graphData = [];
    let datatype: any = [];
    this.CovidInfo.forEach((dataInfo: any) => {
      if (data === 'confirmed') {
        datatype.push({ name: this.datePipe.transform(dataInfo.DD, 'MMM dd'), value: dataInfo.val.delta.confirmed ? dataInfo.val.delta.confirmed : 0 });
      } else if (data === 'recovered') {
        datatype.push({ name: this.datePipe.transform(dataInfo.DD, 'MMM dd'), value: dataInfo.val.delta.recovered ? dataInfo.val.delta.recovered : 0 });
      } else if (data === 'deceased') {
        datatype.push({ name: this.datePipe.transform(dataInfo.DD, 'MMM dd'), value: dataInfo.val.delta.deceased ? dataInfo.val.delta.recovered : 0 });
      } else if (data === 'active') {
        let activedata: any = dataInfo.val.delta.confirmed - dataInfo.val.delta.recovered - dataInfo.val.delta.deceased;
        datatype.push({ name: this.datePipe.transform(dataInfo.DD, 'MMM dd'), value: activedata ? activedata : 0 });
      }
      this.graphData = datatype;
    });
  }

}
