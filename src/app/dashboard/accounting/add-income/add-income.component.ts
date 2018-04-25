import { Component, OnInit, OnDestroy } from '@angular/core';
import { CashBookService } from 'shared/services/cash-book.service';
import { Subscription } from 'rxjs/Subscription';
import { Cashbook } from 'shared/models/cashbook.model';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit, OnDestroy {
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
      console.log(this.lastCashbook);
    })
  }

  async getPaginated(companyId, orderBy, limit, startAfter, order){
    this.subscription = await this.cashbookService.getPaginatedStartAfter(companyId, orderBy, limit, startAfter, order)
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
          this.cashbooks.reverse();
        }
      }
    });//end subscription loop
  }

  first() {
    this.getPaginated(this.companyId,'date',this.limit, null, 'asc');
  }

  prev() {
    this.getPaginated(this.companyId, 'date', this.limit, this.lastVisible.date, 'desc');
  }

  next() {
    this.getPaginated(this.companyId, 'date', this.limit, this.lastVisible.date, 'asc');

  }

  last() {
    this.getPaginated(this.companyId, 'date', this.limit, new Date(), 'desc')
  }
  
  changeLimit(value){
    this.limit = parseInt(value);
    this.last();
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
