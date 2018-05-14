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
  customers: Customer[] = [];
  customer: Customer;
  ledgers: CustomerLedger[] = [];
  
  constructor(
    private customerService: CustomerService,
    private customerLedgerService: CustomerLedgerService,
  ) {
  }

  ngOnInit() {}

  search($event) {
    let q = $event.target.value;
    this.customers = [];
    if (q) {
      this.customerService.customers$
        .subscribe(cus => {
          let search = cus.filter(ci => ci.name.toLowerCase().indexOf(q.toLowerCase()) > -1).slice(0, 5);
          search.forEach(cus => {
            this.customers.push(cus);
          })
        })
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
