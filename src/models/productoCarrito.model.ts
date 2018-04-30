export interface ProductoCarrito {
    key: string;              // Algo de firebase
    cantidad: number;
    color: string;         // Puede tener varios colores la prenda (quiza tambien añadie los patrones para que te salgan al filtrar)
    foto: string;               // URL a las imagenes en Firebase
    name: string;
    precio: number;            // En euros
    precioDescuento: number;
    referencia: string;        // Referencia de la tienda del producto (concreto, ese color, esa forma, etc.)
    talla: string[];           // Las tallas que ofrece el producto
}