import { Component, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'OrderManagementSystem';

  IsLoggedIn: boolean = false;

  UserData: any;

  constructor(public authSrvc: AuthenticationService, public router: Router) {
    this.IsLoggedIn = this.authSrvc.IsUserLoggedIn();
    console.log(router);
    this.UserData = JSON.parse(localStorage.getItem('user'));
    console.log(this.UserData);

    this.authSrvc.UserData.subscribe((val: any) => {
      this.IsLoggedIn = val ? true : false;
      this.UserData = val;
    });
  }

  Navigate(url: any) {
    this.router.navigate([url]);
  }

  Logout() {
    this.authSrvc.logout();
  }
}
