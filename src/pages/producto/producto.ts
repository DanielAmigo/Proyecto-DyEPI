import { Component, Injector, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Slides } from 'ionic-angular';
import { ProductoService } from '../../services/producto.services';
import { Producto } from "../../models/producto.model";
import { SuperTabsController } from 'ionic2-super-tabs';
import { ClientService } from '../../services/client.services';
import { isUndefined } from 'ionic-angular/util/util';

@IonicPage()
@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {
  @ViewChild(Slides) slides: Slides;

  public producto: Producto;
  public talla: string;
  public referenciaProd: string;
  public tallaSelected: string;
  public tallas: Array<string>;
  public cantidadAlmacen: Array<number>;
  public cantidadTienda: Array<number>;
  public colores: Array<string>;
  public showLeftButton: boolean;
  public showRightButton: boolean;
  public cantidad: number = 1;

  /********************************* Constructor ****************************/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public productoService: ProductoService,
    public clientService: ClientService,
    private superTabsCtrl: SuperTabsController,
    private alertCtrl: AlertController,
    public injector: Injector
  ) {
    console.log("Constructor de: producto.ts");
    if (navParams.get('producto') != undefined) this.referenciaProd = navParams.get('producto');

    console.log("Buscando: " + this.referenciaProd);

    // Inicializamos los arrays
    this.tallas = [];
    this.cantidadAlmacen = [];
    this.cantidadTienda = [];
    this.colores = [];

    // Recibimos los productos y buscamos el nuestro
    this.productoService.getProducts()
      .snapshotChanges().subscribe(item => {
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["key"] = element.key;
          if (x["referencia"] === this.referenciaProd) {    // Encontrado el producto.
            this.producto = x as Producto;
            console.log("Producto encontrado.");
            console.log(this.producto);

            // Preparamos la información en arrays
            Object.keys(x["talla"]).forEach(key => {  
              let value = x["talla"][key];
              this.tallas.push(value);
            });
            Object.keys(x["tallaCantidadAlmacen"]).forEach(key => {
              let value2 = x["tallaCantidadAlmacen"][key];
              this.cantidadAlmacen.push(value2);
            });
            Object.keys(x["tallaCantidadTienda"]).forEach(key => {
              let value3 = x["tallaCantidadTienda"][key];
              this.cantidadTienda.push(value3);
            });

            // Inicializamos los botones del gestor de tallas
            this.showLeftButton = false;
            this.showRightButton = this.tallas.length > 2;

            Object.keys(x["colores"]).forEach(key => {    // Guardamos los colores bien
              let value3 = x["colores"][key];
              this.colores.push(value3);
            });
            this.producto.colores = this.colores;


            console.log("Objeto conseguido y arrays creados");   // Necesario para que termine antes de que pase a lo siguiente
          }
        });
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductoPage');
  }


  /************ Métodos de gestión del selector de cantidad *******/
  incrementarCantidad(){
    let aux: number;
    for (let index = 0; index < this.tallas.length; index++) {  // Obtenemos la posición seleccionada.
      if(this.tallas[index] === this.tallaSelected) aux = index;
    }
    if(isUndefined(aux)) return this.cantidad += 1;

    // Si tenemos disponibles de dicha talla, subimos.
    if(this.cantidadAlmacen[aux]+this.cantidadTienda[aux] > this.cantidad) this.cantidad += 1;
    else this.cantidad = this.cantidadAlmacen[aux]+this.cantidadTienda[aux];
  }
  decrementarCantidad(){
    if(this.cantidad > 1) this.cantidad -= 1;
  }


  /************* Métodos de gestión de las vistas de talla ********/
  public slideChanged(): void {
    let currentIndex = this.slides.getActiveIndex();
    this.showLeftButton = currentIndex !== 0;
    this.showRightButton = currentIndex !== Math.ceil(this.slides.length() / 3);
  }
  public slideNext(): void {
    this.slides.slideNext();
  }
  public slidePrev(): void {
    this.slides.slidePrev();
  }
  public seleccionandoTalla(tallaClicked: string): void {
    console.log("Seleccionada: " + tallaClicked);
    this.tallaSelected = tallaClicked;
    
    // Comprobamos si la cantidad es superior a la permitida, para disminuirla
    let aux: number;
    for (let index = 0; index < this.tallas.length; index++) {  // Obtenemos la posición seleccionada.
      if(this.tallas[index] === this.tallaSelected){
        aux = index;
      }
    }
    if(this.cantidadAlmacen[aux]+this.cantidadTienda[aux] < this.cantidad){ // Si tenemos menos disponibles de dicha talla, que el valor, ponemos el maximo.
      this.cantidad = this.cantidadAlmacen[aux]+this.cantidadTienda[aux];
    }
  }

  /*********************** Añadimos al carrito de ProductoService este producto, con los parametros seleccionados. ******/
  addProductToCart() {                               
    console.log("addProductToCart! "+this.producto.name+" con talla: "+this.tallaSelected+" y cantidad: "+this.cantidad);

    // Creamos un nuevo producto con Referencia, Cantidad, Talla, Key+Talla
    let auxPrecio: number;
    if(this.producto.precioDescuento!=null) auxPrecio = this.producto.precioDescuento;
    else auxPrecio = this.producto.precio;

    let productoCarrito = [
      this.producto.referencia,
      this.cantidad,
      this.tallaSelected,
      this.producto.key,
      this.producto.colores[0],
      this.producto.foto,
      this.producto.name,
      auxPrecio
    ];
    this.clientService.pushProductoCarrito(productoCarrito);  // Escribimos en Firebase
  
    let alert = this.alertCtrl.create({
      title: 'Producto añadido al carrito',
      message: '¿Quieres volver al menú principal?',
      buttons: [{
          text: 'Sí',
          handler: () => {
            console.log('Yes selected');
            this.navCtrl.pop();  // Volvemos atrás.
          }},{
          text: 'No',
          handler: () => {
            console.log('No selected!');
          }}]});
    alert.present();
  }
}