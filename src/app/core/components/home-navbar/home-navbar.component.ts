import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.scss']
})
export class HomeNavbarComponent implements OnInit {
  isCollapsed = true;
  appUser;
  appUser$;
  admin = false;
  roles = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    await this.auth.getUser$().subscribe(user => {
      if (user) {
        this.appUser$ = user;
        this.userService.get(user.uid).take(1)
          .subscribe(data => {
            this.appUser = data;
            if (this.appUser.companyId)
              localStorage.setItem('companyId', this.appUser.companyId);

            this.roles = this.appUser.roles;
          });
      }
    });
  }

  hasAdminRole(): boolean {
    return this.roles.includes('ADMIN');
  }

  logout() {
    this.appUser = null;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  sendVerificationEmail() {
    this.auth.sendVerificationEmail()
      .then(info => {
        console.log(info);
      })
  }

}
