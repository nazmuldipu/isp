import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'customer-sub-navbar',
  templateUrl: './customer-sub-navbar.component.html',
  styleUrls: ['./customer-sub-navbar.component.scss']
})
export class CustomerSubNavbarComponent implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit() {
  }
  
  makeActive(id){
    this.active = id;
  }

}
