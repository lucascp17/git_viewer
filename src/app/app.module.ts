import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { UserProvider } from '../providers/user/user';
import { GitHubProvider } from '../providers/git-hub/git-hub';
import { IntroductionPage } from '../pages/introduction/introduction';
import { LoginPage } from '../pages/login/login';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { MainProvider } from '../providers/main/main';
import { RepositoriesPage } from '../pages/repositories/repositories';
import { PullRequestsPage } from '../pages/pull-requests/pull-requests';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroductionPage,
    LoginPage,
    RepositoriesPage,
    PullRequestsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroductionPage,
    LoginPage,
    RepositoriesPage,
    PullRequestsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    GitHubProvider,
    MainProvider
  ]
})
export class AppModule {}
