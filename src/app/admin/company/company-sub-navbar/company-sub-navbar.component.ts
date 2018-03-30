import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'company-sub-navbar',
  templateUrl: './company-sub-navbar.component.html',
  styleUrls: ['./company-sub-navbar.component.scss']
})
export class CompanySubNavbarComponent implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit() {
  }

  makeActive(id){
    this.active = id;
  }

}
