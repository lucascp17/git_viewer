import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PullRequestsPage } from './pull-requests';

@NgModule({
  declarations: [
    PullRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(PullRequestsPage),
  ],
})
export class PullRequestsPageModule {}
