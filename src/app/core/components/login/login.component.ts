import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  errorMessage;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
  }

  login(user: User) {
    this.auth.loginWithEmail(user.email, user.password)
      .then(data => {
        console.log(data);
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      })
      .catch(error => {
        console.log('LOGIN ERROR', error);
        this.errorMessage = error.message;
      })
  }


}
