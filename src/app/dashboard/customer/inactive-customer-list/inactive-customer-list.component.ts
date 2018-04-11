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
  companyId;
  customers: Customer[] = [];
  message = '';
  errorMessage = '';
  subscription: Subscription;
  showSpiner = false;

  constructor(
    private customerService: CustomerService
  ) {
    this.companyId = localStorage.getItem('companyId');
   }


   async ngOnInit() {
    if (this.companyId) {
      this.showSpiner = true;
      this.subscription = await this.customerService.customers$
        .subscribe(item => {
          this.customers = item.filter(cus => cus.active == false);
          this.showSpiner = false;
        });
    }
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
