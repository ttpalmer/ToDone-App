import { Observable } from 'rxjs/Observable';
import { Tasks } from './../../models/task';
import { AngularFirestoreCollection,AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';

/**
 * Generated class for the AddtaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

   tasksCollectionRef: AngularFirestoreCollection<Tasks>;
   tasks$: Observable<Tasks[]>;
  // tasksDoc: AngularFirestoreDocument<Tasks>;

  description: string = "";
  priority:number;
  //priority
  goalID:string;
  checked: boolean
  tasks: Tasks[];

   task: Tasks = {description: ''}

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public view: ViewController, public afs: AngularFirestore) {
    this.goalID = navParams.get("goalID");
    console.log(this.goalID);
    this.tasksCollectionRef = this.afs.collection('Tasks', ref  => ref.where("goalID", "==", this.goalID));
    this.tasks$ = this.tasksCollectionRef.valueChanges();

    this.getTasks().subscribe(tasks => {
      console.log(tasks);
      this.tasks = tasks;
    }); 
   
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  submitNewTask() {
    if(this.task.description != ' ') {
      console.log(this.goalID);
      this.task.checked = false;
      this.task.goalID = this.goalID;
      this.task.priority = this.tasks.length +1;
      this.dataService.addTask(this.task,this.goalID);
      this.task.description = '';
      this.view.dismiss();
     
    }
    else {
      console.log("You haven't typed anything")
    }

  }

  addTask(task: Tasks)
  {
    
    task.checked = false;
    task.goalID = this.goalID;
    task.priority = this.tasks.length +1;
   console.log('The prioriy of tasks is: ' + task.priority);
  //  this.tasksCollectionRef.add(task);
    console.log(task);
  
  }

  getTasks()
  {
   return this.tasks$; 
  }


  closeAddTask() {
    this.view.dismiss();
  }

}

