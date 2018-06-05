import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  // templateUrl: './user.component.html',
  styles: [`
    .container{min-height: calc(100vh - 65px);}
  `],
  template: `
    <div class="container bg-white raised">
      <user-sub-navbar></user-sub-navbar>
      <router-outlet></router-outlet>
    </div>
  `
})
export class UserComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  
}
