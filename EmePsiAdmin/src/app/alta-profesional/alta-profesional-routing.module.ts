import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaProfesionalPage } from './alta-profesional.page';

const routes: Routes = [
  {
    path: '',
    component: AltaProfesionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaProfesionalPageRoutingModule {}
