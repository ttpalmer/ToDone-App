var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { MenuPage } from './../pages/menu/menu';
import { TabsPage } from './../pages/tabs/tabs';
import { MyAccountPage } from './../pages/myaccount/myaccount';
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
import { GoalTasksPage } from './../pages/goal-tasks/goal-tasks';
import { AddTaskPage } from './../pages/add-task/add-task';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Data } from '../providers/data/data';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
const firebaseAuth = {
    apiKey: "AIzaSyAENTge-cuAbAXzrrH_ScMnc6j-iJZGgiQ",
    authDomain: "todone-usc546.firebaseapp.com",
    databaseURL: "https://todone-usc546.firebaseio.com",
    projectId: "todone-usc546",
    storageBucket: "todone-usc546.appspot.com",
    messagingSenderId: "232551817449"
};
let AppModule = class AppModule {
};
AppModule = __decorate([
    NgModule({
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
            AddTaskPage
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
            AddTaskPage
        ],
        providers: [
            StatusBar,
            SplashScreen,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            AuthServiceProvider,
            Data
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map