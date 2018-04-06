import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { CashBookService } from 'shared/services/cash-book.service';
import { Cashbook } from 'shared/models/cashbook.model';

@Component({
  selector: 'app-cashbook',
  templateUrl: './cashbook.component.html',
  styleUrls: ['./cashbook.component.css']
})
export class CashbookComponent implements OnInit {
  companyId;
  cashbooks: Cashbook[] = [];

  constructor(
    private cashbookService: CashBookService
  ) { 
    this.companyId = localStorage.getItem('companyId');
  }

  async ngOnInit() {
    await this.cashbookService.getByCompnayId(this.companyId)
    .subscribe( 
      data =>{
        this.cashbooks = [];
        data.forEach(resp => {
          let cash = resp.payload.doc.data() as Cashbook;
          cash.id = resp.payload.doc.id;
          this.cashbooks.push(cash);
        });
      });
  }

}
