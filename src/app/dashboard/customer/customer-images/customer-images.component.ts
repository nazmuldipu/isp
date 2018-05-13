import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Observable } from 'rxjs/Observable';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-customer-images',
  templateUrl: './customer-images.component.html',
  styleUrls: ['./customer-images.component.css']
})
export class CustomerImagesComponent implements OnInit, OnDestroy {
  id;
  customer: Customer;
  uploadPercent: Observable<number>;
  subscription: Subscription;

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private storage: AngularFireStorage,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');

  }

  async ngOnInit() {
    this.subscription = await this.customerService.customers$
      .subscribe(item => {
        this.customer = item.find(cus => cus.id == this.id);
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onProfileImageChange(event) {
    let image = event.target.files[0];
    this.resizeImage(image, 400, 300, 'customer/profile/' + this.id, 0);
  }

  onId1ImageChange(event) {
    let image = event.target.files[0];
    this.resizeImage(image, 600, 600, 'customer/Id1/' + this.id, 1);
  }

  onId2ImageChange(event) {
    let image = event.target.files[0];
    this.resizeImage(image, 600, 600, 'customer/Id2/' + this.id, 2);
  }

  resizeImage(image, maxWidth, maxHeight, url, mode) {
    this.ng2ImgMax.resizeImage(image, maxWidth, maxHeight).subscribe(
      result => {
        this.uploadToFireStorage(result, url, mode);
      },
      error => {
        console.log('😢 Image Resize error!!', error);
      }
    );
  }

  uploadToFireStorage(image, url, mode) {
    const task = this.storage.upload(url, image);
    this.uploadPercent = task.percentageChanges();

    task.downloadURL().subscribe(data => {
      console.log(data);
      switch (mode) {
        case 0: this.customer.imageUrl = data; break;
        case 1: this.customer.idImagesUrl1 = data; break;
        case 2: this.customer.idImagesUrl2 = data; break;
      }

      this.customerService.update(this.customer.id, this.customer)
        .then(data => {
          console.log('😢 Image url updated');
        })
    })
  }


}
