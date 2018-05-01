import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
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
      private alertCtrl: AlertController,
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
      let alert = this.alertCtrl.create({
        title: "Debes utilizar una cuenta válida",
        message: "EJ: usuario@usuario.com, usuario"
      });
      alert.present();
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
        console.log("Registrando el correo: "+client.email);
        this.clientService.registerButton(client);    // GENERA EL OBJETO CLIENTE Y LO SUBE, CON QUE CLAVE¿?¿??¿
        this.navCtrl.setRoot(HomePage);
      }
    } catch (e) {
      let alert = this.alertCtrl.create({
        title: "El usuario debe ser un correo electrónico",
        message: "EJ: usuario@usuario.com, usuario"
      });
      alert.present();
      console.error(e);
    }
  }

  goToHome(){
    //
    let alert = this.alertCtrl.create({
      title: "Sin iniciar sesión no podrás añadir objetos al carrito ni usar la ayuda."
    });
    alert.present();
    this.navCtrl.setRoot(HomePage);

  }

  // Que no se abra el menu lateral en esta vista
  ionViewDidEnter() {
    this.menu.enable(false);
  }
  ionViewWillLeave() {
    this.menu.enable(true);
  } 
}