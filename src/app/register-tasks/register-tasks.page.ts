import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, IonModal, LoadingController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-register-tasks',
  templateUrl: './register-tasks.page.html',
  styleUrls: ['./register-tasks.page.scss'],
})
export class RegisterTasksPage implements OnInit {
  @ViewChild(IonModal) modal: IonModal;
   data = [];
   taskSelected;
   valueName: string = '';
   valueCode: string = '';
   form: FormGroup;
   name: string;
   message: string;
   newTask: boolean = false;
   showHtml: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private alert: AlertController,
    private loadingController: LoadingController
    ) { }

  ngOnInit() {
    // SIMULATING REQUEST and RESPONSE FROM API
    this.showLoading(1000);
    setTimeout(() => {
      this.data = [
        { id: 1, name: 'Coding', projectCode: '123ABC' },
        { id: 2, name: 'Meetings', projectCode: '123ABC' },
        { id: 3, name: 'Daily Meetings', projectCode: '123ABC' }
      ]
    }, 1500);
  }

  createForm(data?: any): void {
    this.form = this.formBuilder.group({
      id: [data?.id],
      name: [data?.name, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      projectCode: [data?.projectCode, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]]
    })
  }

  selectedItem(d): void {
    this.newTask = false;
    this.showLoading(300);
    setTimeout(() => {
      this.showModal(d);
      this.valueName = d.name;
      this.valueCode = d.projectCode;
      this.createForm(d);
    }, 500)
  }

  addNewTask(): void {
    this.showModal();
    this.createForm();
    this.newTask = true;
  }

  showModal(taskSelected?: any): void {
    this.modal.present();
    this.taskSelected = taskSelected;
  }

  register(): void {
    if(!this.newTask){
      const id = this.form.get('id').value
      const index = this.data.findIndex((element) => element.id === id)
      this.data[index] = this.form.value;
      
    } else {
      const lastItem = this.data.length;
      const lasId = this.data[lastItem - 1].id;
      const newTask = {
        id: lasId+1,
        name: this.form.get('name').value,
        projectCode: this.form.get('projectCode').value
      }
      this.data.push(...[newTask]);
      console.log(this.data)
    }
    this.confirm();
    this.newTask = false;
    this.showLoading(500);
  }

  askFordelete() {
    this.presentAlert('Warning', 'This action will delete a task', 'Do you really want to delete this task?',
    [{ text: 'Yes', handler: () => this.delete() }, { text: 'No' }]);
  }

  delete() {
    const id = this.form.get('id').value;
    this.data = this.data.filter((item) => item.id !== id); 
    console.log(this.data); 
    this.confirm();
    this.showLoading(500);
  }

  confirm(): void {
    this.modal.dismiss(this.name, 'confirm');
  }

  cancel(): void {
    this.modal.dismiss(null, 'cancel'); 
  }

  onWillDismiss(event: Event): void {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  async presentAlert(
    header: string, subHeader: string, message: string, buttons: any[]
  ): Promise<any> {
    const alert = await this.alert.create(
      { header, subHeader, message, buttons }
    );
    await alert.present();
  }

  async showLoading(duration?: number): Promise<any> {
    const loading = await this.loadingController.create(
      { message: 'Loading...', duration: duration, spinner: 'circles' }
    );
    loading.present();
  }

}
