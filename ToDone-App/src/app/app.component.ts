import { LoginPage } from './../pages/login/login';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { Component } from '@angular/core';
import { App,Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LaunchPage } from '../pages/launch/launch';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  [x: string]: any;
  statusBar: any;
  rootPage:any = LaunchPage;
  private app;
  private platform;

  constructor(app: App, private auth: AuthServiceProvider, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    this.app = app;
    this.platform = platform;
    

    
  }

  initializeApp()
  {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.auth.afAuth.authState
    .subscribe(
      user => {
        if (user) {
          this.rootPage = HomePage;
        } else {
          this.rootPage = LoginPage;
        }
      },
      () => {
        this.rootPage = LoginPage;
      }
    );

  }
}

