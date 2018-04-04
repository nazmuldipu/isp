import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { Observable } from 'rxjs/Observable';
import { Customer } from 'shared/models/customer.model';
import { CustomerService } from 'shared/services/customer.service';

@Component({
  selector: 'app-customer-images',
  templateUrl: './customer-images.component.html',
  styleUrls: ['./customer-images.component.css']
})
export class CustomerImagesComponent implements OnInit {
  id;
  customer: Customer;
  uploadPercent: Observable<number>;

  constructor(
    private ng2ImgMax: Ng2ImgMaxService,
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private storage: AngularFireStorage,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) this.getCustomer(this.id);
  }

  ngOnInit() {
  }

  async getCustomer(id) {
    this.customerService.get(id).take(1)
      .subscribe(data => {
        this.customer = data as Customer;
        this.customer.id = id;
        if (!this.customer.idImagesUrl)
          this.customer.idImagesUrl = [];

        // console.log(this.customer.idImagesUrl.length);

        switch (this.customer.idImagesUrl.length) {
          case 0: this.customer.idImagesUrl.push['1'];
          case 1: this.customer.idImagesUrl.push['2']; break;
        }
        console.log(this.customer);
      })
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
    const filePath = url

    const task = this.storage.upload(filePath, image);
    this.uploadPercent = task.percentageChanges();
    console.log('Yes');

    task.downloadURL().subscribe(data => {
      switch (mode) {
        case 0: this.customer.imageUrl = data; break;
        case 1: this.customer.idImagesUrl[0] = data; break;
        case 2: this.customer.idImagesUrl[1] = data; break;
      }
      console.log(this.customer);
      this.customerService.update(this.customer.id, this.customer)
        .then(data => {
          console.log('😢 Image url updated');
        })
    })
  }


}
