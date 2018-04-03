import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { CompanyService } from 'shared/services/company.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [],
  providers:[
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    CompanyService
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
