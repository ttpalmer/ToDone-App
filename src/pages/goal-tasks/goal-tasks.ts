import { LaunchPage } from './../launch/launch';
import { AuthServiceProvider } from './../../providers/auth-service/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { Data } from './../../providers/data/data';
import { Tasks } from './../../providers/data/data';
import { AddGoalPage } from "../addgoal/addgoal";
import { HomePage } from "../home/home";
import { AddTaskPage } from '../add-task/add-task';
import firebase from 'firebase';


@Component({
  selector: 'page-goal-tasks',
  templateUrl: 'goal-tasks.html'
})

export class GoalTasksPage {
  tasks: any;
  goalID:string;
  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, public dataService: Data, public view: ViewController) {
    this.goalID = navParams.get("goalID");
    this.dataService.getTasks(this.goalID).subscribe(tasks$ => {
      this.tasks = tasks$;
    });
  }

  ionViewDidLoad(){
   
  }
  
  ionViewDidEnter(){
    this.dataService.getTasks(this.goalID).subscribe(tasks$ => {
      this.tasks = tasks$;
    });    
  }


  addYourTask(){
    this.navCtrl.push(AddTaskPage,{goalID:this.goalID});
  }

  toggleItem(item): void {
    this.tasks.toggleItem(item);
  }

}
