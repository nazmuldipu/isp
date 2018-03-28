import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
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
    console.log(user)
    this.auth.loginWithEmail(user.email, user.password)
      .then(data => {
        console.log('Success', data);
        let returnUrl = localStorage.getItem('returnUrl');
        this.router.navigateByUrl(returnUrl);
      })
      .catch(error => {
        console.log('LOGIN ERROR', error);
        this.errorMessage = error.message;
      })
  }


}
