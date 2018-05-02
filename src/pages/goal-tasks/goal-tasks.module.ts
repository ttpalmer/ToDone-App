import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GoalTasksPage } from './goal-tasks';



@NgModule({
  declarations: [
    GoalTasksPage,
  ],
  imports: [
    IonicPageModule.forChild(GoalTasksPage),

  ],
})
export class GoalTasksPageModule {}
