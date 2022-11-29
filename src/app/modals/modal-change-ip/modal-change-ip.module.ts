import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalChangeIpPageRoutingModule } from './modal-change-ip-routing.module';

import { ModalChangeIpPage } from './modal-change-ip.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalChangeIpPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalChangeIpPage]
})
export class ModalChangeIpPageModule {}
