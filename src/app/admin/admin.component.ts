import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  template: `
  <admin-navbar></admin-navbar>
  <router-outlet></router-outlet>
  `
})
export class AdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
}
