import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrimengModule } from 'src/app/primeng/primeng.module';
import { UsuarioComponent } from './usuario/usuario.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ProductosComponent } from './productos/productos.component';
import { ComponentsAdministracionRoutingModule } from './administracion-routing.module';
import { CategoriaComponent } from './categoria/categoria.component';
import { CarritoComponent } from './carrito/carrito.component';

@NgModule({
  imports: [
    CommonModule,
    PrimengModule,
    ComponentsAdministracionRoutingModule
    
  ],
  declarations: [
    UsuarioComponent,
    ServiciosComponent,
    ProductosComponent,
    CategoriaComponent,
    CarritoComponent
  ]
})
export class AdministracionModule { }
