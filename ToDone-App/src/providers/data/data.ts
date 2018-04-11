
import { Injectable } from '@angular/core';
import firebase from 'firebase';

declare var require: any

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Data {
 

  constructor() {

    console.log('Hello Data Provider');
    const firebase = require("firebase");
    //required for side-effects
    require("firebase/firestore");

    firebase.initializeApp({
      apiKey: "AIzaSyAENTge-cuAbAXzrrH_ScMnc6j-iJZGgiQ",
      authDomain: "todone-usc546.firebaseapp.com",
      projectId: "todone-usc546"
    });

  // Initialize Cloud Firestore through Firebase
    var db = firebase.firestore();
    console.log("Firestore connected");

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
    var db = firebase.firestore();
    var myGoals: any [];
    return db.collection("Goals").get().then(function(querySnapshot) {
      console.log("This collection size is " + querySnapshot.size);
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        var queriedGoal = {
          goalID : doc.id,
          goalDescription: doc.data()
        }
        console.log("We got our goal " + queriedGoal.goalDescription);
      });
       //for(var i = querySnapshot.size - 1; i >= 0; i--) {
         // console.log("loop runs");
        //}
    });
  }
}
