import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { MainProvider } from '../main/main';
import 'rxjs/add/operator/map';

/*
  Generated class for the GitHubProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GitHubProvider {

  private static readonly GIT_HUB_URI: string = MainProvider.GIT_HUB_URI;
  private static readonly GIT_HUB_CLIENT_ID: string = MainProvider.GIT_HUB_CLIENT_ID;
  private static readonly GIT_HUB_CLIENT_SECRET: string = MainProvider.GIT_HUB_CLIENT_SECRET;

  constructor(public http: Http) {
  }

  authenticate(username: string, password: string) {
    let str = username + ":" + password;
    let encoded = btoa(str);
    let auth = "Basic " + encoded;
    let headers = new Headers();
    headers.append("Authorization", auth);
    let options = new RequestOptions({headers: headers});
    return new Promise((resolve, reject) => {
      let req = this.http.get(GitHubProvider.GIT_HUB_URI + "/user", options)
      req.subscribe(
        (res) => resolve(true),
        error => {
          if (error.status === 401)
            resolve(false);
          else
            reject(error);
        }
      );
    });
  }

  listRepositories(next?: string) {
    const uri = next === null ? GitHubProvider.GIT_HUB_URI + "/search/repositories?q=is:public&sort=stars" : next;
    return new Promise((resolve, reject) => {
      this.http.get(uri, this.options())
          .map((res) => {
            let next = this.parseNext(res); 
            let jsn = res.json();
            jsn.next = next;
            return jsn;
          })
          .subscribe(
            (res) => resolve(res),
            error => reject(error)
          );
    });
  }

  listPullRequests(url?: string) {
    return new Promise((resolve, reject) => {
      this.http.get(url, this.options())
          .map((res) => res.json())
          .subscribe(
            (jsn) => resolve(jsn),
            error => reject(error)
          );
    });
  }

  private parseNext(data: any): string {
    let link = data.headers.get('link');
    let tokens = link.split(",");
    for (let i = 0; i < tokens.length; ++i) {
      let subtokens = tokens[i].split(";");
      let url = subtokens[0];
      let rel = subtokens[1];
      let start0 = rel.indexOf("\"");
      let end0 = rel.lastIndexOf("\"");
      let word = rel.substring(start0 + 1, end0);
      if (word === "next") {
        let start1 = url.indexOf("<");
        let end1 = url.lastIndexOf(">");
        let cleanUrl = url.substring(start1 + 1, end1);
        return cleanUrl;
      }
    }
    return null;
  }

  private options(): RequestOptions {
    let headers = new Headers();
    headers.append("Authorization", MainProvider.GIT_HUB_AUTH);
    return new RequestOptions({headers: headers});
  }

  /*
  private token(): string {
    if (this.auth === null) {
      let body = {
        scopes: ["public_repo"],
        note: "git_viewer",
        client_id: GitHubProvider.GIT_HUB_CLIENT_ID,
        client_secret: GitHubProvider.GIT_HUB_CLIENT_SECRET
      };
      this.http.post(GitHubProvider.GIT_HUB_URI + "/authorizations", body);
    }
    return null;
  }
  */

}
