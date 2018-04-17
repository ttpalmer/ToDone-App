import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
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

  goals=[];

  userID: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public dataService: Data, private afAuth : AngularFireAuth) {
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
  /*    var db = firebase.firestore();
      var self=this;
       db.collection("Goals").where("key", "==", this.userID).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            self.goals.push({goalID:doc.id, description: doc.get("description")});
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });*/
      
});
  }

  ionViewDidLoad(){
   console.log('Signed in with email' + " "+ this.auth.getEmail());
   var db = firebase.firestore();
   var self=this;
    db.collection("Goals").where("key", "==", this.userID).get()
   .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
         // doc.data() is never undefined for query doc snapshots
         console.log(doc.id, " => ", doc.data());
         self.goals.push({goalID:doc.id, description: doc.get("description")});
     });
 })
 .catch(function(error) {
     console.log("Error getting documents: ", error);
 });
   
   
  }
  
  ionViewWillEnter(){
    console.log('The view has been refreshed new goals should be displayeed');
   this.updateGoals();
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

  updateGoals()
  {
    var db = firebase.firestore();
    var self=this;
    
     db.collection("Goals").where("key", "==", this.userID).get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          if(doc.id != doc.id)
            self.goals.push({goalID:doc.id, description: doc.get("description")});
      });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  }
}
