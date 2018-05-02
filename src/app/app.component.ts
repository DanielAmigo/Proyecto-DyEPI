import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { HomePage } from '../pages/home/home';
import { ClientService } from '../services/client.services';
import { SuperTabs } from 'ionic2-super-tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  //@ViewChild(SuperTabs) superTabs: SuperTabs;

  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private clientService: ClientService,
    private barcodeScanner: BarcodeScanner,

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
  login() {
    console.log("Click en Login");
    this.nav.push('LoginPage');
  }

  logout() {
    this.clientService.signOut();
  }

  readCode() {           // Boton flotante FAB para leer un QR y a la vuelta abrir el enlace correspondiente
    console.log("readCode");
    this.barcodeScanner.scan().then((barcodeData) => {
      if (barcodeData.cancelled) {
        alert("No has escaneado un QR de Primark. Saliendo...");
      }
      else {
        console.log("readCode yendo a ProductoPage con: " + barcodeData.text);
        this.nav.push('ProductoPage', { producto: barcodeData.text });  // No se puede rootNavCtrl, sino no va.
      }
    });
  }
  /*
    changeTab(tab: number){       // Para cambiar de tab desde el menu
      this.superTabs.slideTo(tab); 
    }
  */

  goToAbout() {           // Para cambiar a una vista desde el menu
    console.log("Click en AboutPage");
    this.nav.push("AboutPage");  // No se puede rootNavCtrl, sino no va.
  }
  goToFAQ() {       // Para cambiar a una vista desde el menu
    console.log("Click en FaqPage");
    this.nav.push("FaqPage");  // No se puede rootNavCtrl, sino no va.
  }
}
