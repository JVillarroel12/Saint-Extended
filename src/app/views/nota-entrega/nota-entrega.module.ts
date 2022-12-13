import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaEntregaPageRoutingModule } from './nota-entrega-routing.module';

import { NotaEntregaPage } from './nota-entrega.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaEntregaPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotaEntregaPage]
})
export class NotaEntregaPageModule {}
