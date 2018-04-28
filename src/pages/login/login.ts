import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Client } from "../../models/client.model";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';
import { ClientService } from '../../services/client.services';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [ClientService],
})
export class LoginPage {

  user = {} as Client;

  constructor(
      private afAuth: AngularFireAuth,
      public navCtrl: NavController,
      public navParams: NavParams,
      public menu: MenuController,
      private clientService: ClientService,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  async login(client: Client) {   // Boton login en Firebase
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(client.email, client.password);
      if (result) {
        this.navCtrl.setRoot(HomePage);
      }
    }
    catch (e) {
      alert("Debes utilizar una cuenta válida: usuario@usuario.com, usuario");
      console.error(e);
    }
  }
 
  async register(client: Client) {  // Boton registrar en Firebase
    try {
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(
        client.email,
        client.password
      );
      if (result) {
        this.clientService.registerButton(client);          // GENERA EL OBJETO CLIENTE Y LO SUBE, CON QUE CLAVE¿?¿??¿
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      alert("El usuario debe ser un correo electrónico.");
      console.error(e);
    }
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    this.menu.enable(true);
  } 
}