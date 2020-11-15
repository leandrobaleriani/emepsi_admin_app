import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AltaProfesionalPageRoutingModule } from './alta-profesional-routing.module';

import { AltaProfesionalPage } from './alta-profesional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AltaProfesionalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AltaProfesionalPage]
})
export class AltaProfesionalPageModule {}
