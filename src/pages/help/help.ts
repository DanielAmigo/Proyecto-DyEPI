import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ClientService } from '../../services/client.services';

@IonicPage()
@Component({
  selector: 'page-help',
  templateUrl: 'help.html',
})
export class HelpPage {



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public clientService: ClientService,
    public alertCtrl: AlertController
  ) {



  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  consultaEmpleado() {

    // Creamos un nuevo peticionCliente y se lo mandamos al servicio de Cliente para que lo añada
    const date = new Date();

    let consulta = [
      this.clientService.user.uid,
      "consultaEmpleado",
      this.clientService.user.email,
      "No especificado",
      date
    ];
    this.clientService.pushPeticionCliente(consulta);  // Escribimos en Firebase

    let alert = this.alertCtrl.create({
      title: "Petición recibida, un empleado está acudiendo a tu posición."
    });
    alert.present();

  }


  iniciarPeticionPago() {

    // Comprobamos que nuestro carrito no esté vacío
    let carritovacio = true;
    let aux = this.clientService.getMyCarrito().snapshotChanges().subscribe(item => {
      console.log(item)
      if (item.length <= 0) {
        let alert3 = this.alertCtrl.create({
          title: "Tu carrito está vacío"
        });
        alert3.present();
        aux.unsubscribe();
      }
      else {
        console.log("lleno");

        let tipoPeticion = "";
        // En función de si tengo o no los productos será una petición u otra
        let alert = this.alertCtrl.create({
          title: 'Iniciando proceso de compra',
          message: "¿Tienes tus productos en mano o quieres que te los acerque un empleado?",
          buttons: [
            {
              text: 'En mano',
              handler: () => {
                console.log('En mano selected');
                tipoPeticion = "peticionPagoEnMano";
                const date = new Date();

                let consulta = [
                  this.clientService.user.uid,
                  tipoPeticion,
                  this.clientService.user.email,
                  "No especificado",
                  date
                ];
                this.clientService.pushPeticionCliente(consulta);  // Escribimos en Firebase

                let alert2 = this.alertCtrl.create({
                  title: "Petición recibida, un empleado está acudiendo a tu posición."
                });
                alert2.present();
              }
            },
            {
              text: 'Tráemelos',
              handler: () => {
                console.log('Tráemelos selected!');
                tipoPeticion = "peticionPagoRecoge";
                const date = new Date();

                let consulta = [
                  this.clientService.user.uid,
                  tipoPeticion,
                  this.clientService.user.email,
                  "No especificado",
                  date
                ];
                this.clientService.pushPeticionCliente(consulta);  // Escribimos en Firebase

                let alert2 = this.alertCtrl.create({
                  title: "Petición recibida, un empleado está acudiendo a tu posición."
                });
                alert2.present();
              }
            }
          ]
        });

        // Una vez tomada la decisión, se genera la petició ny se lo mandamos al servicio de Cliente para que lo añada
        alert.present();
        aux.unsubscribe();
      }

    });




    // Una vez el empleado haya recodigo todas las prendas, le da a proceder al pago
    // En ese momento, bloquea la vista del cliente, busca en Firebase su carrito, se lo almacena, resta las cantidades, etc.
    // espera 5 segundos al pago, le elimina el carrito, y se elimina dicha peticion.
  }


  otros() {
    const date = new Date();

    let consulta = [
      this.clientService.user.uid,
      "otros",
      this.clientService.user.email,
      "No especificado",
      date
    ];
    this.clientService.pushPeticionCliente(consulta);  // Escribimos en Firebase

    let alert2 = this.alertCtrl.create({
      title: "Petición recibida, un empleado está acudiendo a tu posición."
    });
    alert2.present();
  }
}