import { Component, OnInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { CreateComponent } from '../../../bookings/create/create.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  place: Place;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(map => {
      if (!map.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/offers');
        return;
      }
      this.place = this.placesService.getPlace(map.get('placeId'));
    });
  }

  onBookPlace() {
    this.modalCtrl.create({ 
      component: CreateComponent,
      componentProps: { selectedPlace: this.place }
    })
    .then(modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(result => {
      console.log(result.data, result.role);
      if (result.role === 'confirm') {
        console.log('Booked');
      }
    });
  }

}
