import { Producto } from "../models/producto.model";
import { SuperTabsController } from 'ionic2-super-tabs';


export class ProductoService {

    private superTabsCtrl: SuperTabsController;
    totalCost: number;
    private cart: Producto [] = [];

    getTotalCost() {
        this.totalCost = 0;
        for (let index = 0; index < this.cart.length; index++) {
            this.totalCost += Number(this.cart[index].seleccion[1]);
        }
        console.log("Precio modificado: "+this.totalCost);
        return this.totalCost;
    }
    

    getProducts(){
        return this.products;
    }

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


    private products: Producto []=[
        {"key":"Clave1",
         "referencia": "N35397148858552",
         "tipo": "Camisa",
         "genero": "Hombre",
         "caracteristicas": ["Manga larga"],
         "colores": ["Azul", "Negro", "Blanco", "Rayas"],
         "otrosProductos": ["N35397145979595"],
         "talla": ["XS", "S", "M", "L", "XL"],
         "descripcion": "Checked Shirt",
         "materiales": ["Algodón", "Poliéster"],
         "precio": 9.00,
         "descuento": 8.99,
         "seleccion": [],
         "fotos": ["https://images.primark.com/productsimages/N35397148858552-large.jpg", "http://img1.codigonuevo.com/65/6f/05/primark-chanclas-930x600.jpg"]
        },
        {"key":"Clave2",
        "referencia": "N35397145979595",
        "tipo": "Camisa",
        "genero": "Hombre",
        "caracteristicas": ["Manga larga"],
        "colores": ["Azul", "Negro", "Rayas"],
        "otrosProductos": ["N35397148858552"],
        "talla": ["XS", "S", "L", "XL"],
        "descripcion": "Check Flannel Shirt",
        "materiales": ["Algodón", "Poliéster"],
        "precio": 9.00,
         "descuento": 8.99,
        "seleccion": [],
        "fotos": ["https://images.primark.com/productsimages/N35397145979595-large.jpg", "http://img1.codigonuevo.com/65/6f/05/primark-chanclas-930x600.jpg"]
       },
       {"key":"Clave3",
        "referencia": "N35397175927726",
        "tipo": "Pantalón",
        "genero": "Mujer",
        "caracteristicas": ["Vaqueros"],
        "colores": ["Azul oscuro"],
        "otrosProductos": [],
        "talla": ["XS", "S", "M", "L", "XL"],
        "descripcion": "Pearl Embellished Jean",
        "materiales": ["Vaquero", "Poliéster"],
        "precio": 21.00,
        "descuento": 19.99,
        "seleccion": [],
        "fotos": ["https://images.primark.com/productsimages/N35397175927726-large.jpg", "http://img1.codigonuevo.com/65/6f/05/primark-chanclas-930x600.jpg"]
       }
    ];
}