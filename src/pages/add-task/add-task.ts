import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';

/**
 * Generated class for the AddtaskPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-task',
  templateUrl: 'add-task.html',
})
export class AddTaskPage {

  description: string = "";
  priority:number =0;
  //priority
  goalID:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: Data, public view: ViewController) {
  	this.goalID = navParams.get("goalID");
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddTaskPage');
  }

  submitNewTask() {
    if(this.description.length > 0) {
    	console.log(this.goalID);
      this.dataService.addTaskToDatabase(this.description,this.priority,this.goalID);
     

      this.view.dismiss();
    }
    else {
      console.log("You haven't typed anything")
    }

  }

  closeAddTask() {
    this.view.dismiss();
  }

}

