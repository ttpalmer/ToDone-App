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

  getEmail() {
		return this.user && this.user.email;
	}

}
