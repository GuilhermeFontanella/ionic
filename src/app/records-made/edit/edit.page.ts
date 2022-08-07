import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  dataSelected: any;
  clockIn: any;
  clockOut: any;
  totalHours: any;
  newDate: any;
  date: any;
  maxDate = new Date().toISOString();
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  constructor(
    private route: ActivatedRoute,
    private toastController: ToastController,
    private alert: AlertController
  ) { }

  ngOnInit() {
    this.dataSelected = this.route.snapshot.params;
    setTimeout(() => {
      this.calculateTotalHours();
      console.log(this.totalHours)
    }, 300);
  }

  calculateTotalHours() {
    let hours;
    let mins;
    this.totalHours = 0;
    this.clockIn = Date.parse(this.dataSelected.clockIn).toString();
    this.clockOut = Date.parse(this.dataSelected.clockOut);
    let diff = (this.clockOut - this.clockIn);
    this.totalHours = (diff / 1000) / 3600 ;
    this.totalHours = this.totalHours.toFixed(2);
    if (this.totalHours?.length > 4) {
        hours = `${this.totalHours.charAt(0)}${this.totalHours.charAt(1)}`;
        mins = `:${this.totalHours.charAt(3)}${this.totalHours.charAt(4)}`;
    } else {
        hours = `${this.totalHours.charAt(0)}`;
        mins = `:${this.totalHours.charAt(2)}${this.totalHours.charAt(3)}`;
    }
    return this.totalHours = `${hours}${mins}`;
  }

  selectedItem(d) {
    let dateSelected;
    this.showModal();
    this.presentAlert(
      'Important',
      '',
      "If you change this register, you'll must justificate the edition",
      ['OK']
    );
    dateSelected = Date.parse(d);
    
    this.date = new Date(dateSelected).toISOString();  
    this.date = this.date.toString();
  }

  showModal() {
    this.modal.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel'); 
  }

  confirm() {
    this.modal.dismiss('this.name', 'confirm');
    this.saveData();
    // console.log(this.form.value)
    // console.log(this.dateNow);
    console.log(this.newDate);
  }

  async saveData() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 3000,
      icon: 'checkmark-circle',
      message: 'Your Attendance was edited successfuly!',
    });
    await toast.present();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async presentAlert(
    header: string, 
    subHeader: string, 
    message: string, 
    buttons: any[]
  ) {
    const alert = await this.alert.create({
      header,
      subHeader,
      message,
      buttons,
    });

    await alert.present();
  }
}
