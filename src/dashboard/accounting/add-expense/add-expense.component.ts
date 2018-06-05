import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cashbook } from 'shared/models/cashbook.model';
import { Subscription } from 'rxjs/Subscription';
import { CashBookService } from 'shared/services/cash-book.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent implements OnInit, OnDestroy {

  companyId;
  cashbooks: Cashbook[] = [];
  cashbook: Cashbook;
  lastCashbook: Cashbook;
  subscription: Subscription;
  message = '';
  errorMessage = '';
  lastVisible;
  firstVisible;
  limit: number;

  constructor(
    private cashbookService: CashBookService
  ) {
    this.cashbook = new Cashbook();
    this.cashbook.date = new Date();
    this.companyId = localStorage.getItem('companyId');

    this.limit = 5;
  }

  async ngOnInit() {
    if (this.companyId) {
      this.last();
      this.laodLastCashBook();
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async laodLastCashBook() {
    this.subscription = await this.cashbookService.getCompanyLastCashbook(this.companyId).take(1)
    .subscribe(data => {
      this.lastCashbook= data[0] as Cashbook;
    })
  }

  async getPaginated(companyId, orderBy, order, limit, startAfter){
    this.subscription = await this.cashbookService.getPaginatedStartAfter(companyId, orderBy, order, limit, startAfter)
    .subscribe(data => {
      if (data.length > 0) {
        this.lastVisible = data[data.length - 1].payload.doc.data();
        this.firstVisible = data[0].payload.doc.data();
        
        this.cashbooks = [];
        data.forEach(inv => {
          let cashb = inv.payload.doc.data() as Cashbook;
          cashb.id = inv.payload.doc.id;
          this.cashbooks.push(cashb);
        });//end data loop

        if(order === 'desc'){
          let swap = this.lastVisible;
          this.lastVisible = this.firstVisible;
          this.firstVisible = swap;
          this.cashbooks.reverse();
        }
      }
    });//end subscription loop
  }

  first() {
    this.getPaginated(this.companyId,'date', 'asc',this.limit, null);
  }

  prev() {
    this.getPaginated(this.companyId, 'date', 'desc', this.limit, this.firstVisible.date);
  }

  next() {
    this.getPaginated(this.companyId, 'date', 'asc', this.limit, this.lastVisible.date);
  }

  last() {
    this.getPaginated(this.companyId, 'date', 'desc', this.limit, new Date())
  }
  
  changeLimit(value){
    this.limit = parseInt(value);
    this.last();
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
