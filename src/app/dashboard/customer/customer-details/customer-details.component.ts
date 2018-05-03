import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  id;
  customer;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.getCustomer(this.id);
  }

  ngOnInit() {
  }

  async getCustomer(id){
    this.customerService.get(id).take(1)
    .subscribe(data =>{
      this.customer = data as Customer;
      this.customer.id = this.id;
    })
  }

}
