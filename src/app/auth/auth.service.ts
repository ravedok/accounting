import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fb from 'firebase';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState, AuthState } from './auth.reducer';
import { setUser, clearUser } from './auth.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription = new Subscription();
  user: User;

  constructor(
    private store: Store<AppState>,
    private fbAuth: AngularFireAuth,
    private fbStore: AngularFirestore,
    private router: Router
  ) {}

  initAuthListener() {
    this.store.select('auth').subscribe((auth: AuthState) => {
      this.user = auth.user;
    });

    this.fbAuth.authState.subscribe((fbUser: fb.User) => {
      if (fbUser) {
        this.userSubscription = this.fbStore
          .doc(`${fbUser.uid}/user`)
          .valueChanges()
          .subscribe((data: User) => {
            this.store.dispatch(setUser({ user: data }));
          });
      } else {
        this.store.dispatch(clearUser());
        this.userSubscription.unsubscribe();
      }
    });
  }

  isAuth() {
    return this.fbAuth.authState.pipe(
      map((fbUser: fb.User) => {
        return fbUser != null;
      })
    );
  }

  register(name: string, email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.fbAuth.auth
        .createUserWithEmailAndPassword(email, password)
        .then(resp => {
          const user: User = {
            uid: resp.user.uid,
            name,
            email: resp.user.email
          };

          this.fbStore
            .doc(`${user.uid}/user`)
            .set(user)
            .then(() => {
              resolve();
            });
        })
        .catch((error: fb.FirebaseError) => {
          switch (error.code) {
            case 'auth/email-already-in-use':
              // TODO Posibilidad de recuperar contraseña?
              reject('El email introducido ya está registrado');
              break;
            default:
              reject('Error durante el registro');
              break;
          }
        });
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.fbAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          resolve();
        })
        .catch((error: fb.FirebaseError) => {
          switch (error.code) {
            case 'auth/user-not-found':
              reject('El email introducido no está registrado');
              break;
            case 'auth/wrong-password':
              reject('La contraseña introducida no es válida');
              break;

            default:
              reject('Error durante la identificación ');
          }
        });
    });
  }

  logout() {
    this.fbAuth.auth.signOut();
    this.router.navigate(['/login']);
  }
}
