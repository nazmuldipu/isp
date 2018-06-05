import { Component, Input, Output, EventEmitter} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent{

  @Input() name: string;
  @Output() roles = new EventEmitter<string>();

  roleList = ['USER', 'ISP']

  form = this.fb.group({
    uroles: ['', Validators.required],
  })

  constructor(
    private fb: FormBuilder
  ) { }
  
  save(){
    this.roles.emit(this.form.get('uroles').value);
  }
  
  clear(){
    this.form.reset();
    this.name = null;
  }

}
