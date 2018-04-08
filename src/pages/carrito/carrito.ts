import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
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
  carrito: any[] = [];
  totalCost: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private superTabsCtrl: SuperTabsController,
    public productoService: ProductoService,
    public alertCtrl: AlertController,
  ) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
    this.carrito = this.productoService.getCart();
  }

  openProducto(object){
    console.log(object);
    this.rootNavCtrl.push('ProductoPage', {producto: object});  // No se puede rootNavCtrl, sino no va.
  }

  payCart(){
    console.log("PAYCARTTTT");
  }

  deleteProductoCarrito(producto, index){
    let alert = this.alertCtrl.create({
      title: '¿Seguro que quieres borrar este producto?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.carrito = this.productoService.deleteProductCart(index);
            this.totalCost = this.productoService.getTotalCost();
            if(this.carrito.length > 0) this.superTabsCtrl.setBadge('CarritoTab', this.carrito.length);       // Actualizamos el numerito del carrito.
            else this.superTabsCtrl.clearBadge("CarritoTab");
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

  // Cuando hace POP y vuelve a esta vista, revisamos el carrito, si hay algo, a esa vista.
  public ionViewWillEnter() {
    this.carrito = this.productoService.getCart();
    this.totalCost = this.productoService.getTotalCost();
  }


}