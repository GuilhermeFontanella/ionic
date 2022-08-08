import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { 
  ActionSheetController, 
  ActionSheetOptions, 
  AlertController, 
  IonModal, 
  LoadingController, 
  ToastController 
} from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ListData } from 'src/shared/models/ListData.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
  form: FormGroup;
  optionButton: ActionSheetOptions;
  message = '';
  name: string;
  dateNow;
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
  listData: ListData[] = [];
  justificative: boolean = false;
  textJustificative: string;
  

  constructor(
    public actionSheetController: ActionSheetController,
    private toastController: ToastController,
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private loadingController: LoadingController
    ) {}

  ngOnInit(): void {
    this.cretaeForm();
    this.dateNow = new Date();
  }

  cretaeForm(): void {
    this.form = this.formBuilder.group({
      employeeEnrollment: [null, [Validators.required, Validators.max(9999999)]],
      dateSelected: [],
      justificative: []
    })
  }

  async register(): Promise<any> {
    const actionSheet = await this.actionSheetController.create({
      header: 'What do you want to add?',
      cssClass: 'my-custom-class',
      buttons: [
        { text: 'Clock-in register', icon: 'time', handler: () =>  this.showModal() }, 
        { text: 'Abscence', icon: 'close-circle', data: 10, handler: () =>  this.showModal()  }, 
        { text: 'Off work', icon: 'game-controller', data: 'Data value', handler: () =>  this.showModal()  }, 
        { text: 'Holiday',  icon: 'bed', handler: () => this.showModal() },
        { text: 'Vacation', icon: 'airplane', handler: () =>  this.showModal() }, 
        { text: 'Cancel', icon: '', role: 'cancel', handler: () => {} }
      ]
    });
    await actionSheet.present();
    const { role, data } = await actionSheet.onDidDismiss();
  }

  async showToast(color: string, duration: number, icon: string, message: string): Promise<any> {
    const toast = await this.toastController.create(
      { color, duration, icon, message }
    );
    await toast.present();
  }
  
  saveData(): void {
    const employeeId = this.form.get('employeeEnrollment').value;
    let clockIn;
    let clockOut;
    let timeDiff;

    if (!this.listData.length) {
      // REGISTER NEW CLOCK-IN IF THERE'S NO REGISTER DATA.
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
      this.showLoading();
    } 
    
    else {
      // IF THERE'S AT LEAST ONE REGISTER DATA IT SAVES A CLOCK-OUT.
      // verify if the work period was bigger than 6 hours.
      let goIn = this.listData[0].clockIn;
      let out = Date.parse(this.form.get('dateSelected')?.value) ? this.form.get('dateSelected')?.value : new Date();
      let diff = out - Date.parse(goIn);
      if (diff <= 21600000) {
        // if it's smaller register a clock-out
        clockOut = this.form.get('dateSelected').value ? this.form.get('dateSelected')?.value : new Date(),
        this.listData.push({
          registrationDate: new Date(),
          employeeId,
          clockIn: null,
          clockOut
        })
        this.showToast(
          'dark',
          3000,
          'checkmark-circle',
          'Your Attendance was registered!'
        );
        this.closeModal();
        this.showLoading();
      }
      else if (this.textJustificative) {
        this.listData.push({
          registrationDate: new Date(),
          employeeId,
          clockIn: null,
          clockOut: this.form.get('dateSelected').value ? this.form.get('dateSelected')?.value : new Date(),
          justificative: this.textJustificative
        })
        this.showToast(
          'dark',
          3000,
          'checkmark-circle',
          'Your Attendance was registered!'
        );
        this.closeModal();
        this.showLoading();
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

  showModal(): void {
    this.modal.present();
  }

  closeModal(): void {
    this.modal.dismiss(this.name, 'confirm');
  }

  cancel(): void {
    this.modal.dismiss(null, 'cancel'); 
  }

  confirm(): void {
    this.saveData();
  }

  onWillDismiss(event: Event): void {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  setNewDate(event: any): void {
    this.dateNow = event.detail.value;
    this.form.get('dateSelected').setValue(event.detail.value);
  }

  async presentAlert(
    header: string, subHeader: string, message: string, buttons: any[]
  ): Promise<any> {
    const alert = await this.alert.create(
      { header, subHeader, message, buttons }
    );
    await alert.present();
  }

  async showLoading(): Promise<any> {
    const loading = await this.loadingController.create(
      { message: 'Loading...', duration: 1000, spinner: 'circles' }
    );
    loading.present();
  }

}
