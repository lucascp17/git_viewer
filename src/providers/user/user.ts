import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  private user: {};

  constructor(public storage: Storage) {
    storage.get('user').then((val) => {
      if (val)
        this.user = val;
      else
        this.user = null;
    }, error => {
      this.user = null;
    });
  }

  getUser() {
    return this.user;
  }

  setUser(username: string, password: string) {
    let user = {username: username, password: password};
    this.storage.set('user', user).then(() => {
      this.user = user;
    });
  }

}
