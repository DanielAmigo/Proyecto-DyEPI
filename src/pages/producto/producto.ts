import { Component, Injector, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { Producto } from "../../models/producto.model";
import { SuperTabsController } from 'ionic2-super-tabs';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  @ViewChild(Slides) slides: Slides;

  producto: Producto;
  imageSelected: string;
  talla: string;
  keyProducto: string;
  public tallaSelected: string;
  public tallas: Array<string>;
  public cantidadAlmacen: Array<string>;
  public cantidadTienda: Array<string>;
  public aux: Array<Array<string>>;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public productoRecieved: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    private superTabsCtrl: SuperTabsController,
    private alertCtrl: AlertController,
    public injector: Injector
  ) {
    console.log("Constructor de: producto.ts");
    if (navParams.get('producto') != undefined) this.keyProducto = navParams.get('producto');

    console.log("Buscando: " + this.keyProducto);

    // Inicializamos los arrays
    this.tallas = [];
    this.cantidadAlmacen = [];
    this.cantidadTienda = [];
    this.productoRecieved = false;

    this.productoService.getProducts()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          if (x["key"] === this.keyProducto) {    // Encontrado el producto.
            this.producto = x as Producto;
            console.log("Producto encontrado.");
            console.log(this.producto);
            this.productoRecieved = true;

            // Preparamos la informacion en arrays
            Object.keys(x["talla"]).forEach(key => {  
              let value = x["talla"][key];
              this.tallas.push(value);
            });
            Object.keys(x["cantidadTallaAlmacen"]).forEach(key => {
              let value2 = x["cantidadTallaAlmacen"][key];
              this.cantidadAlmacen.push(value2);
            });
            Object.keys(x["cantidadTallaTienda"]).forEach(key => {
              let value3 = x["cantidadTallaTienda"][key];
              this.cantidadTienda.push(value3);
            });

            for(var i: number = 0; i < 10; i++) {
              this.aux[i] = [];
              for(var j: number = 0; j< this.cantidadTienda.length; j++) {
                  this.aux[i][j] = "";
              }
          }
            this.aux.push(this.tallas);
            this.aux.push(this.cantidadAlmacen);
            this.aux.push(this.cantidadTienda);
          }
        });
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }

  private initializeCategories(): void {
    // Select it by defaut
    this.tallaSelected = this.tallas[0];

    // Check which arrows should be shown
    this.showLeftButton = false;
    this.showRightButton = this.tallas.length > 3;
  }

  public filterData(tallaNumber: number): void {
    // Handle what to do when a category is selected
    console.log("Seleccionada: " + tallaNumber);
  }

  // Method executed when the slides are changed
  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
  }

  // Method that shows the next slide
  public slideNext(): void {
    this.slides.slideNext();
  }

  // Method that shows the previous slide
  public slidePrev(): void {
    this.slides.slidePrev();
  }


  addProductToCart(producto) {                               // Añadimos al carrito de ProductoService este producto, con los parametros seleccionados.
    // console.log("addProductToCart! "+producto+" con talla: "+this.talla);

    /*
    // Añadimos la selección
    producto.seleccion = [this.talla];  // Añadir la seleccion de este producto (talla, etc.)
    if(producto.descuento != 0){
      producto.seleccion.push(producto.descuento);
    }
    else{
      producto.seleccion.push(producto.precio);
    }
  
    console.log(producto);
    
    const items = this.productoService.pushCart(producto);  // Actualizamos el carrito correspondiente.
    this.superTabsCtrl.setBadge('CarritoTab', items);       // Actualizamos el numerito del carrito.
  
    let alert = this.alertCtrl.create({
      title: 'Producto añadido al carrito',
      message: '¿Quieres ir al carrito?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.navCtrl.pop();  // Volvemos atrás.
          }
        },
        {
          text: 'No',
          handler: () => {
            console.log('No selected!');
          }
        }
      ]
  });
  
  alert.present();
  */
  }
}