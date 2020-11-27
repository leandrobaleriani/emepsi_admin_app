import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AltaCalendarioPage } from './alta-calendario.page';

const routes: Routes = [
  {
    path: '',
    component: AltaCalendarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AltaCalendarioPageRoutingModule {}
