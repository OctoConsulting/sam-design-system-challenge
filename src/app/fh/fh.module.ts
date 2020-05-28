import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FhLandingPageComponent } from './fh-landing-page/fh-landing-page.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: FhLandingPageComponent
  }
]

@NgModule({
  declarations: [
    FhLandingPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class FhModule { }
