import 'rxjs/add/operator/take';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'shared/services/customer.service';
import { Customer } from 'shared/models/customer.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-inactive-customer-list',
  templateUrl: './inactive-customer-list.component.html',
  styleUrls: ['./inactive-customer-list.component.css']
})
export class InactiveCustomerListComponent implements OnInit, OnDestroy {
  customers: Customer[] = [];
  message = '';
  errorMessage = '';
  subscription: Subscription;

  constructor(
    private customerService: CustomerService
  ) { }


  async ngOnInit() {
    this.subscription = await this.customerService.getInactiveCustomers()
      .subscribe(data => {
        this.customers = [];
        data.forEach(resp => {
          let cust = resp.payload.doc.data() as Customer;
          cust.id = resp.payload.doc.id;
          this.customers.push(cust);
        });
      });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  activeCustomer(id) {
    let customer = this.customers.find(cu => cu.id === id);
    customer.active = true;
    if (customer.id) {
      this.customerService.update(customer.id, customer)
        .then(() => {
          this.message = "Customer Activated";
        })
        .catch((error) => {
          this.errorMessage = "Customer activation ERROR ! ", error;
          console.log("Customer activation ERROR ! ", error);
        });
    }
  }

}
