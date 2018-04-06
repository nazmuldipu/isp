import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { IspAuthGuard } from 'shared/services/isp-auth-guard.service';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '', component: DashboardComponent,
        children: [
          { path: 'index', component: IndexComponent },
          { path: 'user', loadChildren:'app/dashboard/user/user.module#UserModule', canActivate:[AdminAuthGuard]},
          { path: 'company', loadChildren:'app/dashboard/company/company.module#CompanyModule', canActivate:[AdminAuthGuard]},
          { path: 'customer', loadChildren:'app/dashboard/customer/customer.module#CustomerModule', canActivate:[AuthGuard, IspAuthGuard]},
          { path: 'accounting', loadChildren:'app/dashboard/accounting/accounting.module#AccountingModule', canActivate:[AuthGuard, IspAuthGuard]},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    DashboardComponent,
    IndexComponent,
    DashboardNavbarComponent,
  ]
})
export class DashboardModule { }
