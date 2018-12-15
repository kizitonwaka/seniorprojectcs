import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {ProgressBarModule} from "angular-progress-bar";

import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { HeaderComponent } from './modules/home/components/header/header.component';
import { FooterComponent } from './modules/home/components/footer/footer.component';
import { BodyComponent } from './modules/home/components/body/body.component';
import { CalculatorComponent } from './modules/home/components/body/components/calculator/calculator.component';
import { BrandsComponent } from './modules/home/components/body/components/brands/brands.component';
import { EstimatorComponent } from './modules/home/components/body/components/estimator/estimator.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'estimator', component: EstimatorComponent },
  { path: 'home', component: HomeComponent },
  /*{ path: 'hero/:id',      component: HeroDetailComponent },
  {
    path: 'heroes',
    component: HeroListComponent,
    data: { title: 'Heroes List' }
  },
  { path: '',
    redirectTo: '/heroes',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }*/
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    // other imports here
    BrowserModule,
    ProgressBarModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    CalculatorComponent,
    BrandsComponent,
    EstimatorComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
