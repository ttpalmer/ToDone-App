import { AngularFireAuth } from 'angularfire2/auth';
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

  signInWithEmail(credentials) : Promise<void>
  {
    console.log('Signed in with email' + " "+ credentials.email + " " + credentials.password);
    return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,credentials.password); 
  }

  getEmail() {
		return this.user && this.user.email;
  }
  signOut(): Promise<void>{
    console.log('You have logged out successfully');
    return this.afAuth.auth.signOut();
    
  }

  signUp(credentials) {
    console.log('You have successfully signed up' + " "+ credentials.email + " " + credentials.password);
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
	}

}
