import { Injectable } from '@angular/core';

/*
  Generated class for the MainProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MainProvider {

  public static readonly GIT_HUB_URI: string = "https://api.github.com";
  public static readonly GIT_HUB_CLIENT_ID: string = "9379189be7cc5a22146f";
  public static readonly GIT_HUB_CLIENT_SECRET: string = "e9e64f3b6f78331bc6a4b58a8fb92f2da1b517b2";
  public static readonly GIT_HUB_AUTH = "Basic bHVjYXNjcDE3OmF1azljdG4y";

  constructor() {
    console.log('Hello MainProvider Provider');
  }

  handleHttpError(error) {

  }

}
