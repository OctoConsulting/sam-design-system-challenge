import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemAccountEditorComponent } from './system-account-editor.component';

const routes: Routes = [
	{
		path: '',
		component: SystemAccountEditorComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemAccountEditorRoutingModule { }
