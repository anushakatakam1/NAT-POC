import { Component, OnInit } from '@angular/core';
import { CovidService } from '@app/covid.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  TotalCases: any;

  constructor(public cvdSrvc: CovidService) { }

  ngOnInit(): void {
    this.GetCovidList();
  }

  GetCovidList() {
    this.cvdSrvc.getAllStatesCovidData().subscribe((results: any) => {
      this.TotalCases = results.data;
    });
  }

}
