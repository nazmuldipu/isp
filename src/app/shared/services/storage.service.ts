import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';

@Injectable()
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

}
