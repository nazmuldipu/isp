import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { User } from 'shared/models/user.model';
import { UserService } from 'shared/services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { CompanyService } from 'shared/services/company.service';
import { Company } from 'shared/models/company.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {
  user: User;
  users: User[] = [];
  companies: Company[] = []
  subscription: Subscription;
  message = '';
  errorMessage = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private companyService: CompanyService,
    private router: Router
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

      this.subscription = await this.companyService.getAll()
      .subscribe( responses =>{
        this.companies  = [];
        responses.forEach(resp =>{
          let company = resp.payload.doc.data() as Company;
          company.id = resp.payload.doc.id;
          this.companies.push(company);
        });
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  //TODO: on user update mode email or password can not change because of 2 different table
  registerUser(user: User) {
    console.log(this.user);
    if (!this.user.id) {
      this.authService.register(user.email, user.password)
        .then((usr) => {
          this.userService.saveRegisteredUser(usr.uid, user.name, user.email)
            .then(() => {
              this.message = "User Saved"
            })
            .catch((error) => {
              this.errorMessage = "USER SAVING ERROR ! ", error;
              console.log("USER SAVING ERROR ! ", error);
            });
        })
        .catch((error) => {
          this.errorMessage = "REGISTRATION ERROR ! ", error;
          console.log("REGISTRATION ERROR ! ", error);
        });
    }
    else {
      this.userService.update(this.user.id, user)
        .then(() => {
          this.message = "User Updated"
        })
        .catch((error) => {
          this.errorMessage = "USER Updating ERROR ! ", error;
          console.log("USER Updating ERROR ! ", error);
        });
    }
  }

  save(user) {
    this.registerUser(user);
    this.clear();
  }

  edit(id) {
    Object.assign(this.user, this.users.find(usr => usr.id === id))
  }

  delete(id: string) {
    this.userService.delete(id)
      .then(() => this.message = 'User Deleted')
      .catch(error => this.errorMessage = 'User Delete failed')
  }
  clear() {
    this.user = new User();
    this.message = '';
    this.errorMessage = '';
  }

}
