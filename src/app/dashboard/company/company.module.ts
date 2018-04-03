import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CompanyListChildComponent } from 'shared/components/company-list-child/company-list-child.component';

import { AddCompanyComponent } from './add-company/add-company.component';
import { BuySmsComponent } from './buy-sms/buy-sms.component';
import { CompanySubNavbarComponent } from './company-sub-navbar/company-sub-navbar.component';
import { CompanyComponent } from './company.component';
import { CustomerLimitComponent } from './customer-limit/customer-limit.component';
import { PerMonthCostComponent } from './per-month-cost/per-month-cost.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: CompanyComponent,
        children: [
          { path: 'add-company', component:  AddCompanyComponent},
          { path: 'buy-sms', component:  BuySmsComponent},
          { path: 'customer-limit', component:  CustomerLimitComponent},
          { path: 'per-month-cost', component:  PerMonthCostComponent},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    CompanyComponent, 
    AddCompanyComponent,
    CompanySubNavbarComponent,
    CompanyListChildComponent,
    BuySmsComponent,
    CustomerLimitComponent,
    PerMonthCostComponent
  ]
})
export class CompanyModule { }
