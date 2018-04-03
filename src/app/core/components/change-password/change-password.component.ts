import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user;
  message = '';
  constructor(
    private auth: AuthService
  ) { }

  async ngOnInit() {
    await this.auth.getUser$()
    .subscribe(data=>{
      this.user = data;
      console.log(this.user.email);
      if(this.user.email){
        this.resetPassword(this.user.email);
      }
    })
  }

  resetPassword(email){
    this.auth.resetPassword(email)
    .then( data =>{
      this.message = 'A link to reset your password has already been sent to your email address. Please check your email. Thank you.';
    })
  }

}
