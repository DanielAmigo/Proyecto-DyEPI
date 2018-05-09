import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {

  plantas: Array<{ name: string, url: string }>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.plantas = [
      { name: 'Planta 0', url: "../../assets/imgs/planta0.png" },
      { name: 'Planta 1', url: "../../assets/imgs/planta1.png" },
      { name: 'Planta 2', url: "../../assets/imgs/planta2.png" },
      { name: 'Planta 3', url: "../../assets/imgs/planta3.png" },
    ];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapaPage');
  }

}
