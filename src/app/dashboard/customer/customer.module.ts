import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerSubNavbarComponent } from './containers/customer-sub-navbar/customer-sub-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCustomerComponent } from './containers/add-customer/add-customer.component';
import { CustomerListComponent } from './containers/customer-list/customer-list.component';
import { IspAuthGuard } from 'shared/services/isp-auth-guard.service';
import { CustomerDetailsComponent } from './containers/customer-details/customer-details.component';
import { InactiveCustomerListComponent } from './containers/inactive-customer-list/inactive-customer-list.component';
import { CustomerImagesComponent } from './containers/customer-images/customer-images.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SharedModule } from 'shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomerListChildComponent } from './components/customer-list-child/customer-list-child.component';

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
    CustomerImagesComponent,
    CustomerListChildComponent
  ]
})
export class CustomerModule { }
