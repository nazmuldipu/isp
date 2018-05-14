import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'shared/models/user.model';
import { Observable } from 'rxjs/Observable';
import { Store } from 'store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Observable<User[]>;
  subscription: Subscription;

  constructor(
    private store: Store,
    private userService: UserService
  ) {

  }

  async ngOnInit() {
    this.users$ = this.store.select<User[]>('users');
    this.subscription = this.userService.users$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
