import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  dataSelected: any;
  clockIn: any;
  clockOut: any;
  totalHours: any;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.dataSelected = this.route.snapshot.params
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
}
