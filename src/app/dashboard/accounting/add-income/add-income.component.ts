import { Component, OnInit } from '@angular/core';
import { CashBookService } from 'shared/services/cash-book.service';
import { Subscription } from 'rxjs/Subscription';
import { Cashbook } from 'shared/models/cashbook.model';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {
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
        });
    }
  }

  saveIncome(income){
    // Adjust Cashbook object
    this.cashbook.credit = 0;
    this.cashbook.companyId = this.companyId;
    let balance = this.lastCashbook.balance + this.cashbook.debit - this.cashbook.credit;
    this.cashbook.balance = balance;
    delete this.cashbook["id"];
    delete this.cashbook["ref"];
    

    // Save the income
    this.cashbookService.create(this.cashbook)
      .then(res => {
        this.clear();
        this.message = 'Income Saved';
      })
      .catch(error =>{
        this.clear();
        this.errorMessage = 'Income saving errro!!' + error;
        console.log('Income saving error!! ', error);
      })
  }

  clear(){
    this.cashbook = new Cashbook();
    this.cashbook.date = new Date();
    this.message = '';
    this.errorMessage = '';
  }

}
