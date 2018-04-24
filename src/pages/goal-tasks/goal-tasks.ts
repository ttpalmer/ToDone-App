import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, reorderArray,LoadingController } from 'ionic-angular';
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
  tasksList: any[];
  
  goalID:string;

  description: string;
  checkedTasks: any;
  checked: boolean;
  percent: number;

  //TODO 
  //          WORK ON MAKING TASKS AUTO RELOAD

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth, 
    public dataService: Data, public view: ViewController, public loadingCtrl: LoadingController) {
    this.goalID = navParams.get("goalID");

   this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
    var db = firebase.firestore();
      var self=this;
       db.collection("Tasks").orderBy("priority").where("goalID", "==", this.goalID).limit(1).get()
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
    console.log('New tasks have been retrieved' + this.dataService.getTasks(this.goalID));
    this.updateTasks();
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

  updateTasks(){
    var db = firebase.firestore();
      var self=this;
       db.collection("Tasks").orderBy("priority").where("goalID", "==", this.goalID).limit(1).get()
      .then(function(querySnapshot) {
        //Set tasks array set to zero to update with new task
        self.tasks =[];
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

  }
  removeTask(task)
  {
    var db = firebase.firestore();
    db.collection("Tasks").doc(task.goalID).delete().then(function()
  {
    console.log("Document successfully deleted!! " + task.description);
  }).catch(function (error)
  {
    console.error("Error removing document: ", error);
  });
  this.updateTasks();
}

isChecked()
{
   this.checked = false;
  let count = 0;
    this.tasks.forEach(task => {
			if(task.checked){
        count++;
        console.log(count);
			}
		})
		return count;
  
}
showAllTasks() : void
{
  var db = firebase.firestore();
  var self=this;
   db.collection("Tasks").orderBy("priority").where("goalID", "==", this.goalID).get()
  .then(function(querySnapshot) {
    //Set tasks array set to zero to update with new task
    self.tasks =[];
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
}


reorderTasks(indexes) {
  
 // let element = this.tasks[indexes.from]
  var movingtask = this.tasks[indexes.from];
  var db = firebase.firestore();
  console.log("The old priority is" + movingtask.priority)
//  this.tasks.splice(indexes.from, 1);
//  this.tasks.splice(indexes.to, 0, element);
//  task = this.tasks[indexes.from];
  this.tasks = reorderArray(this.tasks,indexes);
  let oldindex =  this.tasks.indexOf(movingtask)+1;
  var newtask =  this.tasks[indexes.to];
  let newindex = this.tasks.indexOf(newtask)+1;
  movingtask.priority = newtask.priority;
  newtask.priority = newindex;
  this.description = movingtask.description;
  var newTaskPriorityRef = db.collection("Tasks").doc(movingtask.description);
  return newTaskPriorityRef.update({
    priority: movingtask.priority
})
.then(function() {
    console.log("Document successfully updated! " + movingtask.description + " " + movingtask.priority);
})
.catch(function(error) {
    // The document probably doesn't exist.
    console.error("Error updating document: ", error);
});

  //this.updateTasks();
  
  //return task.priority;
}

}
