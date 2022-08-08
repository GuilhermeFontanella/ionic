import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuildingPagePage } from './building-page.page';

const routes: Routes = [
  {
    path: '',
    component: BuildingPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuildingPagePageRoutingModule {}
