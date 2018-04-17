import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';

import { AddGoalPage } from "../addgoal/addgoal";
import { HomePage } from "../home/home";
import { AddTaskPage } from '../add-task/add-task';
import firebase from 'firebase';


@Component({
  selector: 'page-goal-tasks',
  templateUrl: 'goal-tasks.html'
})

export class GoalTasksPage {
  tasks=[];
  userID: String;
  
  goalID:string;

  description: string;

  //TODO 
  //          WORK ON MAKING TASKS AUTO RELOAD

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth, public dataService: Data, public view: ViewController) {
    this.goalID = navParams.get("goalID");

   this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
    var db = firebase.firestore();
      var self=this;
       db.collection("Tasks").where("goalID", "==", this.goalID).get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            self.tasks.push({ goalID:doc.id, description:doc.get("description"), priority: doc.get("priority")});
            console.log("Tasks have been pushed!!")
          
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  });
  }

  ionViewDidLoad(){
   
  }
  
  ionViewWillEnter(){
    this.dataService.getTasks(this.goalID);
  }


  addYourTask(){
    this.navCtrl.push(AddTaskPage,{goalID:this.goalID});
  }

  //TODO 
  //      for some reason it toggles but not without giving an error first 

 toggleItem(item): void {
   item = this.tasks;
  //  this.tasks.toggleItem(item);
  }

}
