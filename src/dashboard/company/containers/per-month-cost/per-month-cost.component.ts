import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from 'shared/models/company.model';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from 'shared/services/company.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-per-month-cost',
  templateUrl: './per-month-cost.component.html',
  styleUrls: ['./per-month-cost.component.css']
})
export class PerMonthCostComponent implements OnInit, OnDestroy {
  companies: Company[];
  subscription: Subscription;

  company: Company;
  message = '';
  errorMessage = '';

  constructor(private companyService: CompanyService) {
    this.company = new Company();
  }

  async ngOnInit() {
    this.subscription = this.companyService.getAll().subscribe(
      data => {
        this.companies = data;
      },
      error => console.log(error)
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editCompany(id: string) {
    const ecompany = this.companies.find(com => com.id === id) as Company;
    Object.assign(this.company, ecompany);
  }

  save(form) {
    if (this.company.id) {
      let newCompany = JSON.parse(JSON.stringify(this.company)); //remove all null values from object
      this.companyService
        .update(this.company.id, newCompany)
        .then(() => {
          this.message = 'Customer Limit changed successfully';
        })
        .catch(error => {
          (this.errorMessage = 'Customer Limit changing failed! '), error;
          console.log('Customer Limit changing failed! ', error);
        });
      this.clear();
    }
  }

  clear() {
    this.message = '';
    this.errorMessage = '';
    this.company = new Company();
  }
}
