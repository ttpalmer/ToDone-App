
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
  // goals: Goals[];
  goals=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public dataService: Data) {
      var db = firebase.firestore();
      var self=this;
    db.collection("Goals").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        self.goals.push({goalID:doc.id,description:doc.get("description")});
    });
});


    // this.dataService.getGoals().subscribe(goals$ => {
    //   this.goals = goals$;
    // });
  }

  ionViewDidLoad(){
   console.log('Signed in with email' + " "+ this.auth.getEmail());
   
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
}
