import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import { Client } from "../models/client.model";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { User } from 'firebase/app';
import { ProductoCarrito } from "../models/productoCarrito.model";


@Injectable()
export class ClientService {

    private dbPath = '/Clients/';
    clientsRef: AngularFireList<Client>;
    user: User;
    myself: Client;
    carritoRef: AngularFireList<ProductoCarrito>;


    constructor(
        private db: AngularFireDatabase,
        private afAuth: AngularFireAuth
    ) {
        afAuth.authState.subscribe((user: User) => {        // Si tenemos sesión iniciada
            this.user = user;
        });
        this.clientsRef = this.db.list(this.dbPath);        // La ruta de los clientes
    }

    get authenticated(): boolean {  // Nos permite saber si está o no autenticado el usuario.
        this.afAuth.authState.subscribe((user: User) => {       // Comprobamos si tenemos sesión iniciada
            this.user = user;
        });
        if(this.user == null){                                  // Devolvemos el resultado, sí o no
            console.log("authenticated. No estamos logueados");
            return false;
        }
        else{
            console.log("authenticated. Sí estamos logueados");
            return true;
        }
    }

    /*** LOGIN ***/
    signInWithEmailAndPassword(user: string, pass: string): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(user, pass);
    }

    /*** REGISTER ***/
    createUserWithEmailAndPassword(user: string, pass: string): Promise<any> {
        return this.afAuth.auth.createUserWithEmailAndPassword(user, pass);
    }

    /*** LOGOUT ***/
    signOut(): Promise<any> {
        console.log("Cerrando sesión...");
        return this.afAuth.auth.signOut();
    }


    getClientList() {       // Método para obtener la snapshot de clientes, luego hay que sacarlos manualmente. EJ: ¿?
        return this.clientsRef = this.db.list(this.dbPath);
    }

    pushProductoCarrito(productoCarrito){
        this.afAuth.authState.subscribe(auth => {       // si hemos iniciado sesión, metemos el uid como key y su correo dentro.
            this.db.object(`Clients/${auth.uid}/carrito/`+productoCarrito[3]+productoCarrito[2]).set({
                referencia: productoCarrito[0],
                cantidad: productoCarrito[1],
                talla: productoCarrito[2],
                key: productoCarrito[3],
                color: productoCarrito[4],
                foto: productoCarrito[5],
                name: productoCarrito[6],
                precio: productoCarrito[7]
            });
        });
        console.log("pushProductoCarrito terminado");
    }

    getMyCarrito() {
        console.log("getMyCarrito en clientService");
        if (this.authenticated) {
            console.log("getMyCarrito ESTOY LOGUEADO");
            return this.carritoRef = this.db.list(this.dbPath+this.user.uid+"/carrito/");
        }
        return null;                // Si no ha encontrado el cliente, null.
    }

    deleteMyCarritoItem(item: ProductoCarrito){
        this.db.object(this.dbPath+this.user.uid+"/carrito/"+item.key).remove();
    }

    getMyself() {
        console.log("getMyself en clientService");

        if (this.authenticated) {
            this.db.list(this.dbPath).snapshotChanges().subscribe(item => {
                item.forEach(element => {
                    let x = element.payload.toJSON();
                    x["key"] = element.key;
                    if (x["key"] === this.user.uid) {     // Si ha encontrado el cliente, lo devuelve.
                        console.log("Encontrado el cliente, devolviendolo");
                        console.log(x as Client);
                        this.myself = x as Client;
                        return x as Client;
                    }
                });
            });
        }
        return null;                // Si no ha encontrado el cliente, null.
    }


    /***************************** HELP *************************/
    pushPeticionCliente(peticionCliente){
        // Generamos una peticionCliente y la apuntamos en la lista de peticiones

        this.afAuth.authState.subscribe(auth => {       // si hemos iniciado sesión, metemos el uid como key y su correo dentro.
            this.db.object(`Requests/Clients/${auth.uid}`).set({
                key: peticionCliente[0],
                tipo: peticionCliente[1],
                email: peticionCliente[2],
                lugar: peticionCliente[3],
                date: peticionCliente[4],
            });
        });
        console.log("pushPeticionCliente terminado");

    }

    /***************************** LOGIN ****************************/
    registerButton(value: Client): void {                // Cuando el cliente pulsa en la pantalla de Login el botón registrar
        this.afAuth.authState.subscribe(auth => {       // si hemos iniciado sesión, metemos el uid como key y su correo dentro.
            this.db.object(`Clients/${auth.uid}`).set({
                email: value.email,
            });
        });
    }
}