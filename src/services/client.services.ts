import { Injectable } from "@angular/core";     // ERROR: Can't resolve all parameters for (?)
import { Producto } from "../models/producto.model";
import { Client } from "../models/client.model";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Injectable()
export class ClientService {

    private dbPath = '/Clients/';
 
    clientsRef: AngularFireList<Client>;

    constructor(private db : AngularFireDatabase){
        this.clientsRef = db.list(this.dbPath);
    }

    registerButton(value: Client): void{
        this.clientsRef.push(value);
    }

}