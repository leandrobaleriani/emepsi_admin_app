import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaCalendarioPageRoutingModule } from './alta-calendario-routing.module';

import { AltaCalendarioPage } from './alta-calendario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaCalendarioPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AltaCalendarioPage]
})
export class AltaCalendarioPageModule {}
