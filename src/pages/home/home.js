var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Data } from './../../providers/data/data';
import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";
let HomePage = class HomePage {
    constructor(navCtrl, navParams, auth, dataService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.dataService = dataService;
        this.dataService.getGoals().subscribe(goals$ => {
            this.goals = goals$;
        });
    }
    ionViewDidLoad() {
        console.log('Signed in with email' + " " + this.auth.getEmail());
    }
    addYourGoal() {
        this.navCtrl.push(AddGoalPage);
    }
    viewGoalDetails(goal) {
        this.navCtrl.push(GoalTasksPage, {
            goalID: goal
        });
    }
    Logout() {
        this.auth.signOut();
        this.navCtrl.setRoot(LaunchPage);
    }
};
HomePage = __decorate([
    Component({
        selector: 'page-home',
        templateUrl: 'home.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AuthServiceProvider, Data])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map