import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sms',
  styles: [`
    .container{min-height: calc(100vh - 65px);}
  `],
  template: `
    <div class="container bg-white raised">
      <sms-sub-navbar></sms-sub-navbar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class SmsComponent{

  constructor() { }

}
