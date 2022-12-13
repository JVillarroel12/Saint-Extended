import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotaDebitoPageRoutingModule } from './nota-debito-routing.module';

import { NotaDebitoPage } from './nota-debito.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotaDebitoPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [NotaDebitoPage]
})
export class NotaDebitoPageModule {}
