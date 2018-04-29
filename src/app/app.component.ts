import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ClientService } from '../services/client.services';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private clientService: ClientService
  ) {
    // PARA AÑADIR PANTALLA DE INICIO O LOGIN SI NO ESTÁ LOGUEADO. Para los empleados
    /*
    if (clientService.authenticated {
      this.rootPage = "LoginPage";
    } else {
      this.rootPage = HomePage;
    } */

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  /********* Botones del menú lateral ********/
  login(){
    console.log("Click en Login");
    this.nav.push('LoginPage');
  }

  logout(){
    this.clientService.signOut();
  }

}

