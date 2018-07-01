import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { Customer } from 'shared/models/customer.model';

@Component({
  selector: 'customer-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnChanges {
  exists = false;

  @Input() customer: Customer;

  @Output() create = new EventEmitter<Customer>();
  @Output() update = new EventEmitter<Customer>();
  @Output() remove = new EventEmitter<Customer>();

  form = this.fb.group({
    date: ['', Validators.required],
    name: ['', Validators.required],
    organization: '',
    fathersName: ['', Validators.required],
    mothersName: ['', Validators.required],
    gender: ['', Validators.required],
    phone: [
      '',
      [
        Validators.required,
        Validators.pattern('^01[5-9][ ]?[0-9]{2}[ ]?[0-9]{3}[ ]?[0-9]{3}$')
      ]
    ],
    email: '',
    dob: ['', Validators.required],
    occupation: ['', Validators.required],
    zone: ['', Validators.required],

    prAddress: this.fb.group({
      flat: '',
      floor: '',
      house: '',
      road: '',
      area: ['', Validators.required],
      village: '',
      post: '',
      po: ['', Validators.required],
      unions: '',
      city: ['', Validators.required]
    }),

    perAddress: ['', Validators.required],
    idType: ['', Validators.required],
    otherIdType: '',
    idNumber: ['', Validators.required],
    reference: ['', Validators.required],
    connectionDate: ['', Validators.required],
    connectionFee: ['', Validators.required],
    monthlyBill: ['', Validators.required],
    dateOfPayment: '',
    popLocation: '',
    boxName: '',
    installedBy: '',
    useCable: '',
    bandwidthType: ['', Validators.required],
    userType: ['', Validators.required],
    packageType: ['', Validators.required],
    userName: ['', Validators.required],
    password: ['', Validators.required],
    ipAddress: '',
    gateway: '',
    subnet: '',
    active: [false, Validators.required]
  });

  ngOnChanges() {
    if (this.customer && this.customer.id) {
      this.exists = true;

      const value = this.customer;
      this.form.patchValue(value);
    }
  }
  constructor(private fb: FormBuilder) {}

  createCustomer() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
      this.form.reset();
    }
  }

  updateCustomer() {
    if (this.form.valid) {
      const cust = {
        ...this.customer,
        ...this.form.value
      } as Customer;
      this.update.emit(cust);
      this.form.reset();
    }
  }

  removeCustomer() {
    this.remove.emit(this.form.value);
  }

  required(errorString) {
    return (
      this.form.get(errorString).hasError('required') &&
      this.form.get(errorString).touched
    );
  }
}
