import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  goals: any[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    
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
}
