import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ConfiguracionPage } from '../modals/configuracion/configuracion.page';
import { ModalChangeIpPage } from '../modals/modal-change-ip/modal-change-ip.page';
import { ModalReportePage } from '../modals/modal-reporte/modal-reporte.page';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  contador = 0;
  mostrarInfo = false;
  IP = localStorage.getItem("IP");
  activarNotaEntrega = localStorage.getItem('saint-activarNotaEntrega')
  activarNotaDebito = localStorage.getItem('saint-activarNotaDebito')
  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public router: Router
  ) {}
  ngOnInit(){
  }
  navegar(_ruta){
    this.router.navigate([_ruta])
  }
  async cambiarIp(){
    this.contador++;
    if(this.contador == 3){
      this.contador = 0;
      const modal = await this.modalController.create({
        component: ConfiguracionPage,
        cssClass: 'modalConfiguracion'
      });
      modal.present();

      const ip = await modal.onDidDismiss();
      console.log("SALIENDOOO =>", ip);
      
      if(ip['data'] != undefined){
        window.location.reload();
      }
    }
  }

}
