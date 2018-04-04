import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { GitHubProvider } from '../../providers/git-hub/git-hub';
import { UserProvider } from '../../providers/user/user';
import { MainProvider } from '../../providers/main/main';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private user = {username: "", password: ""};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              public gitHubCtrl: GitHubProvider, 
              public userCtrl: UserProvider,
              public mainCtrl: MainProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  auth() {
    var req = this.gitHubCtrl.authenticate(this.user.username, this.user.password);
    req.then((success) => {
      if (success)
        this.proceed();
      else
        this.showLoginFailedMessage();
    }, (error) => {
      this.mainCtrl.handleHttpError(error);
    });
  }

  private showLoginFailedMessage() {
    let alert = this.alertCtrl.create({
      title: 'Ops! Senha errada',
      subTitle: 'Ou o seu nome de usuário não existe. Tente de novo',
      buttons: ['OK']
    });
    alert.present();
  }

  private proceed() {
    this.userCtrl.setUser(this.user.username, this.user.password);
    console.log("ok");
  }

}
