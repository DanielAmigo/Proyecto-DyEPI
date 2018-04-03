import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CarritoPage } from './carrito';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    CarritoPage,
  ],
  imports: [
    IonicPageModule.forChild(CarritoPage),
    SuperTabsModule
  ],
})
export class CarritoPageModule {}
