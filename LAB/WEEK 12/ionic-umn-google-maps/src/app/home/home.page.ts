import { Component, OnInit } from '@angular/core';
import { PlaceService } from './place.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  address = '';

  constructor(private placeSvc: PlaceService) {}

  ngOnInit() {
    this.placeSvc.getAddress().subscribe(
      currAddress => {
        this.address = currAddress;
      }
    );
  }
}
