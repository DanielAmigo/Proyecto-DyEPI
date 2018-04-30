import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { SuperTabsController } from 'ionic2-super-tabs';
import { ClientService } from '../../services/client.services';
import { ProductoCarrito } from '../../models/productoCarrito.model';


@IonicPage()
@Component({
  selector: 'page-carrito',
  templateUrl: 'carrito.html',
})
export class CarritoPage {

  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.
  carrito: Array<ProductoCarrito>;
  totalCost: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private superTabsCtrl: SuperTabsController,
    public productoService: ProductoService,
    public alertCtrl: AlertController,
    public clientService: ClientService,
  ) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }

  // Cuando hace POP y vuelve a esta vista, revisamos el carrito, si hay algo, a esa vista.
  public ionViewWillEnter() {

    // Obtenemos los productos de su carrito y los almacenamos
    this.clientService.getMyCarrito()
    .snapshotChanges().subscribe(item => {
      // Inicializamos las variables
      this.carrito = [];
      item.forEach(element => {        
        let x = element.payload.toJSON();
        x["key"] = element.key;
        console.log(x as ProductoCarrito);
        this.carrito.push(x as ProductoCarrito);

        // Recalculamos el precio total
        this.totalCost = 0;
        this.carrito.forEach(element => {
          if(element.precioDescuento != null) this.totalCost += (element.precioDescuento*element.cantidad);
          else this.totalCost += (element.precio*element.cantidad);
        });
        console.log("TOTAL: "+this.totalCost)
      });
    });
  }

  openProducto(object: ProductoCarrito){
    console.log("Pasamos a ProductoPage: "+object.referencia);
    this.rootNavCtrl.push('ProductoPage', {producto: object.referencia});  // No se puede rootNavCtrl, sino no va.
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
            this.clientService.deleteMyCarritoItem(producto);
            this.ionViewWillEnter();
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