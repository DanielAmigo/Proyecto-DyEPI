import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Producto } from '../../models/producto.model';
import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import * as firebase from 'firebase/app';             // Para obtener nuestro ID en Firebase

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

// @Injectable()
export class CatalogoPage {

  productList: Producto[];
  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService
  ) {
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }

   // Consigue que los tasks tengan la key de Firebase!!!!!!
   public ionViewWillEnter() {   // En vez de ngInit porque esto es cada vez que se pone visible!!
    console.log("ionViewWillEnter task.ts");

    //Get the current userID
    console.log(firebase.auth().currentUser.uid);       // AL ENTRAR AQUI SE IMPRIME EL ID ACTUAL DE FIREBASE, QUEREMOS QUE COINCIDA CON EL DE DATABASE


    return this.productoService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          this.productList.push(x as Producto);
        });
      });
  }

  openProducto(object){
    console.log(object);
    this.rootNavCtrl.push('ProductoPage', {producto: object});  // No se puede rootNavCtrl, sino no va.
  }
  
}
