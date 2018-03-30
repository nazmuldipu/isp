import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Company } from 'shared/models/company';

@Component({
  selector: 'company-list-child',
  templateUrl: './company-list-child.component.html',
  styleUrls: ['./company-list-child.component.css']
})
export class CompanyListChildComponent implements OnInit {

  @Input('companies') companies: Company[];
  @Output() edit: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  editCompany(id) {
    this.edit.emit(id);
  }

}
