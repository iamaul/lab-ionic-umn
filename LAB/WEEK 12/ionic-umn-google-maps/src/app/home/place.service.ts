import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { ADDRGETNETWORKPARAMS } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  currAddress = new BehaviorSubject<string>('');
  constructor() { }

  getAddress() {
    return this.currAddress.asObservable();
  }

  setAddress(address: string) {
    this.currAddress.next(address);
  }
}
