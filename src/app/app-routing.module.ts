import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
  	path: '',
  	redirectTo: '/system-account/editor', pathMatch: 'full'
  },
  {
    path: 'system-account/editor',
    loadChildren: () => import('./system-account/system-account-editor/system-account-editor.module').then(m => m.SystemAccountEditorModule)
  },
  {
  	path: '**',
  	redirectTo: '/system-account/editor', pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
