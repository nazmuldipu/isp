import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { User } from 'shared/models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { Company } from 'shared/models/company.model';

@Component({
  selector: 'user-form',
  // changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnChanges {

  @Input() user: User;
  @Input() companies: Company[];
  @Output() create = new EventEmitter<User>();
  @Output() update = new EventEmitter<User>();
  @Output() remove = new EventEmitter<string>();

  form = this.fb.group({
    companyId: ['', Validators.required],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user && this.user.name) {
      const value = this.user;
      this.form.reset();
      this.form.patchValue(value);
    }
  }

  createUser() {
    if (this.form.valid) {
      if (this.user.id) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
    }
  }

  delete(id: string){
    this.remove.emit(id);
  }

  clear() {
    this.form.reset();
    this.user = new User();
  }

  haserror(field: string): string {
    if (!this.form.get(field).touched) {
      return null;
    } else if (this.form.get(field).errors) {
      if (this.form.get(field).hasError('required')) {
        return this.getFieldErrorMessage(field) + ' required';
      }
      if (this.form.get(field).hasError('email')) {
        return this.getFieldErrorMessage(field) + ' invalid';
      }
      if (this.form.get(field).hasError('minlength')) {
        return this.getFieldErrorMessage(field) + ' should be minimum 6 characters';
      }
    }
    return null;
  }

  getFieldErrorMessage(field: string) {
    switch (field) {
      case 'name': return 'Name is';
      case 'email': return 'Email address is';
    }
    return field.charAt(0).toUpperCase() + field.slice(1);
  }
}
