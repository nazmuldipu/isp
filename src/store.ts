import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/distinctUntilChanged';
import { User } from './shared/models/user.model';
import { Company } from './shared/models/company.model';
import { Customer } from './shared/models/customer.model';
import { COMPOSITION_BUFFER_MODE } from '@angular/forms';

export interface State {
    user: User,
    company: Company,
    customer: Customer,
}

const state: State = {
    user: undefined,
    company: undefined,
    customer: undefined
};

export class Store {

  private subject = new BehaviorSubject<State>(state);
  private store = this.subject.asObservable().distinctUntilChanged();

  get value() {
    return this.subject.value;
  }

  select<T>(name: string): Observable<T> {
    return this.store.pluck(name);
  }

  set(name: string, state: any) {
    this.subject.next({ ...this.value, [name]: state });
  }

}
