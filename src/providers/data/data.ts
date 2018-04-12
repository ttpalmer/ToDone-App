
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

@Injectable()
export class Data {

   goalsCollectionRef: AngularFirestoreCollection<Goals>;
   goals$: Observable<Goals[]>;
 

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

    return this.goals$;
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
}
