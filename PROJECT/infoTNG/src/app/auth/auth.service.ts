import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { User } from './user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  displayName: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {

  private userBehave = new BehaviorSubject<User>(null);
  private logoutTimer: any;

  get userIsAuthenticated() {
    return this.userBehave.asObservable().pipe(map(user => {
        if (user) {
          return !!user.validToken;
        } else {
          return false;
        }
    }));
  }

  get userId() {
    return this.userBehave.asObservable().pipe(map(user => {
      if (user) {
        return user.id;
      } else {
        return null;
      }
    }));
  }

  get userDisplayName() {
    return this.userBehave.asObservable().pipe(map(user => {
      if (user) {
        return user.displayName;
      } else {
        return null;
      }
    }));
  }

  constructor(private http: HttpClient) { }

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(map(data => {
      if (!data || !data.value) {
        return null;
      }
      const fetchData = JSON.parse(data.value) as {
        userId: string;
        token: string;
        tokenExpirationDate: string;
        email: string;
        displayName: string;
      };

      const expirationTime = new Date(fetchData.tokenExpirationDate);
      if (expirationTime <= new Date()) {
        return null;
      }
      const user = new User(
        fetchData.userId,
        fetchData.displayName,
        fetchData.email,
        fetchData.token,
        expirationTime
      );
      return user;
    }),
    tap(user => {
      if (user) {
        this.userBehave.next(user);
        this.autoLogout(user.tokenDuration);
      }
    }),
    map(user => {
      return !!user;
    })
    );
  }

  onUserSignUp(displayName: string, email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${
        environment.firebaseAPIKey
      }`,
      { displayName, email, password, returnSecureToken: true }
    ).pipe(tap(this.setUserData.bind(this)));
  }

  onUserLogin(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${
        environment.firebaseAPIKey
      }`,
      { email, password, returnSecureToken: true }
    ).pipe(tap(this.setUserData.bind(this)));
  }

  onUserLogout() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.userBehave.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }

  ngOnDestroy() {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
  }

  private autoLogout(duration: number) {
    if (this.logoutTimer) {
      clearTimeout(this.logoutTimer);
    }
    this.logoutTimer = setTimeout(() => {
      this.onUserLogout();
    }, duration);
  }

  private setUserData(userData: AuthResponseData) {
    const expirationTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
    const user = new User(
      userData.localId,
      userData.displayName,
      userData.email,
      userData.idToken,
      expirationTime
    );
    this.userBehave.next(user);
    this.autoLogout(user.tokenDuration);
    this.storeAuthData(
      userData.localId,
      userData.idToken,
      expirationTime.toISOString(),
      userData.email,
      userData.displayName
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    tokenExpirationDate: string,
    email: string,
    displayName: string
  ) {
    const data = JSON.stringify({
      userId,
      token,
      tokenExpirationDate,
      email,
      displayName
    });

    Plugins.Storage.set({
      key: 'authData',
      value: data
    });
  }
}
