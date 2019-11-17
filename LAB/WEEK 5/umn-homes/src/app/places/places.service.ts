import { Injectable } from '@angular/core';
import { Place } from './place.model';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private _places: Place[] = [
    new Place(
      'p1',
      'Gading Apartment',
      '2BR, Luas dan Cozy',
      'https://d1nabgopwop1kh.cloudfront.net/hotel-asset/30000002100123853_wh_3',
      100000000
    ),
    new Place(
      'p2',
      'Serpong Apartment',
      'Apartemen Romantis',
      'https://imganuncios.mitula.net/disewakan_apartemen_serpong_green_view_di_bsd_tangerang_2_bedroom_lt_15_full_furnish_bagus_murah_super_lengkap_6260064557579298913.jpg',
      125000000
    ),
    new Place(
      'p3',
      'BSD Apartment',
      'Apartemen Murah',
      'https://img-ap-1.trovit.com/img1id/1Q1y1v1e1K181WP/1Q1y1v1e1K181WP.1_11.jpg',
      50000000
    ),
  ];

  getPlace(id: string) {
    return {...this._places.find(p => p.id === id)}
  }
  
  get places() {
    return [...this._places];
  }
}
