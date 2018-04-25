import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerSubNavbarComponent } from './customer-sub-navbar/customer-sub-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { IspAuthGuard } from 'shared/services/isp-auth-guard.service';
import { CustomerDetailsComponent } from './customer-details/customer-details.component';
import { InactiveCustomerListComponent } from './inactive-customer-list/inactive-customer-list.component';
import { CustomerImagesComponent } from './customer-images/customer-images.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SharedModule } from 'shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    Ng2ImgMaxModule,
    NgbModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: CustomerComponent,
        children: [
          { path: 'add-customer/:mode', component:  AddCustomerComponent, canActivate:[IspAuthGuard]},
          { path: 'add-customer/:mode/:id', component:  AddCustomerComponent, canActivate:[IspAuthGuard]},
          { path: 'customer-details/:id', component:  CustomerDetailsComponent, canActivate:[IspAuthGuard]},
          { path: 'customer-images/:id', component:  CustomerImagesComponent, canActivate:[IspAuthGuard]},
          { path: 'customer-list', component:  CustomerListComponent, canActivate:[IspAuthGuard]},
          { path: 'inactive-customers', component:  InactiveCustomerListComponent, canActivate:[IspAuthGuard]},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    CustomerComponent,
    CustomerSubNavbarComponent,
    AddCustomerComponent,
    CustomerListComponent,
    CustomerDetailsComponent,
    InactiveCustomerListComponent,
    CustomerImagesComponent
  ]
})
export class CustomerModule { }
