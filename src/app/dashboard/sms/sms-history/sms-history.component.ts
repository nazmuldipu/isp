import { Component, OnInit, OnDestroy } from '@angular/core';
import { SmsService } from 'shared/services/sms.service';
import { Subscription } from 'rxjs/Subscription';
import { SMS } from 'shared/models/sms.model';

@Component({
  selector: 'app-sms-history',
  templateUrl: './sms-history.component.html',
  styleUrls: ['./sms-history.component.css']
})
export class SmsHistoryComponent implements OnInit, OnDestroy {
  companyId;
  userId;
  limit: number;
  lastVisible;
  firstVisible;
  smsHistory: SMS[] = [];
  subscription: Subscription;

  constructor(
    private smsService: SmsService
  ) { 
    this.companyId = localStorage.getItem('companyId');
    this.userId = localStorage.getItem('userId');
    this.limit = 5;
  }

  ngOnInit() {
    this.paginaiton('last');
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  async getPaginated(companyId, orderBy, order, limit, startAfter) {
    this.subscription = await this.smsService.getPaginatedStartAfter(companyId, orderBy, order, limit, startAfter)
      .subscribe(data => {
        if (data.length > 0) {
          this.lastVisible = data[data.length - 1].payload.doc.data();
          this.firstVisible = data[0].payload.doc.data();

          this.smsHistory = [];
          data.forEach(inv => {
            let pss = inv.payload.doc.data() as SMS;
            pss.id = inv.payload.doc.id;
            this.smsHistory.push(pss);
          });//end data loop

          if (order === 'desc') {
            let swap = this.lastVisible;
            this.lastVisible = this.firstVisible;
            this.firstVisible = swap;
            this.smsHistory.reverse();
          }
        }
      });//end subscription loop
  }

  
  paginaiton(page: string) {
    switch (page) {
      case 'first':
        this.getPaginated(this.companyId, 'date', 'asc', this.limit, null);
        break;
      case 'previous':
        this.getPaginated(this.companyId, 'date', 'desc', this.limit, this.firstVisible.date);
        break;
      case 'next':
        this.getPaginated(this.companyId, 'date', 'asc', this.limit, this.lastVisible.date);
        break;
      case 'last':
        this.getPaginated(this.companyId, 'date', 'desc', this.limit, new Date())
        break;
      default:
        console.log('I don\'t know who I am ');
        break;
    }
  }

  changeLimit(value){
    this.limit = parseInt(value);
    this.paginaiton('last');
  }

}
