import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarritousuarioRoutingModule } from './carritousuario-routing.module';
import { LayoutModule } from 'src/app/menu/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng/primeng.module';
import { CarritoUsuarioComponent } from './carrito-usuario.component';


@NgModule({
  declarations: [
    CarritoUsuarioComponent
  ],
  imports: [
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    CarritousuarioRoutingModule
  ]
})
export class CarritousuarioModule { }
