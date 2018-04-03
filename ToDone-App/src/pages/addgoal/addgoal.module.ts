import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddGoalPage } from './addgoal';

@NgModule({
  declarations: [
    AddGoalPage,
  ],
  imports: [
    IonicPageModule.forChild(AddGoalPage),
  ],
})
export class AddGoalPageModule {}
