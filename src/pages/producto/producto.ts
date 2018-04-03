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

  contenido: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('contenido'));
    if(navParams.get('contenido')!=undefined) this.contenido = navParams.get('contenido');    // Recibe el valor de QR
    else this.contenido = "No vengo de QR";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

}