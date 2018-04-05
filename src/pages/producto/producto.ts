import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('producto'));
    if(navParams.get('producto')!=undefined) this.producto = navParams.get('producto');    // Recibe el valor de QR
    else this.producto = "No vengo de QR";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

}