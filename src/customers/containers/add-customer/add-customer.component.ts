import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerLedger } from 'shared/models/customer-ledger.model';
import { Customer } from 'shared/models/customer.model';
import { CustomerLedgerService } from 'shared/services/customer-ledger.service';
import { CustomerService } from 'shared/services/customer.service';
import { SmsService } from 'shared/services/sms.service';
import { Company } from 'shared/models/company.model';
import { CompanyService } from 'shared/services/company.service';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss']
})
export class AddCustomerComponent implements OnInit {
  customer$: Observable<Customer>;

  companyId;
  customerId;
  company: Company;
  showSpiner = false;
  message = '';
  errorMessage = '';

  constructor(
    private store: Store<fromStore.ProductsState>,
    private customerService: CustomerService,
    private companyService: CompanyService,
    private customerLedgerService: CustomerLedgerService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private smsService: SmsService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    this.customer$ = this.store.select(fromStore.getSelectedCustomer);

    // Load companyinfo for sms
    if (this.companyId) {
      this.getCompanyInfo(this.companyId);
    }
  }

  async getCompanyInfo(companyId) {
    await this.companyService
      .get(companyId)
      .take(1)
      .subscribe(data => {
        this.company = data as Company;
        this.company = companyId;
      });
  }

  // async getCustomer(id) {
  //   await this.customerService
  //     .get(id)
  //     .take(1)
  //     .subscribe(data => {
  //       this.customer = data as Customer;
  //       this.customer.id = id;
  //     });
  // }

  onCreate(event: Customer) {
    this.showSpiner = true;
    event.companyId = this.companyId;
    event.balance = event.monthlyBill + event.connectionFee;
    this.removeEmpty(event);
    this.removeEmpty(event.prAddress);
    event.active = true;
    this.customerService.create(event).then(ref => {
      event.id = ref.id;
      this.message = 'Customer Saved; ';

      //Send Registration SMS
      if (this.company) {
        this.smsService.sendRegistrationSMS(event, this.company);
      }

      // Create customer ledger
      this.createCustomerLedger(event);
    });
  }

  onUpdate(event: Customer) {
    this.showSpiner = true;
    this.customerService
      .update(event.id, event)
      .then(() => {
        this.showSpiner = false;
        this.message = 'Customer Updated';
        this.router.navigate(['/customers']);
      })
      .catch(error => {
        this.errorMessage = 'Customer Updating ERROR ! ' + error;
        console.log('Customer Updating ERROR ! ', error);
      });
  }

  onRemove(event: Customer) {
    console.log('remove', event);
  }

  createCustomerLedger(customer: Customer) {
    let cLedger = new CustomerLedger(
      null,
      null,
      null,
      customer.id,
      new Date(),
      'Connection fee + One month bill',
      null,
      customer.balance,
      0,
      customer.balance
    );
    this.removeEmpty(cLedger);
    console.log(cLedger);
    this.customerLedgerService
      .create(cLedger)
      .then(() => {
        this.message += 'Customer Ledger created';
        this.showSpiner = false;
        this.router.navigate(['/customers']);
      })
      .catch(error => console.log('customer ledger could not save; '));
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
  }

  removeEmpty(obj) {
    Object.keys(obj).forEach(
      key => (obj[key] == null || obj[key] == '') && delete obj[key]
    );
  }
}
