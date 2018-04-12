
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Data } from './../../providers/data/data';
import { Goals } from './../../providers/data/data';
import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";
import firebase from 'firebase';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  goals: Goals[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public dataService: Data) {
    this.dataService.getGoals().subscribe(goals$ => {
      this.goals = goals$;
    });
  }

  ionViewDidLoad(){
   console.log('Signed in with email' + " "+ this.auth.getEmail());
   
  }
  
  addYourGoal() {
   this.navCtrl.push(AddGoalPage);

  }

  viewGoalDetails(goal) {
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
