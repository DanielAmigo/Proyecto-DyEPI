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
  imageSelected: string;
  talla: string;
  
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

    if(this.producto.seleccion.length > 0){       // Vengo de carrito, porque tengo una talla. Habria que poner ese valor en el selector
      this.talla = this.producto.seleccion[0];
    }

    //Añadimos la primera imagen por defecto
    this.imageSelected = this.producto.fotos[0];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }


  cambiarImagen(foto, index){
    console.log("PULSADA LA FOTO: "+foto+" "+index);

    this.imageSelected = this.producto.fotos[index];

  }

  
  addProductToCart(producto){                               // Añadimos al carrito de ProductoService este producto, con los parametros seleccionados.
    console.log("addProductToCart! "+producto+" con talla: "+this.talla);

    // Añadimos la selección
    producto.seleccion = [this.talla];  // Añadir la seleccion de este producto (talla, etc.)
    if(producto.descuento != 0){
      producto.seleccion.push(producto.descuento);
    }
    else{
      producto.seleccion.push(producto.precio);
    }

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
            this.navCtrl.pop();  // Volvemos atrás.
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