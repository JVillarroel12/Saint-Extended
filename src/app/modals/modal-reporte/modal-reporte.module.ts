import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalReportePageRoutingModule } from './modal-reporte-routing.module';

import { ModalReportePage } from './modal-reporte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalReportePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalReportePage]
})
export class ModalReportePageModule {}
