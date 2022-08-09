import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterTasksPageRoutingModule } from './register-tasks-routing.module';

import { RegisterTasksPage } from './register-tasks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterTasksPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RegisterTasksPage]
})
export class RegisterTasksPageModule {}
