import { PopoverPage } from './../popover/popover';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Tasks } from './../../models/task';
import { AngularFireAuth } from 'angularfire2/auth';
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController, Events, reorderArray, PopoverController, AlertController } from 'ionic-angular';
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
  importantTask: Tasks[];
  userID: String;
  tasksCollectionRef: AngularFirestoreCollection<Tasks>;
   tasks$: Observable<Tasks[]>;
   tasksDoc: AngularFirestoreDocument<Tasks>;
  goalID:string;

  description: string;
  checkedTasks: any;
  checked: boolean;
  percent: number;

  isShown: boolean;
  tasks: Tasks[];



  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth : AngularFireAuth, public alertCtrl: AlertController ,
    public dataService: Data, public view: ViewController, public afs: AngularFirestore, public popoverCtrl: PopoverController) {

    this.goalID = navParams.get("goalID");
    console.log(this.goalID);
      
   this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
      
  });
  this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID).orderBy("priority").limit(1));
        
    
  
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

  showImportantTask()
  {
    this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID).orderBy("priority").limit(1));
    this.tasks$ = this.tasksCollectionRef.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Tasks;
        console.log(data);
        return data;
      });
    });
  this.getTasks();
  }


  getTasks()
  {
  this.dataService.getTasks(this.goalID).subscribe(tasks => {
    this.tasks = [];
    console.log(tasks);
    this.tasks = tasks;
  });
  }

  getImportantTask()
  {
    this.dataService.getTasks(this.goalID).subscribe(tasks => {
      this.importantTask = [];
      console.log(tasks);
      this.importantTask = tasks;
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

}

isChecked(ev)
{
      for(let i = 0; i < this.tasks.length; i++)
      {
        var task = this.tasks[i];
          if(task.checked)
     {
       task.checked = true;
       task.priority = this.tasks.length;
        this.dataService.updateTask(task);
        console.log(task);
     }
     else if (!task.checked){
        task.checked = false;
        task.priority = i+1;
     console.log( task );
     console.log('The index of the task is: ' + task.priority);
    this.dataService.updateTask(task);
}
      }
 
  
  
   
  /*let confirm = this.alertCtrl.create({
    title: 'Are you finished?',
    message: 'Are you sure you have finished this task?',
    buttons: [
      {
        text: 'No',
        handler: () => {
          console.log('No clicked');
          task.checked = false;
          task.priority = this.tasks.indexOf(task)+1;
          this.dataService.updateTask(task);
        }
      },
      {
        text: 'Yes',
        handler: () => {
          console.log('Yes clicked');
          task.checked = true;
          task.priority = this.tasks.length+1;
          this.dataService.updateTask(task);
        }
      }
    ]
  });
  confirm.present();*/

  console.log(task);
}
showAllTasks() : void
{
  this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID).orderBy("priority"));

  this.tasks$ = this.tasksCollectionRef.snapshotChanges().map(actions => {
    return actions.map(a => {
      const data = a.payload.doc.data() as Tasks;
      console.log(data);
      return data;
    });
  });
this.getTasks();
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

tasksShown(event)
{
  if (this.tasks.length == 1){
    this.isShown = false;
  }
  else if (this.tasks.length > 1)
  {
    this.isShown = false
  } 
}

presentPopover(myEvent){
  let popover = this.popoverCtrl.create(PopoverPage,
  {
    goalID: this.goalID,
    tasks: this.tasks
  });

  let stable = this.tasks$;
  popover.onDidDismiss(data => {
    console.log(data)
    if(data == null)
    {
      data = stable;
     this.tasks$ = data;
    }
    this.tasks$ = data;
  });
  popover.present({
    ev: myEvent
  });
  this.getTasks();
}


}
