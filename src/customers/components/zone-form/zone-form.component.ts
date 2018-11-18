import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges
} from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Zone } from 'shared/models/zone.model';

@Component({
  selector: 'zone-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zone-form.component.html',
  styleUrls: ['./zone-form.component.scss']
})
export class ZoneFormComponent implements OnChanges {
  exists = false;

  @Input()
  zone: Zone;

  @Output()
  create = new EventEmitter<Zone>();
  @Output()
  update = new EventEmitter<Zone>();
  @Output()
  remove = new EventEmitter<string>();
  @Output()
  clean = new EventEmitter<boolean>();

  form = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required]
  });

  ngOnChanges() {
    if (this.zone && this.zone.id) {
      this.exists = true;

      const value = this.zone;
      this.form.patchValue(value);
    }
  }

  constructor(private fb: FormBuilder) {}

  createForm() {
    if (this.form.valid) {
      this.create.emit(this.form.value);
      this.clear();
    }
  }

  updateForm() {
    if (this.form.valid) {
      const value = {
        ...this.zone,
        ...this.form.value
      } as Zone;
      this.update.emit(value);
      this.clear();
    }
  }

  removeForm() {
    if (this.zone.id) {
      this.remove.emit(this.zone.id);
      this.clear();
    }
  }

  required(errorString) {
    return (
      this.form.get(errorString).hasError('required') &&
      this.form.get(errorString).touched
    );
  }

  clear() {
    this.form.reset();
    this.zone = null;
    this.exists = false;
    this.clean.emit(true);
  }
}
