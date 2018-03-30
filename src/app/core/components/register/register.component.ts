import { Component, OnInit } from '@angular/core';
import { User } from 'shared/models/user.model';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  user: User;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    this.user = new User();
  }

  ngOnInit() {
    
  }

  register(user: User) {
    this.auth.register(user.email, user.password)
      .then((usr) => {
        this.userService.saveRegisteredUser(usr.uid, user.name, user.email)
          .then(() => {
            this.router.navigate(['/']);
          })
          .catch((error) => {
            console.log("USER SAVING ERROR ! ", error);
          });
      })
      .catch((error) => {
        console.log("REGISTRATION ERROR ! ", error);
      });
  }

}
