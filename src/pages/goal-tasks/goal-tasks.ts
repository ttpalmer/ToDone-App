import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tasks } from './../../models/task';
import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Events, reorderArray } from 'ionic-angular';
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
  tasksCollectionRef: AngularFirestoreCollection<Tasks>;
   tasks$: Observable<Tasks[]>;
   tasksDoc: AngularFirestoreDocument<Tasks>;
  goalID:string;

  description: string;
  checkedTasks: any;
  checked: boolean;
  percent: number;



  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth, 
    public dataService: Data, public view: ViewController, public afs: AngularFirestore) {

    this.goalID = navParams.get("goalID");
    console.log(this.goalID);
      
   this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
      
  });
  this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID).orderBy("priority"));
        
    
  
  }

  
  ionViewWillEnter(){
  /*  this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID).orderBy("priority"));
    this.tasksDoc = this.afs.doc<Tasks>('Tasks/${task.taskID}');*/
    this.tasks$ = this.tasksCollectionRef.snapshotChanges().map(actions => {
          return actions.map(a => {
            const data = a.payload.doc.data() as Tasks;
         //   var task = data;
            console.log(data);
          //  data.priority = a.payload.newIndex +1;
           // task.priority = data.priority;
           // task.taskID = a.payload.doc.id;
            return data;
          });
        });
    this.getTasks();
  
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
  // return this.tasks$; 
  this.dataService.getTasks(this.goalID).subscribe(tasks => {
    this.tasks = [];
    console.log(tasks);
    this.tasks = tasks;
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

updateTasks(task:Tasks)
{
  console.log(this.tasks);
      this.tasks.forEach(item =>{
        console.log(item);
     // task = item;
     this.dataService.updateTask(item);
  })

}


reorderTasks(indexes) {

 this.tasks = reorderArray(this.tasks,indexes);
 console.log(this.tasks);
 for(let i = 0; i < this.tasks.length; i++)
 {
   console.log(this.tasks[i]);
    var task = this.tasks[i];
    task.priority = i+1;

 }
 this.updateTasks(task);
}

closeGoalTask() {
  this.view.dismiss(this.tasks$);
}

}
