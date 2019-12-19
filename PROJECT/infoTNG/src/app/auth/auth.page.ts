import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { LoadingController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
  }

  userAuthenticate(displayName: string, email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl.create({ keyboardClose: true, message: 'Verifying ...' })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.onUserLogin(email, password);
        } else {
          authObs = this.authService.onUserSignUp(displayName, email, password);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl('/menu/tabs/feeds');
          },
          errRes => {
            loadingEl.dismiss();
            const code = errRes.error.error.message;
            let message = 'Something went wrong, please try again';
            if (code === 'EMAIL_EXISTS') {
              message = 'This email is already exist';
            } else if (code === 'EMAIL_NOT_FOUND') {
              message = 'This email hasn\'t been registered yet';
            } else if (code === 'INVALID_PASSWORD') {
              message = 'Invalid password';
            }
            this.showAlert(message);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const displayName = form.value.username;
    const email = form.value.email;
    const password = form.value.password;

    this.userAuthenticate(displayName, email, password);
    form.reset();
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: 'Authentication failed',
        message,
        buttons: ['Okay']
      })
      .then(alertEl => alertEl.present());
  }
}
