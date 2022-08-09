import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterTasksPage } from './register-tasks.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterTasksPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterTasksPageRoutingModule {}
