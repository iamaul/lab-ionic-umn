import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  onClickSignUp() {
    this.navCtrl.navigateRoot('/auth/signup');
  }
}
