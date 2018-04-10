import { AuthServiceProvider } from './../providers/auth-service/auth-service';

import { SignUpPage } from './../pages/sign-up/sign-up';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { LaunchPage } from "./../pages/launch/launch";
import { AddGoalPage } from './../pages/addgoal/addgoal';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { Data } from '../providers/data/data';



const firebaseAuth = {
  apiKey: "AIzaSyAENTge-cuAbAXzrrH_ScMnc6j-iJZGgiQ",
  authDomain: "todone-usc546.firebaseapp.com",
  databaseURL: "https://todone-usc546.firebaseio.com",
  projectId: "todone-usc546",
  storageBucket: "todone-usc546.appspot.com",
  messagingSenderId: "232551817449"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    LaunchPage,
    AddGoalPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    LaunchPage,
    AddGoalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Data
  ]
})
export class AppModule {}
