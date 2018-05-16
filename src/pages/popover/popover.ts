import { Data } from './../../providers/data/data';
import { Observable } from 'rxjs/Observable';
import { Tasks } from './../../models/task';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  //selector: 'page-popover',
 // templateUrl: 'popover.html',\
 template:`

 <ion-list >
 <button ion-item (click)="showImportantTask()">Highest Priority</button>
 <button ion-item (click)="showAllTasks()">Show All</button>

 </ion-list> `

})
export class PopoverPage {

  tasksCollectionRef: AngularFirestoreCollection<Tasks>;
   tasks$: Observable<Tasks[]>;
   goalID: string;
   allTasks : Tasks[] = [];

   filteredTasks: Tasks[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
  public dataService: Data, public afs: AngularFirestore ) {
    this.goalID = navParams.get("goalID");
    this.allTasks = this.navParams.get("tasks");

    


    console.log(this.goalID);
    console.log(this.allTasks);
    console.log(this.filteredTasks);


    
  }

  close(){
    this.viewCtrl.dismiss(this.tasks$);
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
  console.log(this.filteredTasks);
  this.viewCtrl.dismiss(this.tasks$);
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
  console.log(this.filteredTasks);
  this.viewCtrl.dismiss(this.tasks$);
}

getTasks()
  {
    this.dataService.getTasks(this.goalID).subscribe(tasks => {
      this.filteredTasks = [];
      console.log(tasks);
      this.filteredTasks = tasks;
    });
  }



}
