import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'shared/models/user.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  // users$: Observable<User[]>;
  users: User[];
  subscription: Subscription;

  constructor(
    // private store: Store,
    private userService: UserService
  ) {}

  async ngOnInit() {
    this.subscription = await this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
    // this.users$ = this.store.select<User[]>('users');
    // this.subscription = this.userService.users$.subscribe();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
