import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company',
  styles: [`
    .container{min-height: calc(100vh - 65px);}
  `],
  template: `
    <div class="container bg-white raised">
      <company-sub-navbar></company-sub-navbar>
      <router-outlet></router-outlet>
    </div>
  `
})

// <user-sub-navbar></user-sub-navbar>

export class CompanyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
