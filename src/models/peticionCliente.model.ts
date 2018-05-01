export interface PeticionCliente {
    key: string;              // Algo de firebase
    nombrePersona: string;
    necesidad: string;
    carrito: string[];
    email: string;
    lugar: string;
    tiempo: Date;
}