import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AddGoalPage } from "../addgoal/addgoal";

import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  goals: any[]; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl) {

  }
  
  addYourGoal() {
    let addGoal = this.modalCtrl.create(AddGoalPage);
    addGoal.onDidDismiss((goal) => {


    });

  }

  doLogout() : Promise<void>
  {
    return firebase.auth().signOut();
  }
}
