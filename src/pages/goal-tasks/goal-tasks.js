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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';
import { AddTaskPage } from '../add-task/add-task';
let GoalTasksPage = class GoalTasksPage {
    constructor(navCtrl, navParams, auth, dataService, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.dataService = dataService;
        this.view = view;
        this.goalID = navParams.get("goalID");
        this.dataService.getTasks(this.goalID).subscribe(tasks$ => {
            this.tasks = tasks$;
        });
    }
    ionViewDidLoad() {
    }
    ionViewDidEnter() {
        this.dataService.getTasks().subscribe(tasks$ => {
            this.tasks = tasks$;
        });
    }
    addYourTask() {
        this.navCtrl.push(AddTaskPage, { goalID: this.goalID });
    }
    toggleItem(item) {
        this.tasks.toggleItem(item);
    }
};
GoalTasksPage = __decorate([
    Component({
        selector: 'page-goal-tasks',
        templateUrl: 'goal-tasks.html'
    }),
    __metadata("design:paramtypes", [NavController, NavParams, AuthServiceProvider, Data, ViewController])
], GoalTasksPage);
export { GoalTasksPage };
//# sourceMappingURL=goal-tasks.js.map