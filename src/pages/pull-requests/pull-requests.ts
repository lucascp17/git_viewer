import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { GitHubProvider } from '../../providers/git-hub/git-hub';

/**
 * Generated class for the PullRequestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pull-requests',
  templateUrl: 'pull-requests.html',
})
export class PullRequestsPage {

  private repo: any;
  private pulls: Array<{}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public gitHubCtrl: GitHubProvider) {
    this.repo = this.navParams.get('repo');
    this.pulls = [];
  }

  ionViewDidLoad() {
    let uri = PullRequestsPage.filterUrl(this.repo.pulls_url);
    this.gitHubCtrl.listPullRequests(uri).then((data: any) => {
      for (var i = 0; i < data.length; ++i)
        this.pulls.push(data[i]);
    })
  }

  openPullRequestPage(pull: any) {
    window.open(pull.html_url, '_blank');
  }

  private static filterUrl(source: string): string {
    let k = source.indexOf("{");
    if (k < 0)
      return source;
    return source.substring(0, k);
  }

}
