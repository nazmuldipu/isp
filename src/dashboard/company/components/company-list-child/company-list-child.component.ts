import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Company } from 'shared/models/company.model';
import { checkAndUpdateBinding } from '@angular/core/src/view/util';

@Component({
  selector: 'company-list-child',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
