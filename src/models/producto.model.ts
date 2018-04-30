export interface Producto {
    key: string;              // Algo de firebase
    colores: string[];         // Puede tener varios colores la prenda (quiza tambien añadie los patrones para que te salgan al filtrar)
    descripcion: string;
    genero: string;            // Hombre, Mujer, Niño, Niña
    foto: string;               // URL a las imagenes en Firebase
    name: string;
    otrosProductos: string[];  // Array que almacena las referencias de otras variantes de ese modelo (otro color...)
    precio: number;            // En euros
    precioDescuento: number;         // El precio con descuento
    referencia: string;        // Referencia de la tienda del producto (concreto, ese color, esa forma, etc.)
    subtipo: string;    // Es un array donde meter las subcategorias (manga larga, formal, informal, y más subcategorias que se hagan dentro)
    tallas: string[];           // Las tallas que ofrece el producto
    tipo: string;              // Camiseta, etc.
}