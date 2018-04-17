var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LaunchPage } from './../pages/launch/launch';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Data } from './../providers/data/data';
import { Component } from '@angular/core';
import { App, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { MenuPage } from '../pages/menu/menu';
let MyApp = class MyApp {
    constructor(app, dataService, auth, platform, statusBar, splashScreen) {
        this.dataService = dataService;
        this.auth = auth;
        {
            /*  this.platform.ready().then(() => {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
              });*/
            this.app = app;
            this.platform = platform;
            const unsubscribe = firebase.auth().onAuthStateChanged(user => {
                if (!user) {
                    this.rootPage = LaunchPage;
                }
                else {
                    this.rootPage = MenuPage;
                    unsubscribe();
                }
            });
        }
        // initializeApp()
        // {
        //   this.platform.ready().then(() => {
        //     this.statusBar.styleDefault();
        //     this.splashScreen.hide();
        //   });
        //   this.auth.afAuth.authState
        //   .subscribe(
        //     user => {
        //       if (user) {
        //         this.rootPage = HomePage;
        //       } else {
        //         this.rootPage = LaunchPage;
        //       }
        //     },
        //     () => {
        //       this.rootPage = LoginPage;
        //     }
        //   );
        // }
    }
};
MyApp = __decorate([
    Component({
        templateUrl: 'app.html'
    }),
    __metadata("design:paramtypes", [App, Data, AuthServiceProvider, Platform, StatusBar, SplashScreen])
], MyApp);
export { MyApp };
//# sourceMappingURL=app.component.js.map