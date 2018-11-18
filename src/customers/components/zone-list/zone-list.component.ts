import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output
} from '@angular/core';
import { Zone } from 'shared/models/zone.model';

@Component({
  selector: 'zone-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './zone-list.component.html',
  styleUrls: ['./zone-list.component.scss']
})
export class ZoneListComponent {
  @Input() zones: Zone[];

  @Output() edit = new EventEmitter<string>();

  constructor() {}

  onEdit(id) {
    // console.log('edit', id);
    this.edit.emit(id);
  }
}
