import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotaDebitoPage } from './nota-debito.page';

const routes: Routes = [
  {
    path: '',
    component: NotaDebitoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotaDebitoPageRoutingModule {}
