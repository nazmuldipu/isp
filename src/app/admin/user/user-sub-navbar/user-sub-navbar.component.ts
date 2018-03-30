import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'user-sub-navbar',
  templateUrl: './user-sub-navbar.component.html',
  styleUrls: ['./user-sub-navbar.component.scss']
})
export class UserSubNavbarComponent implements OnInit {
  active = 1;
  
  constructor() { }

  ngOnInit() {
  }

  makeActive(id){
    this.active = id;
  }

}
