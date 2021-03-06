import { PopoverPage } from './../pages/popover/popover';
import { MenuPage } from './../pages/menu/menu';
import { TabsPage } from './../pages/tabs/tabs';
import { MyAccountPage } from './../pages/myaccount/myaccount';
import { AuthServiceProvider } from './../providers/auth-service/auth-service';

import { SignUpPage } from './../pages/sign-up/sign-up';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule,ViewChild,Component } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Tabs, MenuController,Nav } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from './../pages/login/login';
import { LaunchPage } from "./../pages/launch/launch";
import { AddGoalPage } from './../pages/addgoal/addgoal';
import { GoalTasksPage } from './../pages/goal-tasks/goal-tasks';
import { AddTaskPage } from './../pages/add-task/add-task';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Data } from '../providers/data/data';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Task,Tasks } from '../models/task';


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
    AddGoalPage,
    MyAccountPage,
    TabsPage,
    MenuPage,
    GoalTasksPage,
    AddTaskPage,
    PopoverPage,

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFirestoreModule.enablePersistence(),
    NgxErrorsModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignUpPage,
    LoginPage,
    LaunchPage,
    AddGoalPage,
    MyAccountPage,
    TabsPage,
    MenuPage,
    GoalTasksPage,
    AddTaskPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Data,
    Facebook,
    Task
  ]
})
export class AppModule {}
