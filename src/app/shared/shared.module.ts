import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [],
  providers:[
    AuthService
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class SharedModule { }
