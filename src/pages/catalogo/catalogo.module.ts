import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CatalogoPage } from './catalogo';

@NgModule({
  declarations: [
    CatalogoPage,
  ],
  imports: [
    IonicPageModule.forChild(CatalogoPage),
  ],
})
export class CatalogoPageModule {}
