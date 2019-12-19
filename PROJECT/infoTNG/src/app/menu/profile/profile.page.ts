import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit, OnDestroy {

  userId: string;
  username: string;
  usermail: string;
  userpic: string;
  avatar: string;
  user: AngularFirestoreDocument;
  sub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storage: AngularFireStorage,
    private afstore: AngularFirestore
  ) {
    this.authService.userId.pipe(take(1)).subscribe(userId => {
      if (!userId) {
        return;
      }
      this.userId = userId;
    });

    this.user = this.afstore.doc(`users/${this.userId}`);
    this.sub = this.user.valueChanges().subscribe(data => {
      this.username = data.username;
      this.usermail = data.email;
      this.userpic = data.photoUrl;

      const photoProfile = this.storage.storage.refFromURL(this.userpic);
      photoProfile.getDownloadURL().then(url => {
        this.avatar = url;
      });
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onUserClickLogout() {
    this.authService.onUserLogout();
  }

  onUserEditProfile() {
    this.router.navigateByUrl('/menu/tabs/profile/edit');
  }

}
