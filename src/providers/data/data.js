var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase';
let Data = class Data {
    constructor(afs) {
        this.afs = afs;
        console.log('Hello Data Provider');
    }
    userInfo(firstName, lastName) {
        var db = firebase.firestore();
        db.collection("users").add({
            first: firstName,
            last: lastName,
        })
            .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch((error) => {
            console.error("Error adding document: ", error);
        });
        var docRef = db.collection("users").doc("first");
        return docRef.get().then(function (doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
            }
            else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }
    getGoals() {
        this.goalsCollectionRef = this.afs.collection('Goals', ref => ref.orderBy('dateCreated'));
        this.goals$ = this.goalsCollectionRef.valueChanges();
        console.log("Goals were retrieved");
        return this.goals$;
    }
    getTasks(goalID) {
        // this.tasksCollectionRef = this.afs.collection('Tasks', ref => ref.orderBy('priority'));
        // this.tasks$ = this.tasksCollectionRef.valueChanges();
        // console.log("Tasks were retrieved");
        // return this.tasks$;
        console.log(goalID);
        //     var scoresRef = firebase.database().ref("Tasks");
        // scoresRef.orderByChild("goalID").equalTo(goalID).on("value", function(snapshot) {
        //   snapshot.forEach(function(data) {
        //     console.log("The " + data.key + " score is " + data.val());
        //   });
        // });
    }
    addGoalToDatabase(goalDesc) {
        var db = firebase.firestore();
        db.collection("Goals").add({
            description: goalDesc,
            dateCreated: new Date()
        })
            .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch((error) => {
            console.error("Error adding document: ", error);
        });
        console.log("You created a new goal");
    }
    //TODO add priority as int and goal id
    addTaskToDatabase(taskDesc, priority, goalID /*int taskPriority, Goal ID?? */) {
        console.log(goalID);
        var db = firebase.firestore();
        db.collection("Tasks").add({
            description: taskDesc,
            priority: priority,
            goalID: goalID
        })
            .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch((error) => {
            console.error("Error adding document: ", error);
        });
        console.log("You created a new task");
    }
};
Data = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [AngularFirestore])
], Data);
export { Data };
//# sourceMappingURL=data.js.map