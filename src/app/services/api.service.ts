import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  IP = 'http://' + localStorage.getItem("saintIP") + '/api/';
  getNotaEntrega = this.IP + 'nota-entrega/';
  getHistoricoNotaEntrega = this.IP + 'nota-entrega-historico/';
  getHistoricoFecha = this.IP + 'nota-entrega-historico/';
  getNotaDebito = this.IP + 'nota-debito/';
  getCliente = this.IP + 'Saclies/';

  constructor(
    public toastController: ToastController
  ) { }


  async toast(msg, status) {
    const toast = await this.toastController.create({
      message: msg,
      position: 'top',
      color: status,
      duration: 3000,
      cssClass: 'toastCss',
    });
    toast.present();
  }
}
