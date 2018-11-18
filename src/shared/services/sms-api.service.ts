import { qR } from '@angular/core/src/render3';
import { Injectable } from '@angular/core';
import {
  Headers,
  Http,
  Request,
  RequestMethod,
  RequestOptions
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ThrowStmt } from '@angular/compiler';
import { map } from 'rxjs/operators';

@Injectable()
export class SmsApiService {
  username: string = 'nazmulalam';
  password: string = 'rubeln123';
  senderId: string = '8801912239643';
  proxy = 'https://api.monerbari.com/proxy/';

  baseUrl: string = 'http://api.rankstelecom.com/api/v3/sendsms/plain';

  constructor(private http: Http) {}

  balance() {
    let param =
      'balance?baseUrl=' +
      'http://api.rankstelecom.com/api/command' +
      '&user=' +
      this.username +
      '&password=' +
      this.password +
      '&cmd=CREDITS';

    return this.http
      .get(this.proxy + param)
      .pipe(map(response => response.json()));
  }

  sendSMSUrl(phone: string, message: string, bd: boolean = false) {
    let param =
      'url?baseUrl=' +
      this.baseUrl +
      '&user=' +
      this.username +
      '&password=' +
      this.password +
      '&sender=' +
      this.senderId +
      '&SMSText=' +
      message +
      '&GSM=+88' +
      phone +
      '&BD=' +
      bd;
    console.log(message.length + ' : ' + this.proxy + param);
    return this.http
      .get(this.proxy + param)
      .pipe(map(response => response.json()));
  }
}
