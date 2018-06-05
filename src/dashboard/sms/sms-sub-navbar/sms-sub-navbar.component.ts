import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sms-sub-navbar',
  templateUrl: './sms-sub-navbar.component.html',
  styleUrls: ['./sms-sub-navbar.component.scss']
})
export class SmsSubNavbarComponent implements OnInit {
  active = 1; 

  constructor() { }

  ngOnInit() {
  }

  makeActive(id){
    this.active = id;
  }

}
