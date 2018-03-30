import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'shared/models/user.model';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  users: User[] = [];
  roleList = ['USER', 'ISP']
  user: User;
  subscription: Subscription;
  message = '';
  errorMessage = '';

  constructor(
    private userService: UserService
  ) {
    this.user = new User();
  }

  async ngOnInit() {
    this.subscription = await this.userService.getAll()
      .subscribe(responses => {
        this.users = [];
        responses.forEach(resp => {
          let user = resp.payload.doc.data() as User;
          user.id = resp.payload.doc.id;
          this.users.push(user);
        });
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(id) {
    Object.assign(this.user, this.users.find(usr => usr.id === id));
  }

  save(user) {
    console.log(this.user);
    if (this.user.id) {
      this.userService.update(this.user.id, user)
        .then(() => {
          this.message = "ROLE CHANGED";
        })
        .catch((error) => {
          this.errorMessage = "ROLE CHANGING ERROR ! ", error;
          console.log("ROLE CHANGING ERROR !! ", error);
        });
      this.clear();
    }
  }

  clear() {
    this.user = new User();
    this.message = '';
    this.errorMessage = '';
  }
}
