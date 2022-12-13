import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-nota-debito',
  templateUrl: './nota-debito.page.html',
  styleUrls: ['./nota-debito.page.scss'],
})
export class NotaDebitoPage implements OnInit {
  @ViewChild('input', { static: false }) input: IonInput;
  IP = localStorage.getItem("saintIP");
  formNumero: FormGroup;
  mostrarInfo = false;
  notaDebito: any;
  datosCliente: any;
  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public router: Router,
    public loadingController: LoadingController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.formNumero = this.formBuilder.group({
      numero: ['', Validators.required]
    })
    setTimeout(() => {
      this.input.setFocus();  
    }, 100);
  }
  buscarFacturaPress(_event){
    let formValues = this.formNumero.value;
    
    if(_event == "13"){
      if(formValues.numero != '' || formValues.numero != null || formValues.numero != undefined){
        this.getNotaDebito();
      }
    }
  }
  async getNotaDebito(){
    let formValues = this.formNumero.value;

    if(formValues.numero != '' || formValues.numero != null || formValues.numero != undefined){
      const loading = await this.loadingController.create({
        message: 'Cargando...'
      })
      loading.present();
      if(this.IP != null && this.IP != ''){
        this.http.get(this.apiService.getNotaDebito + formValues.numero).subscribe(res=>{
            console.log("RES NOTA DEBITO =>", res);
            this.notaDebito = res;
            this.http.get(this.apiService.getCliente + res['codClie']).subscribe(res=>{
             this.datosCliente = res;
             console.log("CLIENTE =>", this.datosCliente);
              this.mostrarInfo = true;
              loading.dismiss();
            },(error)=>{
              console.log("ERROR", error.eror);
              this.apiService.toast("Ha ocurrido un error obteniendo el cliente", "danger");
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
  async guardarNotaDebito(){
    if(this.notaDebito.length != 0){
      const loading = await this.loadingController.create({
        message: 'Cargando...'
  
      })
      loading.present();
      [this.notaDebito].forEach(element => {
  
         if(element.nuevoPrecioBs != 0 && element.nuevoPrecioBs != null){
           element.saldo = element.nuevoPrecioBs;
           element.monto = element.nuevoPrecioBs;
         } else{
          element.saldo =element.saldo;
          element.monto = element.monto;
         }
  
         if(element.nuevoPrecioDolar != 0 && element.nuevoPrecioDolar != null){
          element.saldoMex = element.nuevoPrecioDolar;
          element.montoMex = element.nuevoPrecioDolar;
        } else{
         element.saldoMex = element.saldoMex;
         element.montoMex = element.montoMex;
        }
      });
  
  
      console.log("=====>", this.notaDebito);
      this.http.put(this.apiService.getNotaDebito+this.notaDebito['nroUnico'], this.notaDebito).subscribe(res=>{
        console.log("RES =>", res);
        this.apiService.toast("Precios actualizados con exitos", "success");
        this.notaDebito.length = 0;
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

  }
  home(){
    this.router.navigate(['/home'])
  }
}
