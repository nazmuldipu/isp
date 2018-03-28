import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from 'shared/services/auth.service';
import { UserService } from 'shared/services/user.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'home-navbar',
  templateUrl: './home-navbar.component.html',
  styleUrls: ['./home-navbar.component.css']
})
export class HomeNavbarComponent implements OnInit {
  isCollapsed = true;
  appUser;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserService
  ) { }

  async ngOnInit() {
    await this.auth.getUser$().subscribe(user => {
      if (user) {
        this.userService.get(user.uid).take(1)
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
