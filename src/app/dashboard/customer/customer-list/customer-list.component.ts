import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css'],
})
export class CustomerListComponent implements OnInit, OnDestroy {
  companyId;
  customers: Customer[] = [];
  message = '';
  errorMessage = '';
  subscription: Subscription;
  showSpiner = false;
  state = 'active';

  constructor(
    private customerService: CustomerService,
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    
      this.showSpiner = true;
      this.subscription = await this.customerService.customers$
        .subscribe(item => {
          this.customers = item.filter(cus => cus.active == true);
          this.showSpiner = false;
        });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deactivateCustomer(id) {
    let customer = this.customers.find(cu => cu.id === id);
    customer.active = false;
    if (customer.id) {
      this.customerService.update(customer.id, customer)
        .then(() => {
          this.customers.splice(this.customers.findIndex(cus => cus.id == id),1);
          this.message = "Customer deactivated";
        })
        .catch((error) => {
          this.errorMessage = "Customer deactivation ERROR ! ", error;
          console.log("Customer deactivation ERROR ! ", error);
        });
    }
  }

}
