var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HomePage } from './../home/home';
import { LoginPage } from './../login/login';
import { SignUpPage } from './../sign-up/sign-up';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
/**
 * Generated class for the LaunchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let LaunchPage = class LaunchPage {
    constructor(uAuth, navCtrl, navParams) {
        this.uAuth = uAuth;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.homepage = HomePage;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad LaunchPage');
    }
    SignIn() {
        this.navCtrl.push(LoginPage);
    }
    Register() {
        this.navCtrl.push(SignUpPage);
    }
};
LaunchPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-launch',
        templateUrl: 'launch.html',
    }),
    __metadata("design:paramtypes", [AngularFireAuth, NavController, NavParams])
], LaunchPage);
export { LaunchPage };
//# sourceMappingURL=launch.js.map