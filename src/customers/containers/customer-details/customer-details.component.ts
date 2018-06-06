import 'rxjs/add/operator/map';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit, OnDestroy {
  id;
  customer: Customer;
  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    if (this.id) {
      this.customerService.get(this.id).subscribe(data => {
        this.customer = data as Customer;
        this.customer.id = this.id;
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
