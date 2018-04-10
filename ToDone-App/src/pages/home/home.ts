import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";


import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  goals: any[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private auth: AuthServiceProvider) {
    
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

  Logout() 
  {
     this.auth.signOut();
    this.navCtrl.setRoot(LaunchPage);
  }
}
