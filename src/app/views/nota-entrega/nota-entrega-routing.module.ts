import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaEntregaPage } from './nota-entrega.page';

const routes: Routes = [
  {
    path: '',
    component: NotaEntregaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaEntregaPageRoutingModule {}
