import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { SreenSizeService } from './sreen-size.service';

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

  MenuOptions: any = [];

  Showmenu: boolean = true;

  IsSmall: boolean = false;

  constructor(public authSrvc: AuthenticationService, public router: Router,
    public size: SreenSizeService) {
    this.IsLoggedIn = this.authSrvc.IsUserLoggedIn();
    this.IsSmall = window.screen.width <= 600 ? true : false;
    this.UserData = JSON.parse(localStorage.getItem('user'));
    this.PrepareMenuOptions();
    this.authSrvc.UserData.subscribe((val: any) => {
      this.IsLoggedIn = val ? true : false;
      this.UserData = val;
    });

  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.IsSmall = event.currentTarget.innerWidth <= 600 ? true : false;
    if (this.IsSmall) {
      this.Showmenu = false;
    } else {
      this.Showmenu = true;
    }
  }


  Navigate(url: any) {
    this.router.navigate([url]);
    if (this.IsSmall) {
      this.Showmenu = false;
    }
  }

  PrepareMenuOptions() {
    this.MenuOptions = [
      {
        Name: 'Home',
        URL: 'home',
        icon: 'fas fa-home'
      },
      {
        Name: 'Covid List',
        URL: 'covidlist',
        icon: 'fas fa-list'
      },
      {
        Name: 'Orders',
        URL: 'orders',
        icon: 'fas fa-list'
      }
    ];
  }

  ShoworHidemenu() {
    this.Showmenu = !this.Showmenu;
  }

  Logout() {
    this.authSrvc.logout();
  }
}
