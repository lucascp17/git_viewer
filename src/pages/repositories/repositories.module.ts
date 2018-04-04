import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RepositoriesPage } from './repositories';

@NgModule({
  declarations: [
    RepositoriesPage,
  ],
  imports: [
    IonicPageModule.forChild(RepositoriesPage),
  ],
})
export class RepositoriesPageModule {}
