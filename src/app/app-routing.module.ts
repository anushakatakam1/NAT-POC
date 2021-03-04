import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './auth-guard';
import { CovidDashboardComponent } from './covid-dashboard/covid-dashboard.component';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrderslistComponent } from './orderslist/orderslist.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  // { path: 'orders', component: OrderslistComponent, canActivate: [AuthGuardService] },
  { path: 'covidlist', component: CovidDashboardComponent, canActivate: [AuthGuardService] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
