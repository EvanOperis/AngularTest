import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './components/landing-page/landing-page.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LandingPageComponent
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }
