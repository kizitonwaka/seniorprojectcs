import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BodyComponent } from './body/body.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { BrandsComponent } from './brands/brands.component';
import { EstimatorComponent } from './estimator/estimator.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'estimator', component: EstimatorComponent },
  { path: 'home', component: MainComponent },
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
    BrowserModule
  ],
  declarations: [
    AppComponent,
    MainComponent,
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
