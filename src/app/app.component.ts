import { HomePage } from './../pages/home/home';
import { LaunchPage } from './../pages/launch/launch';
import { LoginPage } from './../pages/login/login';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { Data } from './../providers/data/data';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { Component } from '@angular/core';
import { App,Platform, Menu } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AddGoalPage } from '../pages/addgoal/addgoal';


import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';

import firebase from 'firebase';
import { MenuPage } from '../pages/menu/menu';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  [x: string]: any;
  statusBar: any;
  
  private app;
  private platform;

  constructor(app: App, private dataService: Data, private auth: AuthServiceProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    {
    /*  this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });*/
    this.app = app;
    this.platform = platform;
    const unsubscribe = firebase.auth().onAuthStateChanged(user =>{
      if (!user)
      {
        this.rootPage = LaunchPage;
      }
      else{
        this.rootPage = HomePage;
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
}

