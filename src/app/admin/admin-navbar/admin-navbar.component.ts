import 'rxjs/add/operator/take';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {
  isCollapsed = true;
  appUser;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  async ngOnInit() {
    await this.auth.getUser$().subscribe(user => {
      if (user) {
        this.userService
          .get(user.uid)
          .take(1)
          .subscribe(data => {
            this.appUser = data;
          });
      }
    });
  }

  logout() {
    this.appUser = null;
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
