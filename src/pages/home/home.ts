import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntroductionPage } from '../introduction/introduction';
import { LoginPage } from '../login/login';
import { RepositoriesPage } from '../repositories/repositories';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  goToIntroduction() {
    this.navCtrl.push(IntroductionPage);
  }

}
