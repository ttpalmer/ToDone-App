
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import  { Data } from './../../providers/data/data';

import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  public goals = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public dataService: Data, private auth: AuthServiceProvider) {
    this.goals = this.dataService.getGoals();
  }

  ionViewDidLoad(){
   console.log('Signed in with email' + " "+ this.auth.getEmail());
   
  }
  
  addYourGoal() {
    let addGoal = this.modalCtrl.create(AddGoalPage);
    addGoal.onDidDismiss((goal) => {
      if(goal) {
        //this.saveGoal(goal);
      }
    });

    addGoal.present();

  }

  viewGoal(goal) {
    this.navCtrl.push(GoalTasksPage, {
      goal: goal
    });
  }

  Logout() :void
  {
    this.auth.signOut();
    this.navCtrl.setRoot(LaunchPage);
  }
}
