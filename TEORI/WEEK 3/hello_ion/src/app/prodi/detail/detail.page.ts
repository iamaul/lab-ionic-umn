import { Component, OnInit } from '@angular/core';
import { Prodi } from '../prodi.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdiService } from '../prodi.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  prodi: Prodi;
  constructor(
    private activatedRoute: ActivatedRoute, 
    private prodiService: ProdiService,
    private alertController: AlertController,
    private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        this.prodi = this.prodiService.getProdi(paramMap.get('kode_prodi'));
      }
    )
  }

  async removeProdi() {
    const alert = await this.alertController.create({
      header: 'Yakin?',
      message: 'Beneran mau hapus prodi?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Hehe',
          role: 'cancel'
        },
        {
          text: 'Delete',
          handler: () => {
            this.prodiService.deleteProdi(this.prodi.kode_prodi);
            this.router.navigate(['/home']);
          }
        }
      ]
    });
    await alert.present();
  }
}
