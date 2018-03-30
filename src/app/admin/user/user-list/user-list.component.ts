import 'rxjs/add/operator/take';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'firebase/app';
import { UserService } from 'shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  subscription: Subscription;

  constructor(
    private userService: UserService
  ) { }

  async ngOnInit() {
    this.subscription = await this.userService.getAll()
      .subscribe(responses => {
        responses.forEach(resp => {
          console.log(resp.payload.doc.data() as User);
          this.users.push(resp.payload.doc.data() as User);
        })
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
