var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
let AuthServiceProvider = class AuthServiceProvider {
    constructor(afAuth) {
        this.afAuth = afAuth;
        afAuth.authState.subscribe(user => {
            this.user = user;
        });
    }
    signInWithEmail(credentials) {
        console.log('Signed in with email' + " " + credentials.email + " " + credentials.password);
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }
    getEmail() {
        console.log(firebase.auth().currentUser);
        return this.user.displayName && this.user.email;
    }
    signOut() {
        console.log('You have logged out successfully');
        return this.afAuth.auth.signOut();
    }
    signUp(credentials) {
        console.log('You have successfully signed up' + " " + credentials.email + " " + credentials.password);
        return firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then(newUser => {
            firebase
                .database()
                .ref('/userProfile')
                .child(newUser.uid)
                .set({ email: credentials.email });
        });
    }
    getDisplayName(userName) {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: userName,
            photoURL: null
        }).then(function () {
            // Update successful.
        }).catch(function (error) {
            // An error happened.
        });
    }
};
AuthServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFireAuth])
], AuthServiceProvider);
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map