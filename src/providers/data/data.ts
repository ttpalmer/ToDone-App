
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import firebase from 'firebase';

declare var require: any

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export interface Goals {
  description: string;
}
export interface Tasks{
  description: string;
}

@Injectable()
export class Data {

   goalsCollectionRef: AngularFirestoreCollection<Goals>;
   goals$: Observable<Goals[]>;
   tasksCollectionRef: AngularFirestoreCollection<Tasks>;
   tasks$: Observable<Tasks[]>;
 

  constructor(public afs: AngularFirestore) {

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
    this.goalsCollectionRef = this.afs.collection('Goals', ref => ref.orderBy('dateCreated'));
    this.goals$ = this.goalsCollectionRef.valueChanges();
    console.log("Goals were retrieved");
    console.log(this.goals$);
    return this.goals$;





  }
 
  getTasks(goalID:string) {
    console.log(goalID);

    var db = firebase.firestore();
    var self=this;
    db.collection("Tasks").get().then(function(querySnapshot) {
    var tasks=[];
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tasks.push({goalID:doc.id,description:doc.get("description"),priority:doc.get("priority"),checked:doc.get("checked")});
    })
    return tasks;
  });
    

    // this.tasksCollectionRef = this.afs.collection('Tasks', ref => ref.orderBy('priority'));
    // this.tasks$ = this.tasksCollectionRef.valueChanges();
    // console.log("Tasks were retrieved");
    // return this.tasks$;

//     var scoresRef = firebase.database().ref("Tasks");
// scoresRef.orderByChild("goalID").equalTo(goalID).on("value", function(snapshot) {
//   snapshot.forEach(function(data) {
//     console.log("The " + data.key + " score is " + data.val());
//   });
// });


  }

  addGoalToDatabase(goalDesc: string) {
    var db = firebase.firestore();
    db.collection("Goals").add({
      description: goalDesc,
      dateCreated: new Date()
    })
      .then( (docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch( (error) => {
        console.error("Error adding document: ", error);
      });

      console.log("You created a new goal");

  }


//TODO add priority as int and goal id
  addTaskToDatabase(taskDesc: string,priority:number,goalID:string /*int taskPriority, Goal ID?? */) {
    console.log(goalID);

    var db = firebase.firestore();

    
    db.collection("Tasks").add({
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

      console.log("You created a new task");

  }

  
}
