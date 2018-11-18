import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'paginate',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './paginate.component.html',
  styleUrls: ['./paginate.component.scss']
})
export class PaginateComponent {
  @Input('first') first: any;
  @Input('last') last: any;
  @Input('orderBy') orderBy: string;

  @Output() paginate = new EventEmitter<any>();

  companyId;
  limit = 5;

  constructor() {
    this.companyId = localStorage.getItem('companyId');
  }

  getPaginated(companyId, orderBy, order, limit, startAfter) {
    this.paginate.emit({
      companyId,
      orderBy,
      order,
      limit,
      startAfter
    });
  }

  paginaiton(page: string) {
    switch (page) {
      case 'first':
        this.getPaginated(
          this.companyId,
          this.orderBy,
          'asc',
          this.limit,
          null
        );
        break;
      case 'previous':
        this.getPaginated(
          this.companyId,
          this.orderBy,
          'desc',
          this.limit,
          this.first[this.orderBy]
        );
        break;
      case 'next':
        this.getPaginated(
          this.companyId,
          this.orderBy,
          'asc',
          this.limit,
          this.last[this.orderBy]
        );
        break;
      case 'last':
        this.getPaginated(
          this.companyId,
          this.orderBy,
          'desc',
          this.limit,
          null
        );
        break;
      default:
        console.log("I don't know who I am ");
        break;
    }
  }

  changeLimit(value) {
    this.limit = parseInt(value);
    this.paginaiton('last');
  }
}
