import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'fh',
    pathMatch: 'full'
  },
  { path: 'fh', loadChildren: () => import('./fh/fh.module').then(m => m.FhModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
