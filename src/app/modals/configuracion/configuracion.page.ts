import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  mostrarReservaciones = false;
  mostrarIP = false;
  ip = localStorage.getItem('saintIP');
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public modalController: ModalController
  ) {

   }

  ngOnInit() {

    this.form = this.formBuilder.group({
      activarNotaEntrega:[localStorage.getItem('saint-activarNotaEntrega')],
      activarNotaDebito: [localStorage.getItem('saint-activarNotaDebito')],
      IP: [this.ip]
    });
  }

  mostrarElementos(_data){

        if(_data == 'ip'){
          this.mostrarIP = true;
          this.mostrarReservaciones = false;
        }else{
          if(_data == 'reservacion'){
            this.mostrarReservaciones = true;
            this.mostrarIP = false;
        }
      }
  }
  pressGuardar(_event){
    console.log("EVENTTT =>", _event);
    
    if(_event == 13){
      this.guardarConfiguracion();
    }
  }
  guardarConfiguracion(){
    console.log(this.form.value);
    
    // ? IP
    if(this.form.value.IP == null || this.form.value.IP == ''){
      localStorage.setItem('saintIP', this.ip);
    }else{
      localStorage.setItem('saintIP',this.form.value.IP);
    }
    // ?  RESERVACIONES 
    if(this.form.value.activarNotaEntrega == null){
      localStorage.setItem('saint-activarNotaEntrega', 'false');
    }else{
      localStorage.setItem('saint-activarNotaEntrega',this.form.value.activarNotaEntrega);
    }
    if(this.form.value.activarNotaDebito == null){
      localStorage.setItem('saint-activarNotaDebito', 'false');
    }else{
      localStorage.setItem('saint-activarNotaDebito',this.form.value.activarNotaDebito);
    }
    window.location.reload();
  }
  cerralModal(){
    this.modalController.dismiss();
  }
}