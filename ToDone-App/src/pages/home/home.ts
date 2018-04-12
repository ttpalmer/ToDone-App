
import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable'
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { AddGoalPage } from "../addgoal/addgoal";
import { GoalTasksPage } from "../goal-tasks/goal-tasks";
import firebase from 'firebase';

export interface Goals {
  description: string;
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  goalsCollectionRef: AngularFirestoreCollection<Goals>;
  goals$: Observable<Goals[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private afs: AngularFirestore) {
    this.goalsCollectionRef = this.afs.collection<Goals>('Goals');
    this.goals$ = this.goalsCollectionRef.valueChanges();
  }

  ionViewDidLoad(){
   console.log('Signed in with email' + " "+ this.auth.getEmail());
   
  }
  
  addYourGoal() {
   this.navCtrl.push(AddGoalPage);

  }

  viewGoal(goal) {
    this.navCtrl.push(GoalTasksPage, {
      goal: goal
    });
  }

  Logout() :void
  {
    this.auth.signOut();
    this.navCtrl.setRoot(LaunchPage);
  }
}
