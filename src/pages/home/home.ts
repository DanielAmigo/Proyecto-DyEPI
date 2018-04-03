import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SuperTabsController } from 'ionic2-super-tabs';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pages = [
    { pageName: 'HelpPage', title: 'Ayuda', icon: 'help', id: 'HelpTab' },
    { pageName: 'MapaPage', title: 'Mapa', icon: 'locate', id: 'MapaTab' },
    { pageName: 'CatalogoPage', title: 'Catalogo', icon: 'shirt', id: 'CatalogoTab' },
    { pageName: 'CarritoPage', title: 'Carrito', icon: 'cart', id: 'CarritoTab' }
  ];

  selectedTab = 1;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  qrData = null;
  scannedCode = null;
  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCrtl: AlertController, private barcodeScanner: BarcodeScanner) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }

  readCode(){           // Boton flotante FAB para leer un QR y a la vuelta abrir el enlace correspondiente
    this.barcodeScanner.scan().then((barcodeData) => {
      if(!barcodeData.cancelled)
        this.navCtrl.push('ProductoPage', {contenido: barcodeData});  // No se puede rootNavCtrl, sino no va.
      else alert("NO ES QR!!");
      });

  }

  onTabSelected(ev: any) {

    this.selectedTab = ev.index;
    this.superTabs.clearBadge(this.pages[ev.index].id);
    /*
    if(ev.index === 2){ // Si entramos en la página 2, salta un aviso de si queremos entrar o no.
      let alert = this.alertCrtl.create({
        title: 'Secret Page',
        message: 'Are you sure oseque',
        buttons: [
          {
            text: 'NO',
            handler: () => {
              this.superTabs.slideTo(this.selectedTab);
            }
            }, {
            text: 'Yes',
            handler: () => {
              this.selectedTab = ev.index;
            }
          }
        ]
      });
      alert.present();

    } else{
      
    }
  }
  */

  }
}