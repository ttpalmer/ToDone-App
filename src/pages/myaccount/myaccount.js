var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Data } from './../../providers/data/data';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
/**
 * Generated class for the MyaccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let MyAccountPage = class MyAccountPage {
    constructor(navCtrl, navParams, afAuth, data) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.afAuth = afAuth;
        this.data = data;
        this.users = {};
        this.users = firebase.auth().currentUser;
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad MyaccountPage');
    }
    userInfo() {
        this.data.userInfo(this.firstName, this.lastName);
        this.email = this.afAuth.getEmail;
    }
};
MyAccountPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-myaccount',
        templateUrl: 'myaccount.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AuthServiceProvider, Data])
], MyAccountPage);
export { MyAccountPage };
//# sourceMappingURL=myaccount.js.map