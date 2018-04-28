import { Producto } from "./producto.model";

export interface Client {
    key: string;              // Algo de firebase
    tipo: string;
    nombre: string;
    necesidad: string;
    carrito: Producto[];
    email: string;
    password: string;
}