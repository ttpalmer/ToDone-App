
import { Injectable } from '@angular/core';


<<<<<<< HEAD
=======


>>>>>>> 4bf4d3f46c2d2cea45935935592fd91686a936ed
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

}
