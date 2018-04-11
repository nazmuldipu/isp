import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { CashBookService } from 'shared/services/cash-book.service';
import { Cashbook } from 'shared/models/cashbook.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.css']
})
export class CashbookComponent implements OnInit {
  companyId;
  cashbooks: Cashbook[] = [];
  subscription: Subscription;
  lastCashbook;

  constructor(
    private cashbookService: CashBookService
  ) { 
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    if (this.companyId) {
      this.subscription = await this.cashbookService.cashbooks$
        .subscribe(item => {
          this.cashbooks = item;
        });
    }
  }

}
