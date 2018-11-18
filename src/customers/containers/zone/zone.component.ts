import { Component, OnInit, OnDestroy } from '@angular/core';

import { copyStyles } from '@angular/animations/browser/src/util';
import { Subscription } from 'rxjs';
import { CustomerService } from 'shared/services/customer.service';
import { Zone } from 'shared/models/zone.model';
import { ZoneService } from 'shared/services/zone.service';

@Component({
  selector: 'zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss']
})
export class ZoneComponent implements OnInit, OnDestroy {
  zones: Zone[];
  zone: Zone;
  showForm = true;
  errorMessage = '';

  subscription: Subscription;

  constructor(
    private zoneService: ZoneService,
    private customerService: CustomerService
  ) {}

  ngOnInit() {
    this.getAll();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async getAll() {
    this.subscription = await this.zoneService.zones$.subscribe(data => {
      this.zones = data;
    });
  }

  onCreate(event: Zone) {
    this.showForm = false;
    this.zoneService.create(event).then(ref => {
      this.showForm = true;
    });
  }

  onUpdate(event: Zone) {
    this.showForm = false;
    this.zoneService.update(event.id, event).then(ref => {
      this.showForm = true;
      this.zone = null;
    });
  }

  onRemove(event: string) {
    const value = this.zones.find(zo => zo.id == event) as Zone;
    console.log(value);
    this.customerService.searchByZone(value.name).subscribe(data => {
      console.log(data);
      if (data.length) {
        this.errorMessage =
          'Zone can not remove, Some customers still exists in this zone';
      } else {
        this.zoneService
          .delete(event)
          .then(ref => {
            console.log('zone Delete', ref);
          })
          .catch(error => {
            console.log('zone Deleting ERROR ! ', error);
          });
      }
    });
  }

  onEdit(event) {
    const value = this.zones.find(ar => ar.id === event);
    this.zone = { ...value };
  }
  onClean(event) {
    if (event) {
      this.zone = null;
    }
  }
}
