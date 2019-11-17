import { Injectable } from '@angular/core';
import { Prodi } from './prodi.model';

@Injectable({
  providedIn: 'root'
})
export class ProdiService {

  private prodi: Prodi[] = [
    {
      kode_prodi: "IF",
      nama_prodi: "Informatika"
    },
    {
      kode_prodi: "SI",
      nama_prodi: "Sistem Informasi"
    }
  ];

  constructor() { }

  getAllProdi() {
    return [...this.prodi];
  }

  getProdi(kode_prodi: string) {
    return {
      ...this.prodi.find(prodi =>
        prodi.kode_prodi === kode_prodi
      )
    }
  }

  deleteProdi(kode_prodi: string) {
    this.prodi = this.prodi.filter(prodi => {
      return prodi.kode_prodi !== kode_prodi
    });
  }
}
