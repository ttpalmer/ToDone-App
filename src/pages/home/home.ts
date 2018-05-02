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

 /* updateGoals()
  {
    var db = firebase.firestore();
    var self=this;
    
     db.collection("Goals").orderBy("dateCreated").where("key", "==", this.userID).get()
    .then(function(querySnapshot) {
      //Set goals array to zero to add new goals
      self.goals =[];
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        //  if(doc.id != doc.id)
            self.goals.push({goalID:doc.id, description: doc.get("description")});
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  }*/
  removeGoal(goal,ev)
  {
    var db = firebase.firestore();
    db.collection("Goals").doc(goal.goalID).delete().then(function()
  {
    console.log("Document successfully deleted!! " + goal.description);
  }).catch(function (error)
  {
    console.error("Error removing document: ", error);
  });
  ev.stopPropagation();
  //this.updateGoals();

  }

}
