import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Register', url: '/register', icon: 'time' },
    { title: 'Records Made', url: '/records-made', icon: 'archive' },
    { title: 'Generate Report', url: '/building-page', icon: 'document-text' },
    { title: 'Settings', url: '/building-page', icon: 'construct' },
  ];
  public labels = [];
  constructor() {}
}
