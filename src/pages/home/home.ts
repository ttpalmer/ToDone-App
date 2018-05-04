import { Goals } from './../../models/goal';
import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events } from 'ionic-angular';
import { Data } from './../../providers/data/data';

import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";
import firebase from 'firebase';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

//TODO 
//        WORK ON MAKING GOALS AUTO RELOAD

export class HomePage {

  goals: Goals[];
  goalID: string;

  userID: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, 
  public dataService: Data, private afAuth : AngularFireAuth) {
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
      
});
    this.dataService.getUsersGoals().subscribe(goals => {
      console.log(goals);
      this.goals = goals;
    });
  }

  ionViewDidLoad(){
   console.log('Signed in with email: '+ this.auth.getEmail());
  }
  
  ionViewDidEnter(){
    console.log('The view has been refreshed new goals should be displayeed');
 //  this.updateGoals();
  }
  addYourGoal() {
   this.navCtrl.push(AddGoalPage);

  }

  viewGoalDetails(goal) {
    console.log(goal);
    this.navCtrl.push(GoalTasksPage, {
      goalID: goal.goalID
    });
  }

  Logout() :void
  {
    this.auth.signOut();
    this.navCtrl.setRoot(LaunchPage);
  }

  removeGoal(goal,ev)
  {
    console.log(goal);
    this.dataService.removeGoal(goal);

  ev.stopPropagation();

  }

}
