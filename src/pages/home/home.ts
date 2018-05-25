import { Goals } from './../../models/goal';
import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Events, App } from 'ionic-angular';
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
  public dataService: Data, private afAuth : AngularFireAuth, public _app: App) {
   /* this.afAuth.authState.subscribe(user =>{*/
    let user = firebase.auth().currentUser;
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);

      this.dataService.getUsersGoals().subscribe(goals => {
      console.log(goals);
      this.goals = goals;
    });
      
//});
    
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
    this._app.getRootNav().setRoot(LaunchPage);
  }

  removeGoal(goal,ev)
  {
    console.log(goal);
    this.dataService.removeGoal(goal);

  ev.stopPropagation();

  }

}
