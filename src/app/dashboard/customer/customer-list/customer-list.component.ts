import { Component, OnInit, OnDestroy } from '@angular/core';
import { CustomerService } from 'shared/services/customer.service';
import { Customer } from 'shared/models/customer.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit, OnDestroy {
  companyId;
  customers: Customer[] = [];
  message = '';
  errorMessage = '';
  subscription: Subscription;

  constructor(
    private customerService: CustomerService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    if (this.companyId) {
      this.subscription = await this.customerService.getActiveCompanyCustomer(this.companyId)
        .subscribe(data => {
          this.customers = [];
          data.forEach(resp => {
            let comp = resp.payload.doc.data() as Customer;
            comp.id = resp.payload.doc.id;
            this.customers.push(comp);
          });
        })
    }
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
          this.message = "Customer deactivated";
        })
        .catch((error) => {
          this.errorMessage = "Customer deactivation ERROR ! ", error;
          console.log("Customer deactivation ERROR ! ", error);
        });
    }
  }

}
