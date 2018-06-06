import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { User } from 'shared/models/user.model';
import { UserService } from 'shared/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from 'shared/services/company.service';
import { Company } from 'shared/models/company.model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  // users$: Observable<User[]>;
  // companies$: Observable<Company[]>;
  users: User[];
  companies: Company[];
  subscriptions: Subscription;
  showForm = true;
  user: User;
  message = '';
  errorMessage = '';

  constructor(
    // private store: Store,
    private userService: UserService,
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.user = new User();
  }

  async ngOnInit() {
    this.subscriptions = await this.userService.getAll().subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.log(error);
      }
    );

    this.subscriptions = await this.companyService.getAll().subscribe(
      data => {
        this.companies = data;
      },
      error => {
        console.log(error);
      }
    );
    // this.users$ = this.store.select<User[]>('users');
    // this.companies$ = this.store.select<Company[]>('company');
    // this.subscriptions = [
    //   this.userService.users$.subscribe(),
    //   this.companyService.company$.subscribe()
    // ]
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  editUser(id: string) {
    this.user = this.users.find(us => us.id === id);
    // this.users$.subscribe(
    //   data => {
    //     this.user = data.find(usr => usr.id === id);
    //   }
    // )
  }

  createUser(user: User) {
    this.showForm = false;
    this.authService
      .register(user.email, user.password)
      .then(usr => {
        this.userService
          .saveRegisteredUser(usr.user.uid, user.name, user.email)
          .then(() => {
            this.message = 'User Saved';
            this.showForm = true;
          })
          .catch(error => {
            (this.errorMessage = 'USER SAVING ERROR ! '), error;
            console.log('USER SAVING ERROR ! ', error);
          });
      })
      .catch(error => {
        (this.errorMessage = 'REGISTRATION ERROR ! '), error;
        console.log('REGISTRATION ERROR ! ', error);
      });
  }

  updateUser(user: User) {
    this.showForm = false;
    console.log(this.user.id, user);
    this.userService
      .update(this.user.id, user)
      .then(() => {
        this.message = 'User Updated';
        this.showForm = true;
      })
      .catch(error => {
        (this.errorMessage = 'USER Updating ERROR ! '), error;
        console.log('USER Updating ERROR ! ', error);
      });
  }

  removeUser(id: string) {
    this.userService
      .delete(id)
      .then(() => {
        this.message = 'User Deleted';
        this.clear();
      })
      .catch(error => (this.errorMessage = 'User Delete failed'));
  }

  clear() {
    this.user = new User();
    this.message = '';
    this.errorMessage = '';
  }

  //TODO: on user update mode email or password can not change because of 2 different table
}
