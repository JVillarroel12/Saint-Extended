import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-change-ip',
  templateUrl: './modal-change-ip.page.html',
  styleUrls: ['./modal-change-ip.page.scss'],
})
export class ModalChangeIpPage implements OnInit {
  formIP: FormGroup;
  ip = localStorage.getItem("saintIP");
  @ViewChild('input', { static: false }) input: IonInput;
  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    console.log("IP =>", this.ip);
    
    this.formIP = this.formBuilder.group({
      IP: [this.ip, Validators.required]
    })
  }
  guardarIp(){
    let formValue = this.formIP.value;

    if(formValue.IP != '' || formValue.IP != null || formValue.IP != undefined){

      localStorage.setItem("saintIP", formValue.IP);
      console.log("IP SALIENDO =>", formValue.IP);
      
      this.modalController.dismiss({
        IP: 'SI'
      });
    }
  }
  ionViewWillEnter(){
    setTimeout(() => {
      this.input.setFocus();  
    }, 50);
  }
  guardarIPPress(_event){
    if(_event == '13'){
      this.guardarIp();
    }
  }
  closeModal(){
    this.modalController.dismiss();
  }
}
