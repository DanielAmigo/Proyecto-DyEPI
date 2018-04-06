import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { Producto } from "../../models/producto.model";
import { SuperTabsController } from 'ionic2-super-tabs';

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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    private superTabsCtrl: SuperTabsController,
    private alertCtrl: AlertController
  ) {
    console.log("Constructor de: product.ts");


    if(navParams.get('producto')!=undefined) this.producto = navParams.get('producto');    // Recibe el valor de QR
    else this.producto = "No vengo de QR";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

  addProductToCart(producto){                               // Añadimos al carrito de ProductoService este producto, con los parametros seleccionados.
    console.log("addProductToCart! "+producto);

    producto.seleccion = ["HOLA"];  // Añadir la seleccion de este producto (talla, etc.)

    console.log(producto);

    const items = this.productoService.pushCart(producto);  // Actualizamos el carrito correspondiente.
    this.superTabsCtrl.setBadge('CarritoTab', items);       // Actualizamos el numerito del carrito.

    let alert = this.alertCtrl.create({
      title: 'Producto añadido al carrito',
      message: '¿Quieres ir al carrito?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.navCtrl.push('HomePage', {tabSeleccionada: "CarritoTab"});  // No se puede rootNavCtrl, sino no va.
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No selected!');
          }
        }
      ]
  });

  alert.present();
}
}