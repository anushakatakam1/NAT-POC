import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbPopover } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OrderslistComponent } from './orderslist/orderslist.component';
import { HomeComponent } from './home/home.component';

import { HttpClientModule } from '@angular/common/http';
import { OrdersBackendProvider } from './order-interceptor.service';
import { LoginBackendProvider } from './login-interceptor.service';
import { CovidDashboardComponent } from './covid-dashboard/covid-dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { RedirectPageComponent } from './redirect-page/redirect-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    OrderslistComponent,
    HomeComponent,
    CovidDashboardComponent,
    RedirectPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    GoogleChartsModule.forRoot(),
    NgxGraphModule,
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [LoginBackendProvider, OrdersBackendProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
