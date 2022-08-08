import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ActionSheetOptions, AlertController, IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

export interface listData {
    registrationDate: Date,
    employeeId: number,
    clockIn: string,
    clockOut: string
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form: FormGroup;
  optionButton: ActionSheetOptions;
  message = 'This modal example uses triggers to automatically open a modal when the button is clicked.';
  name: string;
  dateNow;
  newDate: any;
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };
  maxDate = new Date().toISOString();
  valueCheckedNow: boolean = true;
  valueCheckedNew: boolean = false;
  listData: listData[] = [];
  justificative: boolean = false
  

  constructor(
    public actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private alert: AlertController
    ) {}

  ngOnInit() {
    this.cretaeForm();
    this.dateNow = new Date();
  }

  cretaeForm() {
    this.form = this.formBuilder.group({
      employeeEnrollment: [null, [Validators.required, Validators.max(9999999)]],
      dateSelected: []
    })
  }

  async register() {
    const actionSheet = await this.actionSheetController.create({
      header: 'What do you want to add?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Clock-in register',
        icon: 'time',
        handler: () => {
          this.showModal()
        }
      }, {
        text: 'Abscence',
        icon: 'close-circle',
        data: 10,
        handler: () => {
          this.showModal();
        }
      }, {
        text: 'Off work',
        icon: 'game-controller',
        data: 'Data value',
        handler: () => {
          this.showModal();
        }
      }, {
        text: 'Holiday',
        icon: 'bed',
        handler: () => {
          this.showModal();
        }
      }, {
        text: 'Vacation',
        icon: 'airplane',
        handler: () => {
          this.showModal();
        },
      }, {
        text: 'Cancel',
        icon: '',
        role: 'cancel',
        handler: () => {},
      }]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }

  async showToast(color: string, duration: number, icon: string, message: string) {
    const toast = await this.toastController.create({
      color,
      duration,
      icon,
      message,
    });
    await toast.present();
  }
  
  saveData() {
    const employeeId = this.form.get('employeeEnrollment').value;
    let clockIn;
    let clockOut;
    let timeDiff;

    if (!this.listData.length) {
      this.listData.push({
        registrationDate: new Date(),
        employeeId: employeeId,
        clockIn: this.form.get('dateSelected')?.value ? this.form.get('dateSelected')?.value : new Date(),
        clockOut: null
      })
      timeDiff = Date.parse(this.form.get('dateSelected')?.value); 
      this.showToast(
        'dark',
        3000,
        'checkmark-circle',
        'Your Attendance was registered!'
      );
      this.closeModal();
      console.log(this.listData);
    } else {
      let clockIn = this.listData[0].clockIn;
      let out = Date.parse(this.form.get('dateSelected').value);
      let diff = out - Date.parse(clockIn);
      if (diff <= 21600000) {
        console.log('entrou aqui diff < 6h')
        clockOut = this.form.get('dateSelected').value ? this.form.get('dateSelected')?.value : new Date(),
        this.listData.push({
          registrationDate: new Date(),
          employeeId,
          clockIn,
          clockOut
        })
        this.showToast(
          'dark',
          3000,
          'checkmark-circle',
          'Your Attendance was registered!'
        );
        this.closeModal();
      }
      else {
        this.presentAlert(
          'Alert',
          'Justificative needed!',
          'You must enter a Justificative.',
          ['OK']
        );
        this.justificative = true;
        return;
      }
    };
    this.cretaeForm();
  }

  showModal() {
    this.modal.present();
  }

  closeModal() {
    this.modal.dismiss(this.name, 'confirm');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel'); 
  }

  confirm() {
    this.saveData();
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setNewDate(event: any) {
    this.dateNow = event.detail.value;
    this.form.get('dateSelected').setValue(event.detail.value);
    console.log(this.form.get('dateSelected').setValue(event.detail.value));
    
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
