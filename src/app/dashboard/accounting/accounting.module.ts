import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountingComponent } from './accounting.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { CustomerLedgerComponent } from './customer-ledger/customer-ledger.component';
import { CashbookComponent } from './cashbook/cashbook.component';
import { RouterModule } from '@angular/router';
import { AccountingSubNavbarComponent } from './accounting-sub-navbar/accounting-sub-navbar.component';
import { FormsModule } from '@angular/forms';
import { InvoiceListComponent } from './invoice-list/invoice-list.component';
import { AddIncomeComponent } from './add-income/add-income.component';
import { AddExpenseComponent } from './add-expense/add-expense.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: AccountingComponent,
        children: [
          { path: 'invoice', component:  InvoiceComponent},
          { path: 'invoice-list', component:  InvoiceListComponent},
          { path: 'customer-ledger', component:  CustomerLedgerComponent},
          { path: 'add-income', component:  AddIncomeComponent},
          { path: 'add-expense', component:  AddExpenseComponent},
          { path: 'cashbook', component:  CashbookComponent},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    AccountingComponent,
    InvoiceComponent,
    CustomerLedgerComponent,
    CashbookComponent,
    AccountingSubNavbarComponent,
    InvoiceListComponent,
    AddIncomeComponent,
    AddExpenseComponent
  ]
})
export class AccountingModule { }
