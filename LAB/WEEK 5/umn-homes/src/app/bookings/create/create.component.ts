import { Component, OnInit, Input } from '@angular/core';
import { Place } from 'src/app/places/place.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {

  @Input() selectedPlace: Place;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onBookCancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  onBookPlace() {
    this.modalCtrl.dismiss({ message: 'This is a dummy message' }, 'confirm');
  }

}
