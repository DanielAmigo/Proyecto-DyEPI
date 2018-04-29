export interface Producto {
    key: string;              // Algo de firebase
    referencia: string;        // Referencia de la tienda del producto (concreto, ese color, esa forma, etc.)
    tipo: string;              // Camiseta, etc.
    genero: string;            // Hombre, Mujer, Niño, Niña
    caracteristicas: string; // Es un array donde meter las subcategorias (manga larga, formal, informal, y más subcategorias que se hagan dentro)
    colores: string[];         // Puede tener varios colores la prenda (quiza tambien añadie los patrones para que te salgan al filtrar)
    otrosProductos: string[];  // Array que almacena las referencias de otras variantes de ese modelo (otro color...)
    talla: string[];           // Las tallas que ofrece el producto
    descripcion: string;
    materiales: string[];
    precio: number;            // En euros
    descuento: number;         // El precio con descuento
    fotos: string;           // URL a las imagenes en Firebase
}