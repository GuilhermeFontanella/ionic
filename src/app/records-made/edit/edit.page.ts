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
  message = '';
  dataSelected: any;
  clockIn: any;
  clockOut: any;
  totalHours: any;
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
    /**
     * Return data from route and set to array,
     * setTimeOut simulates an async func.
     */
    this.dataSelected = this.route.snapshot.params;
    setTimeout(() => {
      this.calculateTotalHours();
    }, 300);
  }

  /**
   * get data of entrance and go out and do the math
   * @returns string
   */
  calculateTotalHours(): string {
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

  /**
   * get data from item selected on the list
   * @param d
   */
  selectedItem(d): void {
    let dateSelected;
    this.showModal();
    this.presentAlert(
      'Important', '', "If you change this register, you'll must justificate the edition", ['OK']
    );
    dateSelected = Date.parse(d);
    this.date = new Date(dateSelected).toISOString();  
    this.date = this.date.toString();
  }

  showModal(): void {
    this.modal.present();
  }

  cancel(): void {
    this.modal.dismiss(null, 'cancel'); 
  }

  confirm(): void {
    this.modal.dismiss('this.name', 'confirm');
    this.saveData();
  }

  /**
   * do nothig, but in real life would communicate with API and POST data
   */
  async saveData(): Promise<any> {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 3000,
      icon: 'checkmark-circle',
      message: 'Your Attendance was edited successfuly!',
    });
    await toast.present();
  }

  onWillDismiss(event: Event): void {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async presentAlert(
    header: string, subHeader: string, message: string, buttons: any[]
  ) {
    const alert = await this.alert.create(
      { header, subHeader, message, buttons }
    );
    await alert.present();
  }
}
