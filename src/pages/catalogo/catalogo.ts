import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { SuperTabsController } from 'ionic2-super-tabs';

/**
 * Generated class for the CatalogoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
})


export class CatalogoPage {

  productos: any[] = [];
  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService
  ) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CatalogoPage');
    this.productos = this.productoService.getProducts();
  }

  openProducto(object){
    console.log(object);
    this.rootNavCtrl.push('ProductoPage', {producto: object});  // No se puede rootNavCtrl, sino no va.
  }
  
}
