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

  description: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public view: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddGoalPage');
  }

  submitNewGoal() {
    if(this.description.length > 0) {
      this.dataService.addGoalToDatabase(this.description);
      this.view.dismiss();
    }
    else {
      console.log("You haven't typed anything")
    }

  }

  closeAddGoal() {
    this.view.dismiss();
  }

}
