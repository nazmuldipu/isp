import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserListComponent } from './containers/user-list/user-list.component';
import { AddUserComponent } from './containers/add-user/add-user.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserSubNavbarComponent } from './containers/user-sub-navbar/user-sub-navbar.component';
import { UserRolesComponent } from './containers/user-roles/user-roles.component';
import { UserListChildComponent } from './components/user-list-child/user-list-child.component';
import { AdminUserComponent } from './containers/admin-user/admin-user.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { RoleFormComponent } from './components/role-form/role-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
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
    AdminUserComponent,
    UserFormComponent,
    RoleFormComponent
  ]
})
export class UserModule { }
