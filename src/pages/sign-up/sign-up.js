var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let SignUpPage = class SignUpPage {
    constructor(afAuth, navCtrl, navParams, fb, auth) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.form = fb.group({
            email: ['', Validators.compose([Validators.required, Validators.email])],
            password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad SignUpPage');
    }
    /* async doRegister()
     {
        var user =
       {
         username: this.username,
         email: this.email,
         password: this.password
       }
       try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.password);
      var nuser = this.afAuth.auth.currentUser;
      nuser.updateProfile({
        displayName: user.username,
        photoURL: null
      }).then(function(){
        //Update Successful
        console.log(nuser.displayName);
      }).catch(function(error){
        //An error happend
      });
       }
       catch(e){
         console.error(e);
       }
     
     }*/
    signup() {
        let data = this.form.value;
        let credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signUp(credentials).then(() => this.navCtrl.setRoot('MenuPage'), error => this.signupError = error.message);
    }
};
SignUpPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-sign-up',
        templateUrl: 'sign-up.html',
    }),
    __metadata("design:paramtypes", [AngularFireAuth, NavController, NavParams, FormBuilder, AuthServiceProvider])
], SignUpPage);
export { SignUpPage };
//# sourceMappingURL=sign-up.js.map