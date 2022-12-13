import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { ModalChangeIpPage } from 'src/app/modals/modal-change-ip/modal-change-ip.page';
import { ModalReportePage } from 'src/app/modals/modal-reporte/modal-reporte.page';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nota-entrega',
  templateUrl: './nota-entrega.page.html',
  styleUrls: ['./nota-entrega.page.scss'],
})
export class NotaEntregaPage implements OnInit {
  formNumero: FormGroup;
  notaEntrega: any;
  contador = 0;
  mostrarInfo = false;
  @ViewChild('input', { static: false }) input: IonInput;
  linesNotaEntrega: any;
  IP = localStorage.getItem("saintIP");
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
    this.formNumero = this.formBuilder.group({
      numero: ['', Validators.required]
    })
    setTimeout(() => {
      this.input.setFocus();  
    }, 50);
  }

  buscarFacturaPress(_event){
    let formValues = this.formNumero.value;
    
    if(_event == "13"){
      if(formValues.numero != '' || formValues.numero != null || formValues.numero != undefined){
        this.getNotaEntrega();
      }
    }
  }
  async getNotaEntrega(){
    let formValues = this.formNumero.value;

    if(formValues.numero != '' || formValues.numero != null || formValues.numero != undefined){
      const loading = await this.loadingController.create({
        message: 'Cargando...'
  
      })
      loading.present();
      if(this.IP != null && this.IP != ''){
        this.http.get(this.apiService.getNotaEntrega + formValues.numero).subscribe(res=>{
          console.log("RES NOTA ENTREGA =>", res);
          this.notaEntrega = res;
          this.http.get(this.apiService.getNotaEntrega + formValues.numero + "/items").subscribe(res=>{
            console.log("RES NOTA ENTREGA =>", res);
            this.linesNotaEntrega = res;
            this.linesNotaEntrega.forEach(element => {
              element.nuevoPrecio = '';
            });
            loading.dismiss();
            this.mostrarInfo = true;
          },(error)=>{
            console.log("ERROR =>", error.error);
            if(error.error.status == 404){
              this.apiService.toast("Nota de entrega no encontrada", "danger")
            }else{
              this.apiService.toast("Ha ocurrido un error obteniendo la nota de entrega", "danger");
  
            }
            loading.dismiss();
          })
        },(error)=>{
          console.log("ERROR =>", error.error);
          if(error.error.status == 404){
            this.apiService.toast("Nota de entrega no encontrada", "danger")
          }else{
            this.apiService.toast("Ha ocurrido un error obteniendo la nota de entrega", "danger");

          }
          loading.dismiss();
        })
      }else{
        this.apiService.toast("Asegurese de configurar una direccion IP primero", "warning");
        loading.dismiss();
      }

    }

  }

  async guardarNotaEntrega(){
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    this.linesNotaEntrega.forEach(element => {
      console.log("AAAAAAAAAAA", element.nuevoPrecio);
      
       if(element.nuevoPrecio != 0 && element.nuevoPrecio != null){
         element.precio = element.nuevoPrecio;
         element.priceO = element.nuevoPrecio;
         element.totalItem = element.nuevoPrecio * element.cantidad
       } else{
        element.precio =element.precio;
        element.priceO = element.price;
        element.totalItem = element.precio * element.cantidad;
       }
    });


    console.log("=====>", this.linesNotaEntrega);
    this.http.put(this.apiService.getNotaEntrega+this.notaEntrega['numeroD']+"/items", this.linesNotaEntrega).subscribe(res=>{
      console.log("RES =>", res);
      this.apiService.toast("Precios actualizados con exitos", "success");
      this.linesNotaEntrega.length = 0;
      this.input.value = '';
      this.mostrarInfo = false;
      setTimeout(() => {
         this.input.setFocus(); 
      }, 50);
      loading.dismiss();
    },(error)=>{
      loading.dismiss();
      console.log("ERROR =>", error.error);
      this.apiService.toast("Ha ocurrido un error al intentar actualizar los precios", "danger");
    })
  }
  async abrirReporte(){
    const modal = await this.modalController.create({
      component: ModalReportePage,
      cssClass: 'modalReporte'
    })
    modal.present();
  }

  home(){
    this.router.navigate(['/home'])
  }
}