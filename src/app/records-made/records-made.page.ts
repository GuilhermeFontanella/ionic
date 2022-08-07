import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as data from '../../mockData/employee-records/RecordsData.json';
import { IonAccordionGroup, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-records-made',
  templateUrl: './records-made.page.html',
  styleUrls: ['./records-made.page.scss'],
})
export class RecordsMadePage implements OnInit {
  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  data = data;
  dataFiltered;
  showOriginalData: boolean = true;
  showDataFiltered: boolean = false;

  constructor(
    private router: Router,
    private loadingController: LoadingController
    ) {
  }

  ngOnInit() {    
  }

  selectedItem(d) {
    this.router.navigate([`/records-made/edit/${d.id}`, d]);
    console.log(d);
  }

  filter(period: number) {
    // SIMULANDO UMA REQ AO BD
    this.showOriginalData = false;
    this.showDataFiltered = false;
    this.showLoading();
    setTimeout(() => {
      this.dataFiltered = this.data.employee123.slice(-period);
      this.showOriginalData = false;
      this.showDataFiltered = true;
      this.toggleAccordion();
    }, 1000);
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
      duration: 1000,
      spinner: 'circles',
    });

    loading.present();
  }
  
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'first') {
      nativeEl.value = undefined;
    }
  };

}
