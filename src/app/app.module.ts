import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { SuperTabsModule } from 'ionic2-super-tabs';                  // Las tabs que se pueden deslizar
import { AutohideDirective } from '../directives/autohide/autohide';  // Autoocultado del FAB del QR scanner
import { BarcodeScanner } from '@ionic-native/barcode-scanner';       // La funcionalidad de Cordova para escanear

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AutohideDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SuperTabsModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,   // NECESARIO PARA QUE FUNCIONE
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
