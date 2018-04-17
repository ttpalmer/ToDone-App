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
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let LoginPage = class LoginPage {
    constructor(afAuth, navCtrl, navParams, fb, auth) {
        this.afAuth = afAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.loginForm = fb.group({
            email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
            password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(6)]))
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LoginPage');
    }
    /* async doSignin()
     {
       var User = {
         email: this.email,
         password: this.password
       }
       try {
       const result = this.afAuth.auth.signInWithEmailAndPassword(User.email,User.password);
       console.log(result);
       console.log("Sign in successful email " + User.email + "password: " + User.password );
       this.navCtrl.push(HomePage);
       }
       catch(e)
       {
         console.error(e);
       }
     }*/
    login() {
        let data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        let credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signInWithEmail(credentials)
            .then(() => this.navCtrl.setRoot('MenuPage'), error => this.loginError = error.message);
    }
};
LoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-login',
        templateUrl: 'login.html',
    }),
    __metadata("design:paramtypes", [AngularFireAuth, NavController, NavParams, FormBuilder, AuthServiceProvider])
], LoginPage);
export { LoginPage };
//# sourceMappingURL=login.js.map