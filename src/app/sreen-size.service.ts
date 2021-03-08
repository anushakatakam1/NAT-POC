import { HostListener, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SreenSizeService {

  IsSmall: boolean = false;

  constructor() {
    // this.onResize();
    // this.IsSmall = window.screen.width <= 600 ? true : false;
  }

}
