import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'shared/models/user.model';
import { UserService } from 'shared/services/user.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.css']
})
export class UserRolesComponent implements OnInit {
  // users$: Observable<User[]>;
  users: User[];
  subscription: Subscription;
  roleList = ['USER', 'ISP'];
  user: User;
  showForm = true;
  message = '';
  errorMessage = '';

  constructor(private userService: UserService) {
    this.user = new User();
  }

  async ngOnInit() {
    this.subscription = await this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  editUser(id: string) {
    // this.users$.subscribe(
    //   data => {
    const euser = this.users.find(usr => usr.id === id) as User;
    if (euser.roles.includes('ADMIN')) {
      this.errorMessage = 'ADMIN role cannot change';
    } else {
      Object.assign(this.user, euser);
    }
    //   }
    // )
  }

  saveRoles(role: string) {
    this.showForm = false;
    this.user.roles = role;
    console.log(this.user.id, this.user);
    this.userService
      .update(this.user.id, this.user)
      .then(() => {
        this.clear();
        this.message = 'ROLE changed';
      })
      .catch(error => {
        (this.errorMessage = 'ROLE changing error ! '), error;
        console.log('ROLE changing error !! ', error);
      });
  }

  clear() {
    this.user = new User();
    this.showForm = true;
    this.message = '';
    this.errorMessage = '';
  }
}
