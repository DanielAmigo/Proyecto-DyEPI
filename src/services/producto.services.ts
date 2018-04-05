import { Producto } from "../models/producto.model";
export class ProductoService{

    getProducts(){
        return this.products;
    }


    private products: Producto []=[
        {"key":"Clave1",
         "referencia": "afuinfiormo",
         "tipo": "Camiseta",
         "genero": "Hombre",
         "caracteristicas": ["Manga larga"],
         "colores": ["Rojo", "Rayas"],
         "otrosProductos": ["asuiwnefowe"],
         "talla": ["XS", "S", "M", "L", "XL"],
         "descripcion": "Descripcion",
         "materiales": ["Algodón", "Poliéster"],
         "precio": 19.99,
         "descuento": 14.99,
         "seleccion": [],
         "fotos": []
        },
        {"key":"Clave2",
        "referencia": "asuiwnefowe",
        "tipo": "Camiseta",
        "genero": "Hombre",
        "caracteristicas": ["Manga larga"],
        "colores": ["Azul", "Rayas"],
        "otrosProductos": ["afuinfiormo"],
        "talla": ["XS", "S", "L", "XL"],
        "descripcion": "Descripcion",
        "materiales": ["Algodón", "Poliéster"],
        "precio": 19.99,
        "descuento": 14.99,
        "seleccion": [],
        "fotos": []
       },
       {"key":"Clave3",
        "referencia": "asuiwnefowe",
        "tipo": "Pantalón",
        "genero": "Mujer",
        "caracteristicas": ["Denim"],
        "colores": ["Azul oscuro"],
        "otrosProductos": [],
        "talla": ["XS", "S", "M", "L", "XL"],
        "descripcion": "Descripcion",
        "materiales": ["Vaqueroxd", "Poliéster"],
        "precio": 25.99,
        "descuento": 19.99,
        "seleccion": [],
        "fotos": []
       }
    ];
}