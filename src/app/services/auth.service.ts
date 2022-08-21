import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as auth from '../auth/auth.actions'

import { map } from "rxjs/operators";
import { Usuario } from '../models/usuario.model';
import { Subscription } from 'rxjs';
import { unSetItems } from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private _user: Usuario;
  userSubscription: Subscription = null;

  constructor(private fireAuth: AngularFireAuth,
              private firebase: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener() {

    this.fireAuth.authState.subscribe((user) => {

      if (user) {

        this.userSubscription = this.firebase.doc(`${user.uid}/usuario`).valueChanges().subscribe(
          (userFirebase: any) => {

            const userfb = Usuario.fromFirebase(userFirebase)
            this._user = userfb;
            this.store.dispatch(auth.setUser({ user: userfb }));
          })

      } else {
        this._user = null;
        this.userSubscription?.unsubscribe();
        this.store.dispatch(auth.unSetUser());
        this.store.dispatch( unSetItems());
      }
      // this.userActive = user;
    });
  }

  get user() {
    return this._user;
  }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        const newUser = new Usuario(user.uid, nombre, user.email);
        return this.firebase.doc(`${user.uid}/usuario`)
          .set({ ...newUser });
      });
  }

  loginUsuario(email: string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logOut() {

    return this.fireAuth.signOut();
  }

  isAuth() {
    return this.fireAuth.authState
      .pipe(
        map(
          fbUser => fbUser != null
        )
      )
  }
}
