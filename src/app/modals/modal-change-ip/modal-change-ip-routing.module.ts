import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalChangeIpPage } from './modal-change-ip.page';

const routes: Routes = [
  {
    path: '',
    component: ModalChangeIpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalChangeIpPageRoutingModule {}
