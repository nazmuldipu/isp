import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounting',
  styles: [`
    .container{min-height: calc(100vh - 65px);}
  `],
  template: `
    <div class="container bg-white raised">
      <accounting-sub-navbar></accounting-sub-navbar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AccountingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
