import { Component, OnInit } from '@angular/core';
import { Prodi } from './prodi.model';
import { ProdiService } from './prodi.service';

@Component({
  selector: 'app-prodi',
  templateUrl: './prodi.page.html',
  styleUrls: ['./prodi.page.scss'],
})
export class ProdiPage implements OnInit {

  prodi: Prodi[];

  constructor(private prodiService: ProdiService) { }

  ngOnInit() {
    this.prodi = this.prodiService.getAllProdi();
  }

}
