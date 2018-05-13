import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';
import { CompanyService } from 'shared/services/company.service';
import { Company } from 'shared/models/company.model';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  companyId;
  company: Company;
  subscription: Subscription;
  customers: Customer[] = [];

  constructor(
    private customerService: CustomerService,
    private companyService: CompanyService
  ) {
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    if (this.companyId) {
      // Load company info
      this.subscription = await this.companyService.get(this.companyId).take(1)
        .subscribe(
          data => {
            this.company = data;
          },
          error => console.log('ERROR !', error)
        )
      // Load customer list
      this.subscription = await this.customerService.customers$
        .subscribe(item => {
          this.customers = item;
        });
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
