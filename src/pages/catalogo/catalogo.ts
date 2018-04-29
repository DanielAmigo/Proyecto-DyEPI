import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Producto } from '../../models/producto.model';
import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { ClientService } from '../../services/client.services';

@IonicPage()
@Component({
  selector: 'page-catalogo',
  templateUrl: 'catalogo.html',
  //providers: [ProductoService]     // Defino los servicios a usar
})


export class CatalogoPage {

  productList: Producto[];
  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    public clientService: ClientService,
  ) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }


  public ionViewWillEnter() {   // En vez de ngInit porque esto es cada vez que se pone visible!!
    console.log("ionViewWillEnter catalogo.ts");

    // Obtenemos la información del cliente y lo almacenamos
    this.clientService.getMyself();   // ESTA PARA PROBAR, NO HACE FALTA AQUI

    // Obtenemos los productos de su servicio y los almacenamos
    this.productoService.getProducts()
    .snapshotChanges().subscribe(item => {
      this.productList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["key"] = element.key;
        this.productList.push(x as Producto);
      });
    });
  }


  openProducto(object){   // Al hacer click en un producto, te lleva a dicha vista.
    console.log(object);
    this.rootNavCtrl.push('ProductoPage', {producto: object});  // No se puede rootNavCtrl, sino no va.
  }
  
}
