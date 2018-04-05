import { Producto } from "../models/producto.model";
export class ProductoService{

    getProducts(){
        return this.products;
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
         "fotos": ["https://images.primark.com/productsimages/N35397148858552-large.jpg"]
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
        "fotos": ["https://images.primark.com/productsimages/N35397145979595-large.jpg"]
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
        "fotos": ["https://images.primark.com/productsimages/N35397175927726-large.jpg"]
       }
    ];
}