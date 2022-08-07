import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActionSheetController, ActionSheetOptions, IonModal, ToastController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

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
  dateNow: any;
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
  

  constructor(
    public actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.cretaeForm();
  }

  cretaeForm() {
    this.form = this.formBuilder.group({
      employeeEnrollment: [null, [Validators.required, Validators.max(9999999)]],
      dateSelected: [new Date().toUTCString()]
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
          console.log('Share clicked');
        }
      }, {
        text: 'Off work',
        icon: 'game-controller',
        data: 'Data value',
        handler: () => {
          console.log('Play clicked');
        }
      }, {
        text: 'Holiday',
        icon: 'bed',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Vacation',
        icon: 'airplane',
        handler: () => {
          console.log('Cancel clicked');
        },
      }, {
        text: 'Cancel',
        icon: '',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        },
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  async saveData() {
    const toast = await this.toastController.create({
      color: 'dark',
      duration: 3000,
      icon: 'checkmark-circle',
      message: 'Your Attendance was registered!',
    });

    await toast.present();
    this.cretaeForm();
  }

  showModal() {
    this.modal.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel'); 
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
    this.saveData();
    console.log(this.form.value)
    console.log(this.dateNow);
    console.log(this.newDate);
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setNewDate(event: any) {
    this.form.get('dateSelected').setValue(event.detail.value);
  }

}
