import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecordsMadePage } from './records-made.page';

const routes: Routes = [
  {
    path: '',
    component: RecordsMadePage
  },
  {
    path: 'edit/:id',
    loadChildren: () => import('./edit/edit.module').then( m => m.EditPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsMadePageRoutingModule {}
