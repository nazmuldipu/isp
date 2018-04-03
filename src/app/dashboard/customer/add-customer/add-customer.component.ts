import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Address } from 'shared/models/address.model';
import { Company } from 'shared/models/company.model';
import { Customer } from 'shared/models/customer.model';
import { User } from 'shared/models/user.model';
import { AuthService } from 'shared/services/auth.service';
import { CompanyService } from 'shared/services/company.service';
import { CustomerService } from 'shared/services/customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  editing = false;
  companyId;
  customerId;
  customer: Customer;
  companies: Company[] = [];
  subscription: Subscription;
  message = '';
  errorMessage = '';

  constructor(
    private companyService: CompanyService,
    private authService: AuthService,
    private customerService: CustomerService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.customer = new Customer();
    this.customer.prAddress = new Address();
    this.customer.active = false;

    this.editing = activeRoute.snapshot.params['mode'] == 'edit';
    if (this.editing) {
      this.getCustomer(activeRoute.snapshot.params['id']);
    }
  }

  async ngOnInit() {
    this.subscription = await this.authService.getUser$()
      .subscribe(async user$ => {
        if (user$) {
          this.subscription = await this.authService.getUser(user$.uid)
            .subscribe(async data => {
              let user = data as User;
              this.companyId = user.companyId;
              this.customer.companyId = user.companyId
            });
        }
      });
  }



  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCustomer(id){
    this.customerService.get(id).take(1)
    .subscribe( data=>{
      this.customer = data;
      this.customer.companyId = this.companyId;
      this.customer.id = id;
    })
  }

  saveCustomer(customer: NgForm) {
    console.log(customer);
    let newCustomer = JSON.parse(JSON.stringify(this.customer))//remove all null values from object
    console.log(newCustomer.id);
    if (!newCustomer.id) {
      this.customerService.create(newCustomer)
        .then(() => {
          this.message = "Customer Saved";
          this.router.navigate(['/dashboard/customer/customer-list']);
        })
        .catch((error) => {
          this.errorMessage = "Customer SAVING ERROR ! ", error;
          console.log("Customer SAVING ERROR ! ", error);
        });
      this.clear();
    }
    else {
      this.customerService.update(newCustomer.id, newCustomer)
        .then(() => {
          this.message = "Customer Updated";
          this.router.navigate(['/dashboard/customer/customer-list']);
        })
        .catch((error) => {
          this.errorMessage = "Customer Updating ERROR ! ", error;
          console.log("Customer Updating ERROR ! ", error);
        });
      this.clear();
    }
  }

  clear() {
    this.customer = new Customer();
    this.customer.prAddress = new Address();
    this.message = '';
    this.errorMessage = '';
  }
}
