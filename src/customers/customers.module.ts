import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Ng2ImgMaxModule } from 'ng2-img-max';
import { IspAuthGuard } from 'shared/services/isp-auth-guard.service';
import { SharedModule } from 'shared/shared.module';

import { CustomerFormComponent } from './components/customer-form/customer-form.component';
import { CustomerListChildComponent } from './components/customer-list-child/customer-list-child.component';
import { AddCustomerComponent } from './containers/add-customer/add-customer.component';
import { CustomerDetailsComponent } from './containers/customer-details/customer-details.component';
import { CustomerImagesComponent } from './containers/customer-images/customer-images.component';
import { CustomerSubNavbarComponent } from './containers/customer-sub-navbar/customer-sub-navbar.component';
import { CustomersComponent } from './containers/customers/customers.component';
import { InactiveCustomerListComponent } from './containers/inactive-customer-list/inactive-customer-list.component';
import { CustomerComponent } from './customer.component';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { effects, reducers } from './store';

// Guards
import * as fromGuards from './guards';

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
            canActivate: [IspAuthGuard, fromGuards.CustomersGuard]
          },
          {
            path: 'new',
            component: AddCustomerComponent,
            canActivate: [IspAuthGuard, fromGuards.CustomersGuard]
          },
          {
            path: 'new/:customerId',
            component: AddCustomerComponent,
            canActivate: [IspAuthGuard, fromGuards.CustomerExistsGuard]
          },
          {
            path: 'details/:customerId',
            component: CustomerDetailsComponent,
            canActivate: [IspAuthGuard, fromGuards.CustomerExistsGuard]
          },
          {
            path: 'images/:customerId',
            component: CustomerImagesComponent,
            canActivate: [IspAuthGuard, fromGuards.CustomerExistsGuard]
          },
          {
            path: 'inactive',
            component: InactiveCustomerListComponent,
            canActivate: [IspAuthGuard, fromGuards.CustomersGuard]
          }
        ]
      },
      { path: '**', redirectTo: '/' }
    ]),
    StoreModule.forFeature('customers', reducers),
    EffectsModule.forFeature(effects)
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
  ],
  providers: [...fromGuards.guards]
})
export class CustomersModule {}
