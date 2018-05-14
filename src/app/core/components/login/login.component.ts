import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  errorMessage;
  appUser;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login(user: User) {
    this.auth.loginWithEmail(user.email, user.password)
      .then(data => {
        localStorage.setItem('userId', data.uid);
        let returnUrl = '/';
        if (data.emailVerified)
          returnUrl = localStorage.getItem('returnUrl');
        else
          this.auth.sendVerificationEmail();

        this.userService.get(data.uid).take(1)
          .subscribe(udata => {
            this.appUser = udata;
            if (this.appUser.companyId) {
              localStorage.setItem('companyId', this.appUser.companyId);
            }
            this.router.navigateByUrl(returnUrl);
            // this.showSpinner = false;
          });
      })
      .catch(error => {
        console.log('LOGIN ERROR', error);
        this.errorMessage = error.message;
      })
  }
}
