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
   //tasks: Tasks[]=[];
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

     /* this.goalsCollectionRef = this.afs.collection('Goals', ref => ref.orderBy('dateCreated'));
      this.goals$ = this.goalsCollectionRef.snapshotChanges().map(changes => {
        return changes.map( a => {
          const data = a.payload.doc.data() as Goals;
          data.key = a.payload.doc.id;
          console.log('Goals have been retrieved ' + data);
          return data;
        });
  
      });*/
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

    goal.dateCreated = firebase.firestore.FieldValue.serverTimestamp();
    goal.userID = this.userID;
    this.goalsCollectionRef.add(goal);
    
    console.log(goal);
  }


  getUsersGoals()
  {
   return this.goals$; 
  }
 
  getTasks(){ 
       return this.tasks$;
  }

  addGoalToDatabase(goalDesc: string, key: String ) {
   
    if(!this.userID)
      return;

    var db = firebase.firestore();
    var newGoal = db.collection("Goals");
    var newGoalDoc = newGoal.doc();
     var goal = {
        description: goalDesc,
        dateCreated: new Date(),
        key: this.userID
      };
    newGoalDoc.set(goal);
    console.log("Document written with ID: "+ key);
      console.log("You created a new goal");

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
    
    
    /*db.collection("Tasks").add({
      description: taskDesc,
      priority: priority,
      goalID: goalID,
      checked:0

    })
      .then( (docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });

      console.log("You created a new task");*/

  }

  
}
