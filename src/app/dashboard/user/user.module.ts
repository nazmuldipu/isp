import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserSubNavbarComponent } from './user-sub-navbar/user-sub-navbar.component';
import { UserRolesComponent } from './user-roles/user-roles.component';
import { UserListChildComponent } from 'shared/components/user-list-child/user-list-child.component';
import { AdminUserComponent } from './admin-user/admin-user.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '', component: UserComponent,
        children: [
          { path: 'user-list', component:  UserListComponent},
          { path: 'user-roles', component:  UserRolesComponent},
          { path: 'add-user', component:  AddUserComponent},
          { path: 'admin-user', component:  AdminUserComponent},
        ]
      },
      { path: '**', redirectTo: '/' }
    ])
  ],
  declarations: [
    UserComponent,
    UserListComponent,
    AddUserComponent,
    UserSubNavbarComponent,
    UserRolesComponent,
    UserListChildComponent,
    AdminUserComponent
  ]
})
export class UserModule { }
