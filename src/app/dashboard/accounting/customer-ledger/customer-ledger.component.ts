import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { CustomerLedger } from 'shared/models/customer-ledger.model';
import { Customer } from 'shared/models/customer.model';
import { CustomerLedgerService } from 'shared/services/customer-ledger.service';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-customer-ledger',
  templateUrl: './customer-ledger.component.html',
  styleUrls: ['./customer-ledger.component.scss']
})
export class CustomerLedgerComponent implements OnInit {
  companyId;
  customers: Customer[] = [];
  customer: Customer;
  ledgers: CustomerLedger[] = [];
  startAt = '';
  endAt = '';

  constructor(
    private customerService: CustomerService,
    private customerLedgerService: CustomerLedgerService,
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  ngOnInit() {
    
  }

  async findCustomers() {
    if (this.companyId) {
      await this.customerService.searchCustomer(this.startAt, this.endAt, this.companyId).take(1)
        .subscribe(data => {
          this.customers = [];
          data.forEach(resp => {
            let comp = resp.payload.doc.data() as Customer;
            comp.id = resp.payload.doc.id;
            this.customers.push(comp);
          });
        });
    }
  }

  search($event) {
    let metaKey = $event.keyCode < 65 || $event.keyCode > 90;
    let q = $event.target.value;
    this.startAt = q;
    this.endAt = q + "\uf8ff";
    if (q && !metaKey) {
      this.findCustomers();
    }
    if (!q) {
      this.customers = [];
      this.ledgers = [];
    }
  }

  async loadCustomerLedger(customerId) {
    this.customer = this.customers.find(cu => cu.id == customerId);
    await this.customerLedgerService.getByCustomerId(customerId).take(1)
      .subscribe(
        data => {
          this.ledgers = [];
          data.forEach(resp => {
            let cled = resp.payload.doc.data() as CustomerLedger;
            cled.id = resp.payload.doc.id;
            this.ledgers.push(cled);
          });
        },
        error => console.log('Customer Ledger loading errro', error)
      )
  }

}
