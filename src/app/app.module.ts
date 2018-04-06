import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomePageModule } from '../pages/home/home.module';

import { SuperTabsModule } from 'ionic2-super-tabs';                  // Las tabs que se pueden deslizar
import { AutohideDirective } from '../directives/autohide/autohide';  // Autoocultado del FAB del QR scanner. NO FUNCIONA
import { BarcodeScanner } from '@ionic-native/barcode-scanner';       // La funcionalidad de Cordova para escanear

import { ProductoService } from '../services/producto.services';
import { ProductoPage } from '../pages/producto/producto';

@NgModule({
  declarations: [
    MyApp,

    // Pages
    //HomePage,

    // Directives
    AutohideDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot(),
    HomePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,

    // Pages
    HomePage
  ],
  providers: [    // Services
    StatusBar,
    SplashScreen,
    BarcodeScanner,   // NECESARIO PARA QUE FUNCIONE
    ProductoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
