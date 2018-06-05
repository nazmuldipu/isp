import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  styles: [
    `
      .container {
        min-height: calc(100vh - 65px);
      }
    `
  ],
  template: `
    <dashboard-navbar></dashboard-navbar>
    <div class="container bg-white raised">
      <customer-sub-navbar></customer-sub-navbar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class CustomerComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
