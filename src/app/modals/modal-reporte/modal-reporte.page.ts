import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-modal-reporte',
  templateUrl: './modal-reporte.page.html',
  styleUrls: ['./modal-reporte.page.scss'],
})
export class ModalReportePage implements OnInit {
  formNumero: FormGroup;
  notaEntrega: any;
  contador = 0;
  mostrarInfo = false;
  @ViewChild('input', { static: false }) input: IonInput;
  linesNotaEntrega: any;
  formFecha: FormGroup
  constructor(
    public http: HttpClient,
    public apiService: ApiService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    public formBuilder: FormBuilder,
    public modalController: ModalController
  ) {}
  ngOnInit(){
    this.formNumero = this.formBuilder.group({
      numero: ['', Validators.required]
    })
    this.formFecha = this.formBuilder.group({
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    });
    console.log("IPPPP =>", this.apiService.IP);
  }
  formatDate(_value: string) {
    console.log(_value);
    
    return format(parseISO(_value), 'hh:mm:ss aa yyyy-MM-dd');
  }
  ionViewWillEnter(){
    setTimeout(() => {
      this.input.setFocus();  
    }, 100);
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
      this.http.get(this.apiService.getHistoricoNotaEntrega + formValues.numero).subscribe(res=>{
        console.log("RES NOTA ENTREGA =>", res);
        this.notaEntrega = res;

        this.http.get(this.apiService.getHistoricoNotaEntrega + formValues.numero + "/items").subscribe(res=>{
          console.log("RES LINES NOTA ENTREGA =>", res);
          this.linesNotaEntrega = res;
          this.linesNotaEntrega.forEach(element => {
            element.nuevoPrecio = '';
          });
          loading.dismiss();
          this.mostrarInfo = true;
          this.notaEntrega.forEach(header => {
            header.desplegar = false;
            header.linesModificaciones = [];
            this.linesNotaEntrega.forEach(lines => {
              if(header.id == lines.idfk){
                header.linesModificaciones.push(lines);
              }
            });
            
          });
        },(error)=>{
          console.log("ERROR =>", error.error);
          this.apiService.toast("Ha ocurrido un error obteniendo la nota de entrega", "danger");
          loading.dismiss();
        })
      },(error)=>{
        console.log("ERROR =>", error.error);
        this.apiService.toast("Ha ocurrido un error obteniendo la nota de entrega", "danger");
        loading.dismiss();
      })

    }

  }
  async filtrarHistoricoFecha(){
    let inicio = new Date(this.formFecha.value.fechaInicio).getTime();
    let fin = new Date(this.formFecha.value.fechaFin).getTime();
    console.log("INICIO =>", inicio);
    console.log("FIN =>", fin);
    
    const loading = await this.loadingController.create({
      message: 'Cargando...'

    })
    loading.present();
    this.http.get(this.apiService.getHistoricoFecha+inicio+'/'+fin).subscribe(res=>{
      console.log("RES NOTA ENTREGA =>", res);
      this.notaEntrega = res;

      this.http.get(this.apiService.getHistoricoFecha+inicio+'/'+fin + "/items").subscribe(res=>{
        console.log("RES LINES NOTA ENTREGA =>", res);
        this.linesNotaEntrega = res;
        this.linesNotaEntrega.forEach(element => {
          element.nuevoPrecio = '';
        });
        loading.dismiss();
        this.mostrarInfo = true;
        this.notaEntrega.forEach(header => {
          header.desplegar = false;
          header.linesModificaciones = [];
          this.linesNotaEntrega.forEach(lines => {
            if(header.id == lines.idfk){
              header.linesModificaciones.push(lines);
            }
          });
          
        });
      },(error)=>{
        console.log("ERROR =>", error.error);
        this.apiService.toast("Ha ocurrido un error obteniendo la nota de entrega", "danger");
        loading.dismiss();
      })
    },(error)=>{
      console.log("ERROR =>", error.error);
      this.apiService.toast("Ha ocurrido un error obteniendo la nota de entrega", "danger");
      loading.dismiss();
    })

    
  }
  desplegarLines(_data){
    _data.desplegar = !_data.desplegar;
  }
  cerrarModal(){
    this.modalController.dismiss();
  }
}
