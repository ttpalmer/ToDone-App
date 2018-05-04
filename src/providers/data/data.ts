import { Tasks } from '../../models/task';
import { Goals } from '../../models/goal';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase';


/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class Data {

   goalsCollectionRef: AngularFirestoreCollection<Goals>;
   goals$: Observable<Goals[]>;
   goalsDoc: AngularFirestoreDocument<Goals>;

   tasksCollectionRef: AngularFirestoreCollection<Tasks>;
   tasks$: Observable<Tasks[]>;
   tasksDoc: AngularFirestoreDocument<Tasks>;

   userID: string;

   goalID: string;

   //goalKey: String;
   tasks: Tasks[]=[];
   //goals: Goals[]=[];
 

  constructor(public afs: AngularFirestore, private afAuth : AngularFireAuth) {
    
    this.afAuth.authState.subscribe(user =>{
      if(user) this.userID = user.uid
      console.log('This users ID is: ' + this.userID);
         this.goalsCollectionRef = this.afs.collection('Goals', ref => ref.where("userID", "==", this.userID).orderBy('dateCreated'));
      this.goals$ = this.goalsCollectionRef.snapshotChanges().map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Goals;
          data.goalID = a.payload.doc.id;
          console.log('The goal ID is: ' + data.goalID);
          return data;
        });
      });
  
    });
    console.log('Hello Data Provider');

  }

  userInfo(firstName:string, lastName:string): Promise<void>
  {
    var db = firebase.firestore();
    db.collection("users").add({
      first: firstName,
      last: lastName,
    })
      .then( (docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });
    var docRef = db.collection("users").doc("first");

    return docRef.get().then(function(doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }


  getGoals() {
    if(!this.userID)
      return;

      console.log("The user of these goals is: " + this.userID);

      var db = firebase.firestore();
      
      var self=this;
       db.collection("Goals").where("key", "==", this.userID).orderBy('dateCreated').get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
          // self.goals$.push({goalID:doc.id, description: doc.get("description")});
           self.goals$.subscribe(data => {doc.data()});
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  }

  addGoal(goal: Goals ){
    const id = this.afs.createId();
    goal.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
    goal.userID = this.userID;
    this.goalsCollectionRef.add(goal);
    
    console.log(goal);
  }

  addTask(task:Tasks, goalID)
  {
    const id= this.afs.createId();
    task.goalID = goalID;
    task.taskID =id;
    this.tasksCollectionRef = this.afs.collection<Tasks>('Tasks', ref => ref.where("goalID", "==", task.goalID));
    this.tasksCollectionRef.doc(id).set(task);
  }


  getUsersGoals()
  {
   return this.goals$; 
  }
 
  getTasks(goalID){ 
    console.log(goalID);
      this.tasksCollectionRef = this.afs.collection<Tasks>('Tasks', ref => ref.where("goalID", "==", goalID).orderBy('priority'));
    this.tasks$ = this.tasksCollectionRef.snapshotChanges().map(changes => {
      return changes.map( a => {
        const data = a.payload.doc.data() as Tasks;
        data.taskID = a.payload.doc.id;
        console.log('tasks have been retrieved ' + data);
        return data;
      });
    });
       return this.tasks$;
  }

  updateTask(task: Tasks)
  {
    console.log(task);
    this.tasksDoc = this.afs.doc(`Tasks/${task.taskID}`);
    this.tasksDoc.set(task);
  //  this.getTasks(task.goalID);
    
  }

  removeGoal(goal:Goals){
    console.log(goal);
    
    this.getTasks(goal.goalID).subscribe((mtasks) => {
      this.tasks = mtasks;
      console.log(this.tasks);
      this.tasks.forEach(task =>{
      console.log(task);
      if(task.goalID == goal.goalID)
      {
        console.log(task.taskID);
        this.tasksCollectionRef.doc(task.taskID).delete();
        console.log('Tasks have been deleted: ' + task);
        
      }
    });
    });
   // console.log(this.tasks)
    
      this.goalsCollectionRef.doc(goal.goalID).delete();
        console.log('Goals have been deleted: ' + goal);
  }



//TODO add priority as int and goal id
  addTaskToDatabase(taskDesc: string,priority:string,goalID:string,checked: boolean /*int taskPriority, Goal ID?? */) {

    if(!this.userID)
      return;

    console.log(goalID);
    var db = firebase.firestore();
    var newTask = db.collection("Tasks");
    var newTaskDoc = newTask.doc(taskDesc);
    var task = {
      description: taskDesc,
      priority: priority,
      goalID: goalID,
      checked:false
    }
    newTaskDoc.set(task);
    console.log("Document written with ID: "+ newTaskDoc.id);
      console.log("You created a new task");
  

  }

  
}
