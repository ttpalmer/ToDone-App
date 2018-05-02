import { Goals } from './../../models/goal';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';


/**
 * Generated class for the AddgoalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addgoal',
  templateUrl: 'addgoal.html',
})
export class AddGoalPage {

  description: string = "";

  goal: Goals = { 
    description: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGoalPage');
  }



  submitNewGoal() {
    if(this.goal.description != '') {
      this.dataService.addGoal(this.goal);
      this.goal.description ='';
      //this.view.dismiss();
      this.navCtrl.pop();
    }
    else {
      console.log("You haven't typed anything")
    }

  }

  closeAddGoal() {
    this.view.dismiss();
  }

}
