import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabsController } from 'ionic2-super-tabs';

/**
 * Generated class for the CarritoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(public navCtrl: NavController, public navParams: NavParams, private superTabsCtrl: SuperTabsController) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }

  goToDetails() {
    this.rootNavCtrl.push('ProductoPage');  // Vamos a la nueva vista.
  }

  setBadge() {
    this.superTabsCtrl.setBadge('MapaTab', 6);
  }

  clearBadge() {
    this.superTabsCtrl.clearBadge('MapaTab');
  }

  jumpToAccount() {
    this.superTabsCtrl.slideTo(3);
  }

  hideToolbar() {
    this.superTabsCtrl.showToolbar(false);
  }

  showToolbar() {
    this.superTabsCtrl.showToolbar(true);
  }

}
