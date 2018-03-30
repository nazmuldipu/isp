import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeNavbarComponent } from './core/components/home-navbar/home-navbar.component';
import { HomeComponent } from './core/components/home/home.component';
import { LoginComponent } from './core/components/login/login.component';
import { RegisterComponent } from './core/components/register/register.component';
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/services/user.service';
import { AuthGuard } from 'shared/services/auth-guard.service';
import { SharedModule } from 'shared/shared.module';
import { AdminAuthGuard } from './admin/admin-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeNavbarComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    NgbModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'admin', loadChildren:'app/admin/admin.module#AdminModule', canActivate: [AuthGuard, AdminAuthGuard]},
      { path: '**', redirectTo: '/' }
    ])
  ],
  providers: [
    AuthService,
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
