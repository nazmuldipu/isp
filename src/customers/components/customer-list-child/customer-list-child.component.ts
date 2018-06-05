import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Customer } from 'shared/models/customer.model';

@Component({
  selector: 'customer-list-child',
  templateUrl: './customer-list-child.component.html',
  styleUrls: ['./customer-list-child.component.scss']
})
export class CustomerListChildComponent {
  @Input() customer: Customer;
  @Output() image = new EventEmitter<string>();
  @Output() active = new EventEmitter<Customer>();
  toggled = false;

  toggle() {
    this.toggled = !this.toggled;
  }

  showImage(id: string) {
    this.image.emit(id);
  }

  deActivateItem(id: string) {
    this.toggled = false;
    this.active.emit(this.customer);
  }

}
