import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
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
    // console.log(user);
    this.auth.register(user.email, user.password)
      .then((usr) => {
        console.log(usr);
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
