import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'shared/services/customer.service';
import { Customer } from 'shared/models/customer.model';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-customer-images',
  templateUrl: './customer-images.component.html',
  styleUrls: ['./customer-images.component.css']
})
export class CustomerImagesComponent implements OnInit {
  id;
  customer: Customer;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;

  // The next two lines are just to show the resize debug
  // they can be removed
  public debug_size_before: string;
  public debug_size_after: string;
  public file_srcs: string;

  constructor(
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
      })
  }

  uploadFile(event) {
    const file = event.target.files[0];
    const filePath = 'customer/profile/' + this.id;
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.downloadURL().subscribe(data =>{
      this.customer.imageUrl = data;
      this.customerService.update(this.customer.id, this.customer)
      .then(data =>{
        console.log('Image url updated');
      })
    })
  }

  // uploadFile(event) {
  //   const file = event.target.files[0];
  //   console.log(event.target.files[0]);
  //   const filePath = 'customer/profile/' + this.id;
  //   const task = this.storage.upload(filePath, file);
  //   // observe percentage changes
  //   this.uploadPercent = task.percentageChanges();
  //   // get notified when the download URL is available
  //   this.downloadURL = task.downloadURL();

  //   console.log(this.downloadURL);
  // }



  // fileChange(input) {
  //   // Create the file reader
  //   let reader = new FileReader();
  //   this.readFile(input.files[0], reader, (result) => {
  //     var img = document.createElement("img");
  //     img.src = result;
  //     this.resize(img, 250, 250, (resized_jpeg) => {
  //       this.file_srcs = resized_jpeg;

  //       const filePath = 'customer/profile/' + this.id;
  //       var strImage = resized_jpeg.replace(/^data:image\/[a-z]+;base64,/, "");
  //       console.log(strImage);
  //       // let newFile = this.blobToFile(resized_jpeg, 'profile');
  //       const ref = this.storage.ref(strImage);
  //       // const task = this.storage.upload(filePath, strImage);
  //       const task = ref.put(resized_jpeg);
  //       // observe percentage changes
  //       this.uploadPercent = task.percentageChanges();
  //       // get notified when the download URL is available
  //       this.downloadURL = task.downloadURL();
  //     });
  //   });

  // }

  // blobToFile(theBlob, fileName){
  //   //A Blob() is almost a File() - it's just missing the two properties below which we will add
  //   theBlob.lastModifiedDate = new Date();
  //   theBlob.name = fileName;
  //   return theBlob;
  // }

  // readFile(file, reader, callback) {
  //   // Set a callback funtion to fire after the file is fully loaded
  //   reader.onload = () => {
  //     // callback with the results
  //     callback(reader.result);
  //   }
  //   // Read the file
  //   reader.readAsDataURL(file);
  // }

  // resize(img, MAX_WIDTH: number, MAX_HEIGHT: number) {
  //   // This will wait until the img is loaded before calling this function
  //   return img.onload = () => {
  //     console.log("img loaded");
  //     // Get the images current width and height
  //     var width = img.width;
  //     var height = img.height;

  //     // Set the WxH to fit the Max values (but maintain proportions)
  //     if (width > height) {
  //       if (width > MAX_WIDTH) {
  //         height *= MAX_WIDTH / width;
  //         width = MAX_WIDTH;
  //       }
  //     } else {
  //       if (height > MAX_HEIGHT) {
  //         width *= MAX_HEIGHT / height;
  //         height = MAX_HEIGHT;
  //       }
  //     }

  //     // create a canvas object
  //     var canvas = document.createElement("canvas");

  //     // Set the canvas to the new calculated dimensions
  //     canvas.width = width;
  //     canvas.height = height;
  //     var ctx = canvas.getContext("2d");

  //     ctx.drawImage(img, 0, 0, width, height);

  //     // Get this encoded as a jpeg
  //     // IMPORTANT: 'jpeg' NOT 'jpg'
  //     var dataUrl = canvas.toDataURL('image/jpeg');

  //     // callback with the results
  //    return canvas;
  //   };
  // }

}
