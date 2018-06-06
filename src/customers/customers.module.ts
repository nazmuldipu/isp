import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { CustomerSubNavbarComponent } from './containers/customer-sub-navbar/customer-sub-navbar.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AddCustomerComponent } from './containers/add-customer/add-customer.component';
import { IspAuthGuard } from 'shared/services/isp-auth-guard.service';
import { CustomerDetailsComponent } from './containers/customer-details/customer-details.component';
import { InactiveCustomerListComponent } from './containers/inactive-customer-list/inactive-customer-list.component';
import { CustomerImagesComponent } from './containers/customer-images/customer-images.component';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { SharedModule } from 'shared/shared.module';
import { CustomerListChildComponent } from './components/customer-list-child/customer-list-child.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { CustomerFormComponent } from './components/customer-form/customer-form.component';

@NgModule({
  imports: [
    SharedModule,
    Ng2ImgMaxModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        component: CustomerComponent,
        children: [
          {
            path: '',
            component: CustomersComponent,
            canActivate: [IspAuthGuard]
          },
          {
            path: 'new',
            component: AddCustomerComponent,
            canActivate: [IspAuthGuard]
          },
          {
            path: 'new/:id',
            component: AddCustomerComponent,
            canActivate: [IspAuthGuard]
          },
          {
            path: 'details/:id',
            component: CustomerDetailsComponent,
            canActivate: [IspAuthGuard]
          },
          {
            path: 'images/:id',
            component: CustomerImagesComponent,
            canActivate: [IspAuthGuard]
          },
          {
            path: 'inactive',
            component: InactiveCustomerListComponent,
            canActivate: [IspAuthGuard]
          }
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    CustomerComponent,
    CustomersComponent,
    CustomerSubNavbarComponent,
    AddCustomerComponent,
    CustomerDetailsComponent,
    InactiveCustomerListComponent,
    CustomerImagesComponent,
    CustomerListChildComponent,
    CustomerFormComponent
  ]
})
export class CustomersModule {}
