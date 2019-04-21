import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {ProgressBarModule} from "angular-progress-bar";

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './modules/home/components/header/header.component';
import { FooterComponent } from './modules/home/components/footer/footer.component';
import { BodyComponent } from './modules/home/components/body/body.component';
import { CalculatorComponent } from './modules/home/components/body/components/calculator/calculator.component';
import { BrandsComponent } from './modules/home/components/body/components/brands/brands.component';
import { EstimatorComponent } from './modules/estimator/components/estimator/estimator.component';
import { EstimatorChartComponent } from './modules/estimator/components/estimator-chart/estimator-chart.component';

const appRoutes: Routes = [
  {
    path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'estimator',
    component: EstimatorComponent
  },
  {
    path: 'home',
    component: HomeComponent
  }
];

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // other imports here
    BrowserModule,
    ProgressBarModule
  ],
  exports: [RouterModule],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    CalculatorComponent,
    BrandsComponent,
    EstimatorComponent,
    EstimatorChartComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
