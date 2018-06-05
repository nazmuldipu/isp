import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'shared/models/user.model';

@Component({
  selector: 'user-list-child',
  templateUrl: './user-list-child.component.html',
  styleUrls: ['./user-list-child.component.scss']
})
export class UserListChildComponent implements OnInit {

  @Input('users') users: User[];
  @Output() edit = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  editUser(id) {
    this.edit.emit(id);
  }
}
