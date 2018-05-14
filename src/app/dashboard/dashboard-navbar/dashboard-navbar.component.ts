import { Component, OnInit } from '@angular/core';
import { AuthService } from 'shared/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'shared/services/user.service';

@Component({
  selector: 'dashboard-navbar',
  templateUrl: './dashboard-navbar.component.html',
  styleUrls: ['./dashboard-navbar.component.scss']
})
export class DashboardNavbarComponent implements OnInit {

  isCollapsed = true;
  appUser;
  appUser$;
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
        localStorage.setItem('userId', user.uid);
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

  hasIspRole():boolean{
    return this.roles.includes('ISP');
  }

  logout() {
    this.appUser = null;
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
