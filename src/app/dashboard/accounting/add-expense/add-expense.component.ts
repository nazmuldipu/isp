import { Component, OnInit } from '@angular/core';
import { Cashbook } from 'shared/models/cashbook.model';
import { Subscription } from 'rxjs/Subscription';
import { CashBookService } from 'shared/services/cash-book.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit {

  companyId;
  cashbooks: Cashbook[] = [];
  cashbook: Cashbook;
  lastCashbook: Cashbook;
  subscription: Subscription;
  message = '';
  errorMessage = '';

  constructor(
    private cashbookService: CashBookService
  ) {
    this.cashbook = new Cashbook();
    this.cashbook.date = new Date();
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    if (this.companyId) {
      this.subscription = await this.cashbookService.cashbooks$
        .subscribe(item => {
          this.cashbooks = item;
          this.lastCashbook = this.cashbooks[this.cashbooks.length - 1];
          console.log(this.lastCashbook);
        });
    }
  }

  saveExpense(expense) {
    // Adjust Cashbook object
    this.cashbook.debit = 0;
    this.cashbook.companyId = this.companyId;
    let balance = this.lastCashbook.balance + this.cashbook.debit - this.cashbook.credit;
    this.cashbook.balance = balance;
    delete this.cashbook["id"];
    delete this.cashbook["ref"];

    // Save the Expense
    this.cashbookService.create(this.cashbook)
      .then(res => {
        this.clear();
        this.message = 'Expense Saved';
      })
      .catch(error => {
        this.clear();
        this.errorMessage = 'Expense saving errro!!' + error;
        console.log('Expense saving error!! ', error);
      })
  }

  clear() {
    this.cashbook = new Cashbook();
    this.cashbook.date = new Date();
    this.message = '';
    this.errorMessage = '';
  }

}
