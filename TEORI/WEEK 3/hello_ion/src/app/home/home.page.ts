import { Component } from '@angular/core';
import { Prodi } from '../prodi/prodi.model';
import { ProdiService } from '../prodi/prodi.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  campus: string;
  website: string;
  flag: boolean;

  prodi: Prodi[];
  constructor(private prodiService: ProdiService) {}

  ngOnInit() {
    this.campus = "Universitas Multimedia Nusantara";
    this.website = "www.umn.ac.id";
    this.prodi = this.prodiService.getAllProdi();
    this.flag = false;
  }

  singkatCampus() {
    this.campus = "UMN";
  }

  prodiOnClicked() {
    this.flag = true;
    console.log(this.prodi);
  }
}
