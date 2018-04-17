var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';
/**
 * Generated class for the AddgoalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
let AddGoalPage = class AddGoalPage {
    constructor(navCtrl, navParams, dataService, view) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataService = dataService;
        this.view = view;
        this.description = "";
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad AddGoalPage');
    }
    submitNewGoal() {
        if (this.description.length > 0) {
            this.dataService.addGoalToDatabase(this.description);
            this.view.dismiss();
        }
        else {
            console.log("You haven't typed anything");
        }
    }
    closeAddGoal() {
        this.view.dismiss();
    }
};
AddGoalPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-addgoal',
        templateUrl: 'addgoal.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Data, ViewController])
], AddGoalPage);
export { AddGoalPage };
//# sourceMappingURL=addgoal.js.map