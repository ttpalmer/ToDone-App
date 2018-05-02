import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Tasks } from './../../models/task';
import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Events } from 'ionic-angular';
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
  tasks: Tasks[];
  userID: String;
  tasksCollectionRef: AngularFirestoreCollection<Tasks>
   tasks$: Observable<Tasks[]>
  goalID:string;

  description: string;
  checkedTasks: any;
  checked: boolean;
  percent: number;



  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth, public dataService: Data, public view: ViewController, public afs: AngularFirestore) {
    this.goalID = navParams.get("goalID");
    console.log(this.goalID);
    this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID).orderBy("priority"));
    this.tasks$ = this.tasksCollectionRef.snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Tasks;
            console.log(data);
            return data;
          });
        });
   this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
   
  });
  
  this.getTasks().subscribe(tasks => {
    console.log(tasks);
    this.tasks = tasks;
  });
  }

  
  ionViewWillEnter(){
    console.log('New tasks have been retrieved' + this.getTasks());
    this.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    });
  //  this.updateTasks();
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


  getTasks()
  {
   return this.tasks$; 
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
 // this.updateTasks();
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
      //  self.tasks.push({ goalID:doc.id, description:doc.get("description"), priority: doc.get("priority")});
        console.log("Tasks have been pushed!!")
      
    });
})
.catch(function(error) {
    console.log("Error getting documents: ", error);
});
}

reorderTasks(indexes) {
  let element = this.tasks[indexes.from]
  var task = this.tasks[indexes.from];
  var db = firebase.firestore();
  console.log("The old priority is" + task.priority)
  this.tasks.splice(indexes.from, 1);
  this.tasks.splice(indexes.to, 0, element);
  //task = this.tasks[indexes.from];
 // task = this.tasks.find(indexes => indexes.from = task.priority);
 // this.description = task.desecription;

  //this.updateTasks();
  
  //return task.priority;
}

closeGoalTask() {
  this.view.dismiss(this.tasks$);
}

}
