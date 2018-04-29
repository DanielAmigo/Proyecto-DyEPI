import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import { Producto } from "../models/producto.model";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ProductoService {

    totalCost: number;
   // private cart: Producto [] = [];

    private dbPath = '/Products/';
 
    productsRef: AngularFireList<Producto>;

    constructor(private db : AngularFireDatabase){
        console.log("AAA");
        this.productsRef = db.list(this.dbPath);
    }
  
    getProducts(){      // Método para obtener la snapshot de productos, luego hay que sacarlos manualmente. EJ: Catalogo
        return this.productsRef = this.db.list(this.dbPath);
    }

/*
    getTotalCost() {
        this.totalCost = 0;
        for (let index = 0; index < this.cart.length; index++) {
            this.totalCost += Number(this.cart[index].seleccion[1]);
        }
        console.log("Precio modificado: "+this.totalCost);
        return this.totalCost;
    }
*/  

/*
    getCart(){
        return this.cart;
    }

    pushCart(producto){
        return this.cart.push(producto);
    }

    deleteProductCart(index){
        this.cart.splice(index, 1);
        return this.cart;
    }
*/
}