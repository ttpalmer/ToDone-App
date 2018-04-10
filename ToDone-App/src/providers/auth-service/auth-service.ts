import { AngularFireAuth } from 'angularfire2/auth';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  private user : firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user =>{
      this.user = user;
    });
  }

  signInWithEmail(credentials)
  {
    console.log('Sign in with email');
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password);
  }

  getEmail() {
		return this.user && this.user.email;
  }
  signOut(): Promise<void>{
    return this.afAuth.auth.signOut();
  }

  signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
	}

}
