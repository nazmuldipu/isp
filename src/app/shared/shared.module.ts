import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminAuthGuard } from 'shared/services/admin-auth-guard.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { AuthService } from 'shared/services/auth.service';
import { CompanyService } from 'shared/services/company.service';
import { CustomerService } from 'shared/services/customer.service';
import { IspAuthGuard } from 'shared/services/isp-auth-guard.service';
import { StorageService } from 'shared/services/storage.service';
import { CustomerLedgerService } from 'shared/services/customer-ledger.service';
import { InvoiceService } from 'shared/services/invoice.service';
import { CashBookService } from 'shared/services/cash-book.service';

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
    CompanyService,
    IspAuthGuard,
    CustomerService,
    StorageService,
    CustomerLedgerService,
    InvoiceService,
    CashBookService
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }