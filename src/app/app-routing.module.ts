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
  },  {
    path: 'nota-entrega',
    loadChildren: () => import('./views/nota-entrega/nota-entrega.module').then( m => m.NotaEntregaPageModule)
  },
  {
    path: 'nota-debito',
    loadChildren: () => import('./views/nota-debito/nota-debito.module').then( m => m.NotaDebitoPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./modals/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
