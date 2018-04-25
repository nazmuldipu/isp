import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Address } from 'shared/models/address.model';
import { Company } from 'shared/models/company.model';
import { Customer } from 'shared/models/customer.model';
import { User } from 'shared/models/user.model';
import { AuthService } from 'shared/services/auth.service';
import { CustomerService } from 'shared/services/customer.service';
import { CustomerLedgerService } from 'shared/services/customer-ledger.service';
import { CustomerLedger } from 'shared/models/customer-ledger.model';

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
    // private companyService: CompanyService,
    private authService: AuthService,
    private customerService: CustomerService,
    private customerLedgerService: CustomerLedgerService,
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

  getCustomer(id) {
    this.customerService.get(id).take(1)
      .subscribe(data => {
        this.customer = data;
        this.customer.companyId = this.companyId;
        this.customer.id = id;
      })
  }

  saveCustomer(customer: NgForm) {
    let balance = this.customer.monthlyBill + this.customer.connectionFee;
    let newCustomer = JSON.parse(JSON.stringify(this.customer))//remove all null values from object

    if (!newCustomer.id) {
      this.customerService.create(newCustomer)
        .then((ref) => {
          this.message = "Customer Saved";

          //after create new customer create customer ledger
          let cLedger = new CustomerLedger(null, ref.id, new Date(), 'Connection fee + One month bill', null, balance, 0, balance);
          delete cLedger["id"];
          cLedger = JSON.parse(JSON.stringify(cLedger))//remove all null values from object
          cLedger.date = new Date();
          this.customerLedgerService.create(cLedger)
            .then(() => this.message += 'Customer Ledger created')
            .catch((error) => console.log('customer ledger could not save'));

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
