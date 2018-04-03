import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pages = [
    { pageName: 'QrPage', title: 'QR', icon: 'qr-scanner', id: 'QRTab' },
    { pageName: 'MapaPage', title: 'Mapa', icon: 'locate', id: 'MapaTab' },
    { pageName: 'CatalogoPage', title: 'Catalogo', icon: 'shirt', id: 'CatalogoTab' },
    { pageName: 'CarritoPage', title: 'Carrito', icon: 'cart', id: 'CarritoTab' }
  ];a

  selectedTab = 1;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCrtl: AlertController) {
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