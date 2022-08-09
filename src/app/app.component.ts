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
    { title: 'Register Tasks', url: '/register-tasks', icon: 'document-text' },
    { title: 'Generate Report', url: '/building-page', icon: 'print' },
    { title: 'Settings', url: '/building-page', icon: 'construct' },
  ];
  public labels = [];
  constructor() {}
}
