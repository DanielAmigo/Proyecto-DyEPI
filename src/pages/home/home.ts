import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { SuperTabsController } from 'ionic2-super-tabs';
import { Platform } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pages = [
    { pageName: 'HelpPage', title: 'Asistencia', icon: 'help', id: 'HelpTab' },
    { pageName: 'MapaPage', title: 'Mapa', icon: 'locate', id: 'MapaTab' },
    { pageName: 'CatalogoPage', title: 'Catalogo', icon: 'shirt', id: 'CatalogoTab' },
    { pageName: 'CarritoPage', title: 'Carrito', icon: 'cart', id: 'CarritoTab' }
  ];

  selectedTab = 1;

  @ViewChild(SuperTabs) superTabs: SuperTabs;

  qrData = null;
  scannedCode = null;
  rootNavCtrl: NavController; // Para poder ir a una nueva vista, no dentro de las pestañas.

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    private alertCrtl: AlertController,
    private barcodeScanner: BarcodeScanner,
    private pform: Platform,
    private viewCtrl: ViewController,
    private toastCtrl: ToastController,
    private superTabsCtrl: SuperTabsController,
  ){
    this.rootNavCtrl = this.navParams.get('rootNavCtrl');  // Para poder ir a una nueva vista, no dentro de las pestañas.
  }

  readCode(){           // Boton flotante FAB para leer un QR y a la vuelta abrir el enlace correspondiente
    console.log("readCode");
    this.barcodeScanner.scan().then((barcodeData) => {
      if(barcodeData.cancelled){
        alert("No has escaneado un QR de Primark. Saliendo...");
      }
      else {
        console.log("readCode yendo a ProductoPage con: "+barcodeData.text);
        this.navCtrl.push('ProductoPage', {producto: barcodeData.text});  // No se puede rootNavCtrl, sino no va.
      }
    });
  }

  onTabSelected(ev: any) {
    this.selectedTab = ev.index;
  }

  // Cuando hace POP y vuelve a esta vista, revisamos el carrito, si hay algo, a esa vista.
  public ionViewWillEnter() {
    /*
    this.productoService.getTotalCost();

    console.log("Volvemos a Home. ionViewWillEnter");
    if(this.productoService.getCart().length > 0){
      console.log("Carrito con objetos, pasando a esa tab!!!");
      this.superTabsCtrl.slideTo(3); 
    }
    */
  }


}