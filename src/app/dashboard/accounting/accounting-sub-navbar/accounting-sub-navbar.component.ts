import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'accounting-sub-navbar',
  templateUrl: './accounting-sub-navbar.component.html',
  styleUrls: ['./accounting-sub-navbar.component.scss']
})
export class AccountingSubNavbarComponent implements OnInit {
  active = 1;
  
  constructor() { }

  ngOnInit() {
  }

  makeActive(id){
    this.active = id;
  }

}
