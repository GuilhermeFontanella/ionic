import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecordsMadePageRoutingModule } from './records-made-routing.module';
import { RecordsMadePage } from './records-made.page';
import { InputMaskModule } from 'primeng/inputmask';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordsMadePageRoutingModule,
    InputMaskModule
  ],
  declarations: [RecordsMadePage]
})
export class RecordsMadePageModule {}
