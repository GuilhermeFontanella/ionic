import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuildingPagePageRoutingModule } from './building-page-routing.module';

import { BuildingPagePage } from './building-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuildingPagePageRoutingModule
  ],
  declarations: [BuildingPagePage]
})
export class BuildingPagePageModule {}
