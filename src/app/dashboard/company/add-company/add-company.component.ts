import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from 'shared/models/company';
import { CompanyService } from 'shared/services/company.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit, OnDestroy {
  company: Company;
  companies: Company[] = [];
  subscription: Subscription;
  message = '';
  errorMessage = '';

  constructor(
    private companyService: CompanyService
  ) {
    this.company = new Company();
  }

  async ngOnInit() {
    this.subscription = await this.companyService.getAll()
      .subscribe(data => {
        this.companies = [];
        data.forEach(resp => {
          let comp = resp.payload.doc.data() as Company;
          comp.id = resp.payload.doc.id;
          this.companies.push(comp);
        });
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  editCompany(id) {
    Object.assign(this.company, this.companies.find(cp => cp.id === id));
  }

  save(company) {
    if (!this.company.id) {
      this.companyService.create(company)
        .then(() => {
          this.message = "Company Saved"
        })
        .catch((error) => {
          this.errorMessage = "Company SAVING ERROR ! ", error;
          console.log("Company SAVING ERROR ! ", error);
        });

      this.clear();
    }
    else {
      this.companyService.update(this.company.id, this.company)
        .then(() => {
          this.message = "Company Updated"
        })
        .catch((error) => {
          this.errorMessage = "Company Updating ERROR ! ", error;
          console.log("Company Updating ERROR ! ", error);
        });
      this.clear();
    }
  }

  delete(id) {
    if (confirm('Are you sure to delete')) {
      this.companyService.delete(id)
        .then(() => {
          this.message = "Company Delete"
        })
        .catch((error) => {
          this.errorMessage = "Company Deleting ERROR ! ", error;
          console.log("Company Deleting ERROR ! ", error);
        });
      this.clear();
    }
  }

  clear() {
    this.company = new Company();
    this.message = '';
    this.errorMessage = '';
  }

}
