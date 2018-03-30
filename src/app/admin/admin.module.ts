import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { AdminComponent } from './admin.component';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'shared/shared.module';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';

@NgModule({
  imports: [
    SharedModule,
    NgbModule,
    RouterModule.forChild([
      {
        path: '', component: AdminComponent,
        children: [
          { path: 'index', component: IndexComponent },
          { path: 'user', loadChildren:'app/admin/user/user.module#UserModule'},
          { path: 'company', loadChildren:'app/admin/company/company.module#CompanyModule'},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    IndexComponent,
    AdminComponent,
    AdminNavbarComponent,
  ],
  providers: [
  ]
})
export class AdminModule { }
