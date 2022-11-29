import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalReportePage } from './modal-reporte.page';

const routes: Routes = [
  {
    path: '',
    component: ModalReportePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalReportePageRoutingModule {}
