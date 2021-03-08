import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect-page',
  templateUrl: './redirect-page.component.html',
  styleUrls: ['./redirect-page.component.scss']
})
export class RedirectPageComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  GotoHome() {
this.router.navigate(['home']);
  }

}
