import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaproductoRoutingModule } from './paginaproducto-routing.module';
import { PaginaProductosComponent } from './pagina-productos.component';
import { LayoutModule } from 'src/app/menu/layout.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from 'src/app/primeng/primeng.module';


@NgModule({
  declarations: [
    PaginaProductosComponent
  ],
  imports: [
    LayoutModule,
    FormsModule,
    PrimengModule,
    ReactiveFormsModule,
    PaginaproductoRoutingModule
  ]
})
export class PaginaproductoModule { }
