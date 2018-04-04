import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GitHubProvider } from '../../providers/git-hub/git-hub';
import { PullRequestsPage } from '../pull-requests/pull-requests';

/**
 * Generated class for the RepositoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-repositories',
  templateUrl: 'repositories.html',
})
export class RepositoriesPage {

  private repositories: Array<{}>;
  private next: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gitHubCtrl: GitHubProvider) {
    this.repositories = [];
    this.next = null;
  }

  ionViewDidLoad() {
    this.gitHubCtrl.listRepositories(this.next).then((data: any) => {
      this.next = data.next;
      for (var i = 0; i < data.items.length; ++i)
        this.repositories.push(data.items[i]);
    });
  }

  doScroll(scrollEvent) {
    this.gitHubCtrl.listRepositories(this.next).then((data: any) => {
      this.next = data.next;
      for (var i = 0; i < data.items.length; ++i)
        this.repositories.push(data.items[i]);
      setTimeout(() => {
        scrollEvent.complete();
      }, 2000);
    });
  }

  showRepoInfo(repo: any) {
    this.navCtrl.push(PullRequestsPage, {repo: repo});
  }

}
