import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'modal-change-ip',
    loadChildren: () => import('./modals/modal-change-ip/modal-change-ip.module').then( m => m.ModalChangeIpPageModule)
  },
  {
    path: 'modal-reporte',
    loadChildren: () => import('./modals/modal-reporte/modal-reporte.module').then( m => m.ModalReportePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
