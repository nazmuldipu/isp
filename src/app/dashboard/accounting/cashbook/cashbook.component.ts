import 'rxjs/add/operator/take';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { CashBookService } from 'shared/services/cash-book.service';
import { Cashbook } from 'shared/models/cashbook.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.css']
})
export class CashbookComponent implements OnInit, OnDestroy {
  companyId;
  cashbooks: Cashbook[] = [];
  subscription: Subscription;
  lastCashbook;
  lastVisible;
  firstVisible;
  limit:number;

  constructor(
    private cashbookService: CashBookService
  ) {
    this.companyId = localStorage.getItem('companyId');
    this.limit = 5;
  }

  async ngOnInit() {
    if (this.companyId) {
      this.last();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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


}
