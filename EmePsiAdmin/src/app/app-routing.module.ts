import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pendientes',
    pathMatch: 'full'
  },
  {
    path: 'pendientes',
    loadChildren: () => import('./pendientes/pendientes.module').then( m => m.PendientesPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'profesionales',
    loadChildren: () => import('./profesionales/profesionales.module').then( m => m.ProfesionalesPageModule)
  },
  {
    path: 'alta-profesional',
    loadChildren: () => import('./alta-profesional/alta-profesional.module').then( m => m.AltaProfesionalPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
